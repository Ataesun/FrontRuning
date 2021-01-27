const chalk = require('chalk')
const blocknative = require('./blocknative')
const { watcher, txWatcher } = require('./watcher')
const isProfitable = require('./isProfitable')
const uniswap = require('./uniswap')
const emitter = blocknative.createEmitter()
const trieInit = require('./HelperFolders/trie')
const { getGas } = require('./HelperFolders/watcherValidator')
const { checkApprove, insertApprove } = require('./database/approvedToken')

const init = async () => {
    let myTrie = await trieInit();
    let compareGas = await getGas()
    console.log("Starting Emitter")


    emitter.on("txPool", async (event) => {
        let filteredTransaction = await watcher(event, myTrie, compareGas)
        if (filteredTransaction !== undefined) {
            let buyObj = await isProfitable(filteredTransaction);
            if (buyObj !== undefined) {
                blocknative.stopWatcher()
                let txEmitter = await blocknative.createTransactionWatcher(filteredTransaction.txHash);
                let realBuyObj = buyObj.buyObj
                if(filteredTransaction.etherValue <= 6e17) {
                    console.log(chalk.red(`ether value less than 10, return 0`))
                    return 
                }
                console.log(chalk.green('Found profitable transaction, begin front running'))
                txEmitter.on("all", event => txWatcher(event, buyObj, buyObj.pairAddress, realBuyObj.gasPrice))
                let buyTx = await uniswap.buyTokens(realBuyObj, buyObj.txHash)
                console.log(chalk.green('Purchase Complete! Checking for approve'))
                if(!checkApprove(buyObj.pairAddress)){
                    await uniswap.getApprove(buyObj.token.address)
                    await insertApprove(buyObj.pairAddress)
                    console.log(chalk.green('Approved and insterted'))
                }
            }
        }
    })
}

init()



// This is the latest version
