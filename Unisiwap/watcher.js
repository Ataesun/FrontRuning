require('dotenv').config()
const {viableEvent, createFilteredTransaction} = require('./HelperFolders/watcherValidator')


const watcher = async (event) => {
  if (await viableEvent(event)) {
    let filteredTransaction = await createFilteredTransaction(event)
    return filteredTransaction  
  }
}

module.exports = {
  watcher,
}