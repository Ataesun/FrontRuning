require('dotenv').config()
const { ChainId, Fetcher, Trade, TokenAmount, Route, Token, WETH, Percent } = require('@uniswap/sdk');
const chainID = ChainId.MAINNET;
const ethers = require('ethers');

const provider = ethers.getDefaultProvider('mainnet', {
    infra: process.env.INFURA
})

const buyTolerance = new Percent('50', '100000');
const sellTolerance = new Percent('100', '100000');
const weth = WETH[chainID];
const to = process.env.TO;


const signer = new ethers.Wallet(process.env.WALLET);

const account = signer.connect(provider);

const buy = new ethers.Contract(
    process.env.UNISWAP,
    [process.env.SWAPEXACTETHFORTOKENS]
    , account
);


const wrapObj = (filteredTransaction, trade) => {
    let amountOutMin = trade.minimumAmountOut(buyTolerance).raw;
    let amountOutMinHex = ethers.BigNumber.from(amountOutMin.toString()).toHexString();

    let path = createPath(weth, token)
    let inputAmount = trade.inputAmount.raw;
    let inputAmountHex = ethers.BigNumber.from(inputAmount.toString()).toHexString();

    let txObj = {
        amountOutMinHex: amountOutMinHex,
        inputAmountHex: inputAmountHex,
        path: path,
        deadline: Math.floor(Date.now() / 1000) + 60 * 10,
        gasPrice: filteredTransaction.gasPrice * 1.25
    }

    return txObj;

}

const createSellObj = (obj, amount) => {
    let trade = createTrade(obj.pair, obj.token, amount)

    let amountOutMin = trade.minimumAmountOut(sellTolerance).raw;
    let amountOutMinHex = ethers.BigNumber.from(amountOutMin.toString()).toHexString();

    let path = createPath(obj.token, weth)

    let txObj = {
        amountIn: amount,
        amountOutMinHex: amountOutMinHex,
        path: path,
        deadline: Math.floor(Date.now() / 1000) + 60 * 10,
        gasPrice: obj.buyObj.gasPrice
    }

    return txObj;

}

const createApprove = (tokenAddress) => {
    const approveFunction = new ethers.Contract(
        tokenAddress,
        ['function approve(address _spender, uint256 _value) public returns (bool success)'],
        account
    )
    console.log('Object created')
    approveFunction.approve(process.env.TO, 1)
    console.log('Approved')
}

const sell = new ethers.Contract(
    process.env.UNISWAP,
    [process.env.SWAPEXACTTOKENSFORETH]
    , account
);

const fetchData = async (filteredTransaction) => {
    let token = new Token(ChainId.MAINNET, filteredTransaction.tokenOut, filteredTransaction.decimals)
    pair = await Fetcher.fetchPairData(token, weth);
    return {
        token,
        pair,
    }
}

const createPath = (tokenFrom, tokenTo) => {
    return [tokenFrom.address, tokenTo.address]
}


const buyTokens = async (buyObj) => {
    await buy.swapExactETHForTokens(
        buyObj.amountOutMinHex,
        buyObj.path,
        process.env.TO,
        buyObj.deadline,
        {
            value: buyObj.inputAmountHex,
            gasPrice: buyObj.gasPrice,
            gasLimit: ethers.BigNumber.from(500000).toHexString()
        });
}

const sellTokens = async (sellObj) => {
    await sell.swapExactTokensForETH(
        sellObj.amountIn,
        sellObj.amountOutMinHex,
        sellObj.path,
        process.env.TO,
        sellObj.deadline,
        {
            value: sellObj.inputAmountHex,
            gasPrice: sellObj.gasPrice,
            gasLimit: ethers.BigNumber.from(500000).toHexString()
        });
}

const createTrade = (pair, token, amount) => {

    let route = new Route([pair], token);
    let trade = new Trade(route, new TokenAmount(weth, BigInt(amount), TradeType.EXACT_INPUT));
    return trade
}


module.exports = {
    sellTokens,
    buyTokens,
    fetchData,
    createPath,
    createApprove,
    createTrade,
    createSellObj,
    sellWrapper,
    weth,
    chainID,
}