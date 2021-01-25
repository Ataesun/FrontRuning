require('dotenv').config()
const { viableEvent } = require('./HelperFolders/watcherValidator')
const uniswap = require('./uniswap')
const { insertApprove, checkApprove } = require('./database/approvedToken')
const UniswapUrl = "https://app.uniswap.org/#/swap?inputCurrency="
const EtherscanUrl = 'https://etherscan.io/tx/'
const cancel = require('./cancel')
const accept = ['stuck', 'cancel', 'dropped', 'failed','confirmed']
const txArray = ['stuck', 'cancel', 'dropped', 'failed']



const watcher = async (event, myTrie, compareGas) => {
  return await viableEvent(event, myTrie, compareGas)
}

const txWatcher = async (event, buyObj, pairAddress, gas)=>{
  console.log(event.status)
  if (accept.includes(event.status.toLowerCase())) {
    console.log("Saw event " + event.status)
    if (event.status.toLowerCase() === "confirmed") {
      if (!await checkApprove(pairAddress)) {
        console.log(`creating approve`)
        uniswap.getApprove(buyObj.token.pairAddress)
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
      let cancel = await cancel()
      console.log(`Failed\n ${EtherscanUrl}${buyObj.txHash}`)
      process.exit(`Failed\n ${EtherscanUrl}${buyObj.txHash}`)
    }
  }
}

module.exports = {
  watcher,
  txWatcher
}