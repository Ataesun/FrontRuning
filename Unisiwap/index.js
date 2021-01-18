const blocknative = require('./blocknative')
const { watcher } = require('./watcher')
const isProfitable = require('./isProfitable')
const uniswap = require('./uniswap')
const emitter = blocknative.createEmitter()
const trieInit = require('./HelperFolders/trie')
const { getGas } = require('./HelperFolders/watcherValidator')

const init = async () => {
    let myTrie = await trieInit();
    let compareGas = await getGas()
    console.log("Starting Emitter")

    emitter.on("txPool", async (event) => {
        let filteredTransaction = await watcher(event, myTrie, compareGas)
        if (filteredTransaction !== undefined) {
            let buyObj = await isProfitable(filteredTransaction);
            if (buyObj !== undefined) {
                blocknative.unsubscribe(process.env.UNISWAP)
                blocknative.createTransactionWatcher(filteredTransaction.txHash, buyObj ,buyObj,buyObj.pairAddress);
                let realBuyObj = buyObj.buyObj
                console.log({ realBuyObj })
                // let buyTx = await uniswap.buyTokens(realBuyObj,buyObj.txHash)
            }
        }
    })
}

init()



// This is the latest version
