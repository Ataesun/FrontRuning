require('dotenv').config()
const uniswap = require('./uniswap')
const percentageChange = require('./percentageChange')
const maximise = require('./maximise')
const { unsubscribe } = require('./blocknative')
const { InsufficientInputAmountError } = require('@uniswap/sdk')

const isProfitable = async (filteredTransaction) => {

    var { token, pair } = await uniswap.fetchData(filteredTransaction)

    var etherValue = filteredTransaction.etherValue;
    console.log(`Their transaction value ${etherValue}`)
    let tokenOutAmount = filteredTransaction.amountOutMin
    console.log(`Their transaction AmountOutMin ${tokenOutAmount}`)
    let { priceIncrease, eth, pairToken } = await percentageChange(pair.liquidityToken.address.toLowerCase(), etherValue, tokenOutAmount)

    console.log(`Price increase ${priceIncrease}`)

    let MaximumEtherLoss = etherValue - (eth.price * tokenOutAmount)
    let threshHold = 1 + ((MaximumEtherLoss / etherValue) * 0.7);

    // front run amount = x converted to usd
    let revenue = MaximumEtherLoss * process.env.ETHPRICE * 0.5

    let cost = ((filteredTransaction.gasPrice + 40e9) / 25e8)
    console.log('Their txHash '+filteredTransaction.txHash)
    console.log(revenue - cost)

    if (revenue-cost> 50) {
        let tokenToBuy = await maximise(eth, pairToken, threshHold)
        let totalMoney = (tokenToBuy * priceIncrease * process.env.ETHPRICE )
        console.log(`Total money is ${totalMoney} , Cost is ${cost}`)
        if (parseFloat(totalMoney)-cost > 40) {
            console.log({tokenToBuy,eth,pairToken})
            let trade = uniswap.createTrade(pair, uniswap.weth, tokenToBuy * 1e18)
            return {
                buyObj: await uniswap.createBuyObj(filteredTransaction, trade, token),
                token,
                pair,
            }
        }
    }
    return undefined
}

module.exports = isProfitable