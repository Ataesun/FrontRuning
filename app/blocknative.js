require('dotenv').config()
// Create the block native object
const BlocknativeSdk = require('bnc-sdk');
const WebSocket = require('ws');
const writeToEnv = require('./writeToEnv')


const options = {
    dappId: process.env.DAPPID2,
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
        
    })
}

createTransactionWatcher('0x68a4929d72d0d0367b70be773d99cb92144fde467205b43741d8c7fcfd802009');


module.exports = {
    createEmitter,
    unsubscribe,
    createTransactionWatcher
}
