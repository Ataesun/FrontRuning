const { ChainId,Fetcher, Route, Trade, TokenAmount, TradeType, Token } = require('@uniswap/sdk');
const axios = require('axios').default
const uniswap = require('./uniswap')

const getDecimal = async (token) =>{
    let sig = await axios.get(`https://api.ethplorer.io/getTokenInfo/${token}?apiKey=freekey`);
    return sig.data.decimals
}

const fetchData = async (filteredTransaction) => {
    let token = new Token(ChainId.MAINNET, filteredTransaction.tokenOut, filteredTransaction.decimals)
    let pair = {};
    if (filteredTransaction.hasOwnProperty('sellAmountOutMin')) {
        pair = await Fetcher.fetchPairData(uniswap.weth, token);
        return createTrade({
            token,
            pair,
        }, /* Value needs to be replaced with calculated value */1e18,
        filteredTransaction)
    } else {
        pair = await Fetcher.fetchPairData(token, (uniswap.weth));
        return createTrade({
            token,
            pair,
        },filteredTransaction.sellAmountOutMin
        ,filteredTransaction)
    }

}

const createTrade = async (token, pair, amount, filteredTransaction) => {
    let route = {};
    let ta = {};
    if (filteredTransaction.hasOwnProperty('sellAmountOutMin')) {
        route = new Route([pair], token);
        ta = new TokenAmount(token, BigInt(amount))
    } else {
        route = new Route([pair], uniswap.weth);
        ta = new TokenAmount(uniswap.weth, BigInt(amount))
    }
    let trade = new Trade(route, ta, TradeType.EXACT_INPUT);
    return trade
}

const isProfitable = async (filteredTransaction) => {
    
    filteredTransaction.decimals = await getDecimal(filteredTransaction.tokenOut);
    console.log(filteredTransaction)
    let trade = await fetchData(filteredTransaction)

    let MaximumEtherLoss = parseInt(obj.etherValue) - parseFloat(trade.executionPrice.invert().toSignificant(18)) 
        * parseInt(filteredTransaction.amountOutMin).toSignificant(filteredTransaction.decimals)
    let slippagePercent = 1 - (MaximumEtherLoss / filteredTransaction.etherValue);
    // let input = (slippagePercent/2)
    console.log(`maximum Ether Loss ${MaximumEtherLoss / 1e18}`)
    console.log(`slippage percent is : ${slippagePercent}`);

    let gasCost = filteredTransaction.gas*1.25 / 2e9

    // if ( gasCost > 0) {
    //     let tx = await uniswap.buyTokens(filteredTransaction);
    //     const receipt = await tx.wait();
    //     let sellAmount = receipt.value*trade.executionPrice.invert();
    //     filteredTransaction.sellAmountOutMin = sellAmount;
    //     let sell = await fetchData(filteredTransaction)
    //     await uniswap.sellTokens(filteredTransaction)
    // } else {
    //     return false;
    // }
}

module.exports = isProfitable