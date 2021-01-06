const blocknative = require('./blocknative')
const { watcher, watchStatus } = require('./watcher')
const isProfitable = require('./isProfitable')
const uniswap = require('./uniswap')
const emitter = blocknative.createEmitter()
const rewrite = require('./writeToEnv')


console.log("Starting Emitter")






emitter.on("txPool", async (event) => {

    let filteredTransaction = await watcher(event)
    if (filteredTransaction !== undefined) {
        let buyObj = await isProfitable(filteredTransaction);
        if (buyObj !== undefined) {
            console.log(buyObj)
            console.log('Woah where is the buyObj')
            emitter.on("txPool", event => watchStatus(event, filteredTransaction))
            while (process.env.ISFINISHED === 'false') {
            }
            console.log(process.env.ISFINISHED)
        }
    }


    // await uniswap.createApprove(filteredTransaction.tokenOut);

    // let buyTransaction = await uniswap.buyTokens(buyObj.buyObj);

    // if(isFinished === true){
    //     let sellObj = createSellObj(buyObj, transaction.amount);
    //     let sellTransaction = await uniswap.sellTokens(sellObj)
    // }
})