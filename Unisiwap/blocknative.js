require('dotenv').config()
// Create the block native object
const BlocknativeSdk = require('bnc-sdk');
const WebSocket = require('ws');
const uniswap = require('./uniswap')



const options = {
<<<<<<< HEAD
<<<<<<< Updated upstream
    dappId: process.env.DAPPID15,
=======
    dappId: process.env.DAPPID12,
>>>>>>> Stashed changes
=======
    dappId: process.env.DAPPID12,
>>>>>>> SamBranch
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

    console.log('Now watching' + hash)
    blocknative.unsubscribe(process.env.UNISWAP)
    emitter.on('txConfirmed', async () => {
        console.log('Transaction Finished ')
            // let sellObj = uniswap.getSellObj(buyObj.token,buyObj.pair, buyObj)
            // console.log(sellObj)
            // let sellTx = uniswap.sellTokens(sellObj);
        process.exit()
    })
}


module.exports = {
    createEmitter,
    createTransactionWatcher
}
