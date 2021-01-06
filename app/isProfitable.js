require('dotenv').config()
const { ChainId, Fetcher, Route, Trade, TokenAmount, TradeType, Token } = require('@uniswap/sdk');
const axios = require('axios').default
const uniswap = require('./uniswap')
const percentageChange = require('./percentageChange')
const maximise = require('./maximise')
const blocknative = require('./blocknative')

const isProfitable = async (filteredTransaction) => {

    let { token ,pair} = await uniswap.fetchData(filteredTransaction)
    let etherValue = filteredTransaction.etherValue;
    let tokenOutAmount = filteredTransaction.amountOutMin

    let {eth, pairToken} = await percentageChange(pair.liquidityToken.address.toLowerCase())
    let MaximumEtherLoss = etherValue - (eth.price * tokenOutAmount)

    let threshHold = 1+(MaximumEtherLoss/etherValue*0.7);
    let frontRunAmount = MaximumEtherLoss*process.env.ETHPRICE*0.5

    console.log(frontRunAmount - filteredTransaction.gas/25e8 )

    if((frontRunAmount- filteredTransaction.gas/2.5) > 50){
        console.log('This is profitable calculateing x')
        let tokenToBuy = await maximise(eth, pairToken ,threshHold)
        console.log(tokenToBuy)
        let trade = uniswap.createTrade(pair, uniswap.weth ,tokenToBuy*1e18)
        return {
            token,
            pair,
            buyObj :  await uniswap.createBuyObj(filteredTransaction,trade)
        }
    }
    return undefined
}

module.exports = isProfitable