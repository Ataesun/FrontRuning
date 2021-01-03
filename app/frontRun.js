const isProfitable = require('./isProfitable')


const frontRun = async (filteredTransaction) => {
    await isProfitable(filteredTransaction);
}

module.exports = frontRun