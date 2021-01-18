require('dotenv').config()
const {viableEvent, createFilteredTransaction} = require('./HelperFolders/watcherValidator')


const watcher = async (event,myTrie,compareGas) => {
  return await viableEvent(event, myTrie,compareGas)
}

module.exports = {
  watcher,
}