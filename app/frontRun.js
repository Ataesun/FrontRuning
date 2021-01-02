const isProfitable = require('./isProfitable')
const uniswap = require('./uniswap')


const frontRun = async (filteredTransaction) => {

    console.log('In frontRun.js')
    let frontRunable = isProfitable(filteredTransaction);
    if(frontRunable !== false){
        console.log(uniswap)
    }
}

module.exports = frontRun