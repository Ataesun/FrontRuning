require('dotenv').config()
// Create the block native object
const BlocknativeSdk = require('bnc-sdk');
const WebSocket = require('ws');

const options = {
    dappId: process.env.DAPPID9,
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


const createTransactionWatcher = async (hash) => {

    const {
        emitter,
        details
    } = blocknative.transaction(hash)

    return emitter
}


const stopWatcher = () => {
    blocknative.unsubscribe(process.env.UNISWAP)
}
module.exports = {
    createEmitter,
    createTransactionWatcher,
    stopWatcher
}
