require('dotenv').config()
const { ChainId, Fetcher, WETH, Route, Trade, TokenAmount, TradeType, Percent, Token, Price } = require('@uniswap/sdk');
const chainID = ChainId.MAINNET;
const ethers = require('ethers');

const provider = ethers.getDefaultProvider('mainnet', {
    infra: process.env.INFURA
})

const slippageTolerance = new Percent('100', '100000');
const weth = WETH[chainID];
const to = process.env.TO;

console.log(process.env.SWAPEXACTETHFORTOKENS)


const signer = new ethers.Wallet(process.env.WALLET);

const account = signer.connect(provider);

const buyTokens = new ethers.Contract(
    process.env.UNISWAP,
    [process.env.SWAPEXACTETHFORTOKENS]
    , account
);

const sellTokens = new ethers.Contract(
    process.env.UNISWAP,
    [process.env.SWAPEXACTTOKENSFORETH]
    , account
);

module.exports = {
    sellTokens,
    buyTokens,
}