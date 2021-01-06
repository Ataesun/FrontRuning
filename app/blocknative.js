// Create the block native object
const BlocknativeSdk = require('bnc-sdk');
const WebSocket = require('ws');
require('dotenv').config()

const options = {
    dappId: process.env.DAPPID3,
    networkId: 1,
    transactionHandlers: [],
    ws: WebSocket
}

const blocknative = new BlocknativeSdk(options)

const createEmitter = () => {
    const {
        emitter,
        details
    } = blocknative.account(process.env.UNISWAP)
    return emitter
}

const unsubscribe = () => {
    blocknative.unsubscribe(process.env.UNISWAP)
}

module.exports = {
    createEmitter,
    unsubscribe
}
