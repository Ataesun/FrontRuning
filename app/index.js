const blocknative = require('./blocknative')
const { watcher } = require('./watcher')
const isProfitable = require('./isProfitable')
const uniswap = require('./uniswap')
const emitter = blocknative.createEmitter()



console.log("Starting Emitter")

emitter.on("txPool", async (event) => {

    let filteredTransaction = await watcher(event)
    if (filteredTransaction !== undefined) {
        // let buyObj = await isProfitable(filteredTransaction);
        // if (buyObj !== undefined) {
        //     let realBuyObj = buyObj.buyObj
        //     let buyTx = await uniswap.buyTokens(realBuyObj)
        //     await blocknative.createTransactionWatcher(filteredTransaction.txHash,buyObj);
        // }
    }
})
