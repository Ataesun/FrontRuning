const { ChainId, Fetcher, Route, Trade, TokenAmount, TradeType, Token } = require('@uniswap/sdk');
const axios = require('axios').default
const uniswap = require('./uniswap')

const getDecimal = async (token) => {
    let sig = await axios.get(`https://api.ethplorer.io/getTokenInfo/${token}?apiKey=freekey`);
    return sig.data.decimals
}

const fetchData = async (filteredTransaction) => {
    let token = new Token(ChainId.MAINNET, filteredTransaction.tokenOut, filteredTransaction.decimals)
    let pair = {};
    let sell
    if (filteredTransaction.hasOwnProperty('sellAmountOutMin')) {
        pair = await Fetcher.fetchPairData(uniswap.weth, token);
        sell = true;
        return createTrade(token,pair, /* Value needs to be replaced with calculated value */filteredTransaction.sellAmountOutMin, sell)
    } else {
        pair = await Fetcher.fetchPairData(token, (uniswap.weth));
        sell = false;

        return createTrade(token, pair, 1e18, sell)
    }

}

const createTrade = async (token, pair, amount, sell) => {
    let route = {};
    let ta = {};

    if (sell) {
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
    let etherValue = parseInt(filteredTransaction.etherValue);
    let executionPrice = parseFloat(trade.executionPrice.invert().toSignificant(18))
    let Amount = parseInt(filteredTransaction.amountOutMin)
    let MaximumEtherLoss =  etherValue - executionPrice*Amount.toPrecision(filteredTransaction.decimals)
    let slippagePercent = 1 - (MaximumEtherLoss / filteredTransaction.etherValue);
    // let input = (slippagePercent/2)
    console.log(`maximum Ether Loss ${MaximumEtherLoss / 1e18}`)
    console.log(`slippage percent is : ${slippagePercent}`);

    process.exit()
    let gasCost = filteredTransaction.gas * 1.25 / 2e9

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