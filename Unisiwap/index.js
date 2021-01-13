const blocknative = require('./blocknative')
const { watcher } = require('./watcher')
const isProfitable = require('./isProfitable')
const uniswap = require('./uniswap')
const emitter = blocknative.createEmitter()



console.log("Starting Emitter")

emitter.on("txPool", async (event) => {
    let filteredTransaction = await watcher(event)
    if (filteredTransaction !== undefined) {
<<<<<<< HEAD:Unisiwap/index.js
        let buyObj = await isProfitable(filteredTransaction);
        if (buyObj !== undefined) {
            let realBuyObj = buyObj.buyObj
            let buyTx = await uniswap.buyTokens(realBuyObj)
            blocknative.unsubscribe(process.env.UNISWAP)
            let txEmitter = await blocknative.createTransactionWatcher(filteredTransaction.txHash, buyObj);
            txEmitter.on('txConfirmed', async () => {
                console.log('Transaction Finished ')
                // let sellObj = uniswap.getSellObj(buyObj.token,buyObj.pair, buyObj)
                // console.log(sellObj)
                // let sellTx = uniswap.sellTokens(sellObj);
                process.exit()
            })
        }
=======
        // let buyObj = await isProfitable(filteredTransaction);
        // if (buyObj !== undefined) {
        //     let realBuyObj = buyObj.buyObj
        //     let buyTx = await uniswap.buyTokens(realBuyObj)
        //     await blocknative.createTransactionWatcher(filteredTransaction.txHash,buyObj);
        // }
>>>>>>> parent of af2f1c5... Gas fixed:app/index.js
    }
})



// This is the latest version
