const isProfitable = require('./isProfitable')


const frontRun = async (filteredTransaction) => {
    let frontRunable = await isProfitable(filteredTransaction);
    if(frontRunable !== false){
        // await uniswap.buyTokens;
        // await uniswap.sellTokens
    }
}

module.exports = frontRun