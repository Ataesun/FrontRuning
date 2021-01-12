const {ChainId, Fetcher, WETH, Route} = require('@uniswap/sdk');

const chainID = ChainId.MAINNET;


// import amountIn, amountOutMin, tokenIn 





const convertToEth = async (tokenIn, amount) => {

    const token = await Fetcher.fetchTokenData(chainID,tokenIn);
    const weth = WETH[chainID];
    const pair = await Fetcher.fetchPairData(token,weth);
    const route = new Route([pair],weth);

    var priceTokenIn = route.midPrice.invert().toSignificant(6);
    console.log(priceTokenIn);

    var EthValue = priceTokenIn * 5000
    console.log(EthValue)
    return EthValue
    
}

convertToEth('0x6b175474e89094c44da98b954eedeac495271d0f', 5000);