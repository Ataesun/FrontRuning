require('dotenv').config()
const uniswap = require('./uniswap')
const { Weth } = require('./HelperFolders/uniswapConstants')
const percentageChange = require('./percentageChange')
const maximise = require('./maximise')




const isProfitable = async (filteredTransaction) => {

    let etherValue = filteredTransaction.etherValue;
    let tokenOutAmount = filteredTransaction.amountOutMin

    let { token, pair } = await uniswap.getData(filteredTransaction)
    let { priceIncrease, eth, pairToken } = await percentageChange(pair.liquidityToken.address.toLowerCase(), etherValue, tokenOutAmount)
    
    console.log("")
    console.log("price increase")
    console.log(priceIncrease)

    if (priceIncrease < 0) {
        console.log('undefined price increase')
        return undefined
    } else if (priceIncrease < 0.01) {
        console.log('price increase < 1%')
        return undefined
    } else {}

    let MaximumEtherLoss = etherValue - (eth.price * tokenOutAmount)

    let theoreticalSlippage = 1 + (MaximumEtherLoss / etherValue)
    let slippage = 1 + ((MaximumEtherLoss / etherValue) * 0.7);

    console.log('')
    console.log('slippage')    
    console.log(slippage)
    console.log('MaximumEtherLoss')
    console.log(MaximumEtherLoss)

    let willingToLoseUsd = MaximumEtherLoss * process.env.ETHPRICE

    let GasCost = ((filteredTransaction.gasPrice + 40e9) / 25e8)

    // console.log(filteredTransaction.txHash)

    // console.log("Price increase : " + priceIncrease)

    // console.log("Maximumu ether loss : " + MaximumEtherLoss)

    // console.log("Etherum value :" + etherValue)

    // console.log(`Willing to lose usd = ${willingToLoseUsd} GasCost  = ${GasCost}`)

    let amountToBuy = await maximise(eth, pairToken, slippage)
    let theoreticalProfit = (amountToBuy * priceIncrease * process.env.ETHPRICE)
    console.log('gas')
    console.log(filteredTransaction.gasPrice / 1e9)

    console.log("theoretical")
    console.log(theoreticalProfit)

    console.log("gascost")
    console.log(GasCost)

    console.log("theoretical - gascost")
    console.log(theoreticalProfit - GasCost)
    if (parseFloat(theoreticalProfit) - GasCost > 60) {
        console.log("")
        console.log(filteredTransaction.txHash)
        console.log(filteredTransaction.tokenOut)
        console.log({ amountToBuy, eth, pairToken })
        let trade = uniswap.getTrade(pair, Weth, amountToBuy * 1e18)
        return {
            buyObj: await uniswap.getBuyObj(filteredTransaction, trade, token),
            token,
            pair,
        }
    }
    return undefined
}

module.exports = isProfitable