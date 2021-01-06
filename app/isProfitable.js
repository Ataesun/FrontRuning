require('dotenv').config()
const uniswap = require('./uniswap')
const percentageChange = require('./percentageChange')
const maximise = require('./maximise')

const isProfitable = async (filteredTransaction) => {

    var { token, pair } = await uniswap.fetchData(filteredTransaction)
    var etherValue = filteredTransaction.etherValue;
    let tokenOutAmount = filteredTransaction.amountOutMin

    let { eth, pairToken } = await percentageChange(pair.liquidityToken.address.toLowerCase())
    let MaximumEtherLoss = etherValue - (eth.price * tokenOutAmount)

    let threshHold = 1 + (MaximumEtherLoss / etherValue * 0.7);
    let frontRunAmount = MaximumEtherLoss * process.env.ETHPRICE * 0.5

    if ((frontRunAmount - (filteredTransaction.gas / 25e8)) > 50) {

        console.log(filteredTransaction.txHash)
        console.log(filteredTransaction.etherValue)
        console.log(`They are willing to lose ${MaximumEtherLoss}`)
        console.log((`they are willing to see a price rise of ${threshHold}`))
        console.log(filteredTransaction.txHash)
        let tokenToBuy = await maximise(eth, pairToken, threshHold)
        console.log(tokenToBuy)
        let trade = uniswap.createTrade(pair, uniswap.weth, tokenToBuy * 1e18)
        return {
            buyObj: await uniswap.createBuyObj(filteredTransaction, trade, token),
            token,
            pair,
        }
    }
    return undefined
}

module.exports = isProfitable