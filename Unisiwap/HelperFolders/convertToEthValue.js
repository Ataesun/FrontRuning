const { Fetcher, Route, Token } = require('@uniswap/sdk');
const { ChainID, Weth, } = require('./uniswapConstants')

const amountMinCalc = (obj) => {
    if(obj.amountIn === undefined){
        obj.amountIn = 0;
    } else{
        obj.amountInMax = 0;
    }

    return obj.amountInMax + obj.amountIn;
}


const convertToEth = async (obj) => {

    console.log(obj)

    obj.amountIn = amountMinCalc(obj)
    let token = new Token(ChainID, obj.tokenOut, obj.decimals)
    let pair = await Fetcher.fetchPairData(token, Weth);
    let route = new Route([pair], Weth);

    let priceTokenIn = route.midPrice.invert().toSignificant(6);

    obj.value = priceTokenIn * obj.amountIn
        console.log(obj.value);
    return obj

}

module.exports = convertToEth