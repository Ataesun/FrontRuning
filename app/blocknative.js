require('dotenv').config()
// Create the block native object
const BlocknativeSdk = require('bnc-sdk');
const WebSocket = require('ws');
const writeToEnv = require('./writeToEnv')


const options = {
    dappId: process.env.DAPPID,
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

const createTransactionWatcher = async(hash) =>{

    console.log(`Watching transaction ${hash}`)

    const {
        emitter,
        details
    } = blocknative.transaction(hash)
    

    emitter.on("txConfirmed", (obj) => {
        console.log(obj)
        writeToEnv.write()
        console.log('written')
    })
}

// createTransactionWatcher('0xd5857df5b5f46f0cf5f1435112834a3a63d74f820c842ef461b77a2a42aff0b9');


module.exports = {
    createEmitter,
    unsubscribe,
    createTransactionWatcher
}
