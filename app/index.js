const emitter = require('./blocknative')
const watcher = require('./watcher')
const frontRun = require('./frontRun')

console.log("Starting Emitter")

emitter.on("txPool", async (event) => {
    let filteredTransaction = {}
    filteredTransaction = await watcher(event)
    if (filteredTransaction !== undefined) {
        frontRun(filteredTransaction);
    }
})