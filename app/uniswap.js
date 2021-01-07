require('dotenv').config()
const { ChainId, Fetcher, Trade, TokenAmount, Route, Token, TradeType, WETH, Percent } = require('@uniswap/sdk');
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


const createBuyObj = async (filteredTransaction, trade, token) => {
    let amountOutMin = trade.minimumAmountOut(buyTolerance).raw;
    let amountOutMinHex = ethers.BigNumber.from(amountOutMin.toString()).toHexString();

    let path = createPath(weth, token)
    let inputAmount = trade.inputAmount.raw;
    let inputAmountHex = ethers.BigNumber.from(inputAmount.toString()).toHexString();

    let txObj = {
        frontRunningHash : filteredTransaction.txHash,
        amountOutMinHex: amountOutMinHex,
        inputAmountHex: inputAmountHex,
        path: path,
        deadline: Math.floor(Date.now() / 1000) + 60 * 10,
        gasPrice: filteredTransaction.gasPrice * 1.25
    }
    console.log("Returning TxObj back to index,js")

    return txObj;

}

const createSellObj = (token, pair, gas, amount) => {
    let trade = createTrade(pair, token, amount)

    let amountOutMin = trade.minimumAmountOut(sellTolerance).raw;
    let amountOutMinHex = ethers.BigNumber.from(amountOutMin.toString()).toHexString();

    let path = createPath(token, weth)

    let txObj = {
        amountIn: amount,
        amountOutMinHex: amountOutMinHex,
        path: path,
        deadline: Math.floor(Date.now() / 1000) + 60 * 10,
        gasPrice: gas
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
    let tx = await buy.swapExactETHForTokens(
        buyObj.amountOutMinHex,
        buyObj.path,
        process.env.TO,
        buyObj.deadline,
        {
            value: buyObj.inputAmountHex,
            gasPrice: buyObj.gasPrice,
            gasLimit: ethers.BigNumber.from(500000).toHexString()
        });
        await tx.wait();
        return tx
}

const sellTokens = async (sellObj) => {
    let tx = await sell.swapExactTokensForETH(
        sellObj.amountIn,
        sellObj.amountOutMinHex,
        sellObj.path,
        process.env.TO,
        sellObj.deadline,
        {
            gasPrice: sellObj.gasPrice,
            gasLimit: ethers.BigNumber.from(500000).toHexString()
        });

        let reciept =  await tx.wait();
        return reciept
}

const createTrade = (pair, token, amount) => {

    let route = new Route([pair], token);
    let trade = new Trade(route, new TokenAmount(token, BigInt(amount)), TradeType.EXACT_INPUT);
    return trade
}


module.exports = {
    sellTokens,
    buyTokens,
    fetchData,
    createPath,
    createApprove,
    createTrade,
    createBuyObj,
    createSellObj,
    weth,
    chainID,
}

// const test = async () => {

//     let dai = await Fetcher.fetchTokenData(chainID, '0x6b175474e89094c44da98b954eedeac495271d0f');
//     let pair = await Fetcher.fetchPairData(dai, weth);

//     let obj = {
//         token: dai,
//         pair: pair,
//         gasPrice : 1
//     }

//     let amount = BigInt(1e18);

//     let sellThing = createSellObj(obj, amount)
//     let tx = await sellTokens(sellThing)


// }


// test()