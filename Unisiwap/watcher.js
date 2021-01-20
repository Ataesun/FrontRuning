require('dotenv').config()
const { viableEvent } = require('./HelperFolders/watcherValidator')
const uniswap = require('./uniswap')
const { insertApprove, checkApprove } = require('./database/approvedToken')
const UniswapUrl = "https://app.uniswap.org/#/swap?inputCurrency="
const EtherscanUrl = 'https://etherscan.io/tx/'
const cancel = require('./cancel')
const accept = ['txstuck', 'txcancel', 'txdropped', 'txfailed','confirmed']
const txArray = ['txstuck', 'txcancel', 'txdropped', 'txfailed']



const watcher = async (event, myTrie, compareGas) => {
  return await viableEvent(event, myTrie, compareGas)
}

const txWatcher = async (event, buyObj, pairAddress, gas)=>{
  if (accept.includes(event.status.toLowerCase())) {
    console.log("Saw event " + event.status)
    if (event.status.toLowerCase() === "confirmed") {
      if (!await checkApprove(pairAddress)) {
        console.log('Approve the fkn token you dumb fuck')
        console.log(UniswapUrl + buyObj.token.address)
        await insertApprove(pairAddress);
        console.log("Successfully front ran something")
        process.exit("Successfully front ran something")
      } else {
        let sellObj = uniswap.getSellObj(buyObj.token, buyObj.pair, buyObj)
        console.log(sellObj)
        let sellTx = uniswap.sellTokens(sellObj);
        await insertApprove(pairAddress);
        console.log("Successfully front ran something")
        process.exit("Successfully front ran something")
      }
    }
    if (txArray.includes(event.status.toLowerCase())) {
      cancel(gas)
      console.log(`Failed\n ${EtherscanUrl}${hash}`)
      process.exit(`Failed\n ${EtherscanUrl}${hash}`)
    }
  }
}

module.exports = {
  watcher,
  txWatcher
}