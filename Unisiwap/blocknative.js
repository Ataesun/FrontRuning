require('dotenv').config()
// Create the block native object
const BlocknativeSdk = require('bnc-sdk');
const WebSocket = require('ws');
const uniswap = require('./uniswap')



const options = {
    dappId: process.env.DAPPID5S,
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


const createTransactionWatcher = async (hash,buyObj) => {

    const {
        emitter,
        details
    } = blocknative.transaction(hash)

    return emitter
}


module.exports = {
    createEmitter,
    createTransactionWatcher
}
