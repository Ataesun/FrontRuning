const emitter = require('./blocknative')
const watcher = require('./watcher')
const isProfitable = require('./isProfitable')
const uniswap = require('./uniswap')


console.log("Starting Emitter")

emitter.on("txPool", async (event) => {

    let filteredTransaction = await watcher(event)
    if (filteredTransaction !== undefined) {
        let buyObj = await isProfitable(filteredTransaction);
        await uniswap.createApprove(filteredTransaction.tokenOut);
        let transaction = await uniswap.buyTokens(buyObj.buyObj);
        // let amount = //
        let sellObj = createSellObj(buyObj,amount);
        await uniswap.sellTokens(sellObj)
    }
})