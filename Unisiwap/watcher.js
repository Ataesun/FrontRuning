require('dotenv').config()
const chalk = require('chalk')
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
    if (event.status.toLowerCase() === "confirmed") {
      let sellObj = uniswap.getSellObj(buyObj.token, buyObj.pair, buyObj)
      console.log(chalk.green("Commence selling"))
      let sellTx = await uniswap.sellTokens(sellObj);
      console.log(chalk.green("Successfully front ran something"))
    }
  }
  if (txArray.includes(event.status.toLowerCase())) {
    console.log(chalk.red("Their Txfailed, cancelling"))
    await cancel()
    console.log(chalk.green("cancelled"))
    console.log(`Their failed tx \n ${EtherscanUrl}${buyObj.txHash}`)
  }
}

module.exports = {
  watcher,
  txWatcher
}