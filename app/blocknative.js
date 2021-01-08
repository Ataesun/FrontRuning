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
    
    
    emitter.on("txPool", async (event) => {
        if(parseInt(event.value)/1e18 > 5){
            console.log(`Watching transaction ${event.hash}`)
            createTransactionWatcher(event.hash)
        }
    })
}

const unsubscribe = () => {
    blocknative.unsubscribe(process.env.UNISWAP)
}

const createTransactionWatcher = async (hash) => {

    const {
        emitter,
        details
    } = blocknative.transaction(hash)

    emitter.on('txConfirmed', transaction => {
        console.log(`${transaction.hash} has finished`)
        console.log(transaction)
    })

}



createEmitter()


module.exports = {
    createEmitter,
    unsubscribe,
    createTransactionWatcher
}
