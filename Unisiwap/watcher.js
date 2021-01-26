require('dotenv').config()
const { viableEvent } = require('./HelperFolders/watcherValidator')
const uniswap = require('./uniswap')
const EtherscanUrl = 'https://etherscan.io/tx/'
const cancel = require('./cancel')
const accept = ['stuck', 'cancel', 'dropped', 'failed', 'confirmed']
const txArray = ['stuck', 'cancel', 'dropped', 'failed']



const watcher = async (event, myTrie, compareGas) => {
  return await viableEvent(event, myTrie, compareGas)
}

const txWatcher = async (event, buyObj, gas) => {
  console.log(event.status)
  if (accept.includes(event.status.toLowerCase())) {
    console.log("Saw event " + event.status)
    if (event.status.toLowerCase() === "confirmed") {
      let sellObj = uniswap.getSellObj(buyObj.token, buyObj.pair, buyObj)
      console.log(`Ready to sell`)
      let sellTx = await uniswap.sellTokens(sellObj);
      console.log("Successfully front ran something")
    }
  }
  if (txArray.includes(event.status.toLowerCase())) {
    await cancel()
    console.log(`Failed\n ${EtherscanUrl}${buyObj.txHash}`)
  }
}

module.exports = {
  watcher,
  txWatcher
}