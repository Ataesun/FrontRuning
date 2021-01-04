const { ChainId, Fetcher, Route, Trade, TokenAmount, TradeType, Token } = require('@uniswap/sdk');
const axios = require('axios').default
const uniswap = require('./uniswap')
const percentageChange = require('./percentageChange')

const isProfitable = async (filteredTransaction) => {

    let { token, pair} = await uniswap.fetchData(filteredTransaction)
    let etherValue = filteredTransaction.etherValue / 1e18;
    let amount = filteredTransaction.amountOutMin

    let {eth, pairToken} = await percentageChange(pair.liquidityToken.address)
    let MaximumEtherLoss = etherValue - (eth.price * amount)

    // 70% of maximum slippage
    let threshHold = 1+(MaximumEtherLoss/etherValue*0.7);
    // let input = (slippagePercent/2)

    console.log(filteredTransaction)
    console.log(`maximum Ether Loss ${MaximumEtherLoss}`)
    console.log(`increase threshold is : ${threshHold}`);

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