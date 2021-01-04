const { ChainId, Fetcher, Route, Trade, TokenAmount, TradeType, Token } = require('@uniswap/sdk');
const axios = require('axios').default
const uniswap = require('./uniswap')
const percentageChange = require('./percentageChange')



const fetchData = async (filteredTransaction) => {
    let token = new Token(ChainId.MAINNET, filteredTransaction.tokenOut, filteredTransaction.decimals)
    let pair = {};
    let sell
    let buy = 1e18
    if (filteredTransaction.hasOwnProperty('sellAmountOutMin')) {
        pair = await Fetcher.fetchPairData(uniswap.weth, token);
        sell = true;
        return {
            token,
            pair,
            trade : await createTrade(token,pair,buy,sell)
        }

    } else {
        pair = await Fetcher.fetchPairData(token, (uniswap.weth));
        sell = false;

        return {
            token,
            pair,
            trade : await createTrade(token,pair,buy,sell)
        }
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

const createPath = (tokenFrom, tokenTo) => {
    return [tokenFrom.address, tokenTo.address]
}


const isProfitable = async (filteredTransaction) => {

    filteredTransaction.decimals = await getDecimal(filteredTransaction.tokenOut);
    let { token, pair, trade } = await fetchData(filteredTransaction)

    let etherValue = filteredTransaction.etherValue;
    let executionPrice = trade.executionPrice.invert().toSignificant(18)
    let Amount = filteredTransaction.amountOutMin
    let MaximumEtherLoss = etherValue - executionPrice * Amount.toPrecision(filteredTransaction.decimals)

    let revenue = await percentageChange(filteredTransaction.etherValue/1e18, 
        filteredTransaction.amountOutMin.toPrecision(filteredTransaction.decimals), pair.liquidityToken.address)

    let slippagePercent = 1 - (MaximumEtherLoss / filteredTransaction.etherValue)+1;
    // let input = (slippagePercent/2)
    console.log(`maximum Ether Loss ${MaximumEtherLoss / 1e18}`)
    console.log(`slippage percent is : ${slippagePercent}`);
    console.log(`revenue percent is : ${revenue}`)
    let profitable = true;


    // if(profitable){
    //     let amountOutMin = trade.minimumAmountOut(slippageTolerance).raw;
    //     let amountOutMinHex = ethers.BigNumber.from(amountOutMin.toString()).toHexString();

    //     let path = createPath(weth,token)
    //     let inputAmount = trade.inputAmount.raw;
    //     let inputAmountHex = ethers.BigNumber.from(inputAmount.toString()).toHexString();

    //     let txObj = {
    //         amountOutMinHex: amountOutMinHex,
    //         inputAmountHex: inputAmountHex,
    //         path: path,
    //         deadline : Math.floor(Date.now()/1000) + 60 * 10,
    //         gasPrice : filteredTransaction.gasPrice*1.25
    //     }
    //     await uniswap.buyTokens(txObj)
    // }



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