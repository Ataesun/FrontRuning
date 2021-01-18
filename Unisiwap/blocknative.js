require('dotenv').config()
// Create the block native object
const BlocknativeSdk = require('bnc-sdk');
const WebSocket = require('ws');
const uniswap = require('./uniswap')
const { insertApprove, checkApprove } = require('./database/approvedToken')
const UniswapUrl = "https://app.uniswap.org/#/swap?inputCurrency="
const EtherscanUrl = 'https://etherscan.io/tx/'
const cancel = require('./cancel')
const options = {
    dappId: process.env.DAPPID11S,
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


const createTransactionWatcher = async (hash, buyObj, pairAddress) => {

    const {
        emitter,
        details
    } = blocknative.transaction(hash)

    emitter.on("all", ((event) => {
        console.log(event)
        if (event.status === undefined) {
            console.log("Saw event " + event.status)
            if (event.status.toLowerCase() === "confirmed") {
                if (!checkApprove(pairAddress)) {
                    console.log('Approve the fkn token you dumb fuck')
                    console.log(UniswapUrl + buyObj.token.address)
                    insertApprove(pairAddress);
                    process.exit("Successfully front ran something")
                } else {
                    let sellObj = uniswap.getSellObj(buyObj.token, buyObj.pair, buyObj)
                    console.log(sellObj)
                    let sellTx = uniswap.sellTokens(sellObj);
                    insertApprove(pairAddress);
                    process.exit("Successfully front ran something")
                }
            }
        }
        console.log("Saw event " + event.stat)
        cancel(buyObj.buyObj.gasPrice, 140)
        process.exit(`Failed\n ${EtherscanUrl}${hash}`)
    }))
}
    // emitter.on('txStuck', (event) => {

    // })

    // emitter.on('txFailed', (event) => {
    //     console.log("Saw event " + event.stat)
    //     cancel(buyObj.buyObj.gasPrice, 139)
    //     process.exit(`Failed\n
    //     ${EtherscanUrl}${hash}`)
    // })

    // emitter.on('txCancel', (event) => {
    //     console.log("Saw event " + event.stat)
    //     cancel(buyObj.buyObj.gasPrice, 139)
    //     process.exit(`Failed\n
    //     ${EtherscanUrl}${hash}`)
    // })

    // emitter.on('txDropped', (event) => {
    //     console.log("Saw event " + event.stat)
    //     cancel(buyObj.buyObj.gasPrice, 139)
    //     process.exit(`Failed\n
    //     ${EtherscanUrl}${hash}`)
    // })



const stopWatcher = () => {
    blocknative.unsubscribe(process.env.UNISWAP)
}
module.exports = {
    createEmitter,
    createTransactionWatcher,
    stopWatcher
}
