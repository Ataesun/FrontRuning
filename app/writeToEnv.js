
require('dotenv').config()
const fs = require('fs')
const envfile = require('envfile')
const sourcePath = './.env'
const parsedFile  = {
    GASAPI : process.env.GASAPI,
    UNISWAP : process.env.UNISWAP,
    INFURA : process.env.INFURA,
    WALLET : process.env.WALLET,
    SWAPEXACTTOKENSFORETH : process.env.SWAPEXACTTOKENSFORETH,
    SWAPEXACTETHFORTOKENS : process.env.SWAPEXACTETHFORTOKENS,
    DAPPID : process.env.DAPPID,
    DAPPID1 : process.env.DAPPID1,
    DAPPID2 : process.env.DAPPID2,
    DAPPID3 : process.env.DAPPID3,
    DAPPID4 : process.env.DAPPID4,
    DAPPID5 : process.env.DAPPID5,
    DAPPID6 : process.env.DAPPID6,
    DAPPID7 : process.env.DAPPID7,
    DAPPID8 : process.env.DAPPID8,
    DAPPID9 : process.env.DAPPID9,
    DAPPID10 : process.env.DAPPID10,
    TOKENKEY : process.env.TOKENKEY,
    ETHPRICE : process.env.ETHPRICE,
}


const write = () => {
    parsedFile.ISFINISHED = "true"
    fs.writeFileSync(sourcePath, envfile.stringify(parsedFile))
}

const rewrite = () => {
    parsedFile.ISFINISHED = "false"
    fs.writeFileSync(sourcePath, envfile.stringify(parsedFile))
}

module.exports = {
    write,
    rewrite
}