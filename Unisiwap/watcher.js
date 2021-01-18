require('dotenv').config()
const {viableEvent, createFilteredTransaction} = require('./HelperFolders/watcherValidator')


const watcher = async (event,myTrie,compareGas) => {
  console.log(event)
  return await viableEvent(event, myTrie,compareGas)
}

module.exports = {
  watcher,
}