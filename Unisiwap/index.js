const blocknative = require('./blocknative')
const { watcher } = require('./watcher')
const isProfitable = require('./isProfitable')
const uniswap = require('./uniswap')
const emitter = blocknative.createEmitter()
const trieInit = require('./HelperFolders/trie')
const {getGas} = require('./HelperFolders/watcherValidator')

const init = async () => {
    let myTrie = await trieInit();
    let compareGas = await getGas()
    console.log("Starting Emitter")

    emitter.on("txPool", async (event) => {
        let filteredTransaction = await watcher(event, myTrie,compareGas)
        if (filteredTransaction !== undefined) {
            let buyObj = await isProfitable(filteredTransaction);
            if (buyObj !== undefined) {
                let realBuyObj = buyObj.buyObj
                console.log({realBuyObj})
            process.exit()
        //         let buyTx = await uniswap.buyTokens(realBuyObj)
        //         blocknative.unsubscribe(process.env.UNISWAP)
        //         let txEmitter = await blocknative.createTransactionWatcher(filteredTransaction.txHash, buyObj);
        //         txEmitter.on('txConfirmed', async () => {
        //             console.log('Transaction Finished ')
                    // let sellObj = uniswap.getSellObj(buyObj.token,buyObj.pair, buyObj)
                    // console.log(sellObj)
                    // let sellTx = uniswap.sellTokens(sellObj);
        //             process.exit()
        //         })
            }
        }
    })
}

init()



// This is the latest version
