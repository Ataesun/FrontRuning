const { ChainId, Fetcher, Route, Trade, TokenAmount, TradeType, Token } = require('@uniswap/sdk');
const axios = require('axios').default
const uniswap = require('./uniswap')
const percentageChange = require('./percentageChange')
const maximise = require('./maximise')

const isProfitable = async (filteredTransaction) => {

    let { token ,pair} = await uniswap.fetchData(filteredTransaction)
    let etherValue = filteredTransaction.etherValue;
    let amount = filteredTransaction.amountOutMin

    let {eth, pairToken} = await percentageChange(pair.liquidityToken.address)
    let MaximumEtherLoss = etherValue - (eth.price * amount)

    // 70% of maximum slippage
    let threshHold = 1+(MaximumEtherLoss/etherValue*0.7);
    // let input = (slippagePercent/2)

    if(MaximumEtherLoss*500 - filteredTransaction.gas/2.5 > 50){
        let tokenToBuy = await maximise(eth, pairToken ,threshHold)
        let trade = uniswap.createTrade(pair, uniswap.weth ,tokenToBuy*1e18)
        return {
            token,
            pair,
            buyObj :  uniswap.wrapObj(filteredTransaction,trade)
        }
    }
    return false;
}

module.exports = isProfitable