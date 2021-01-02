// Create the block native object
const BlocknativeSdk = require('bnc-sdk');
const WebSocket = require('ws');
require('dotenv').config()

const options = {
    dappId: process.env.DAPPID,
    networkId: 1,
    transactionHandlers: [],
    ws: WebSocket
}

const blocknative = new BlocknativeSdk(options)
const {
    emitter,
    details
} = blocknative.account(process.env.UNISWAP)

module.exports = emitter;
