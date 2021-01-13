require('dotenv').config()
const uniswap = require('./uniswap')
const percentageChange = require('./percentageChange')
const maximise = require('./maximise')




const isProfitable = async (filteredTransaction) => {
console.log('in is profitable')
    let etherValue = filteredTransaction.etherValue;
    let tokenOutAmount = filteredTransaction.amountOutMin

    let { token, pair } = await uniswap.getData(filteredTransaction)
    let { priceIncrease, eth, pairToken } = await percentageChange(pair.liquidityToken.address.toLowerCase(), etherValue, tokenOutAmount)

    let MaximumEtherLoss = etherValue - (eth.price * tokenOutAmount)
    if(MaximumEtherLoss <0){
        return undefined
    }
    let threshHold = 1 + ((MaximumEtherLoss / etherValue) * 0.7);

    let revenue = MaximumEtherLoss * process.env.ETHPRICE * 0.5

<<<<<<< HEAD:Unisiwap/isProfitable.js
    let cost = ((filteredTransaction.gasPrice + 40e9) / 25e8)
=======
    let cost = (filteredTransaction.gasPrice / 25e8)
    console.log('Their txHash '+filteredTransaction.txHash)
    console.log(revenue - cost)
>>>>>>> parent of af2f1c5... Gas fixed:app/isProfitable.js

    console.log(priceIncrease)

    console.log(MaximumEtherLoss)

    console.log(`Revenue = ${revenue}
cost  = ${cost}`)
    
    if (revenue-cost> 50) {
        let tokenToBuy = await maximise(eth, pairToken, threshHold)
        let totalMoney = (tokenToBuy * priceIncrease * process.env.ETHPRICE )
        console.log(totalMoney-cost)
        if (parseFloat(totalMoney)-cost > 40) {
            console.log({tokenToBuy,eth,pairToken})
            let trade = uniswap.getTrade(pair, uniswap.weth, tokenToBuy * 1e18)
            return {
                buyObj: await uniswap.getBuyObj(filteredTransaction, trade, token),
                token,
                pair,
            }
        }
    }
    return undefined
}

module.exports = isProfitable