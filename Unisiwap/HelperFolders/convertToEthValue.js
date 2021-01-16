const { Fetcher, Route, Token } = require('@uniswap/sdk');
const { ChainID, Weth, } = require('./uniswapConstants')

const amountMinCalc = (event, decimals) => {
    event = event.contractCall.params
    if(event.amountIn === undefined){
        event.amountIn = 0;
    } else{
        event.amountInMax = 0;
    }

    console.log((event.amountInMax + event.amountIn)/Math.pow(10,decimals))

    return (event.amountInMax + event.amountIn)/Math.pow(10,decimals);
}


const convertToEth = async (event,tokenAdress, decimals) => {

    let amountIn = amountMinCalc(event, decimals)

    console.log( {amountIn})
    let token = new Token(ChainID, tokenAdress, decimals)
    let pair = await Fetcher.fetchPairData(token, Weth);
    let route = new Route([pair], Weth);

    let priceTokenIn = route.midPrice.invert().toSignificant(6);

    console.log(pair.liquidityToken.address.toLowerCase())

    console.log({priceTokenIn,amountIn})

    let value = priceTokenIn * amountIn
    console.log({value})
    return value

}

module.exports = convertToEth