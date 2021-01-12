require('dotenv').config()
const axios = require('axios').default;
const {viableEvent, createFilteredTransaction} = require('./HelperFolders/watcherValidator')


const watcher = async (event) => {
  compareGas = await getGas()
  if (viableEvent(event,compareGas)) {
    let filteredTransaction = await createFilteredTransaction(event)
    return filteredTransaction  
  }
}

module.exports = {
  watcher,
}