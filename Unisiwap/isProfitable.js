require('dotenv').config()
const chalk = require('chalk')
const uniswap = require('./uniswap')
const { Weth } = require('./HelperFolders/uniswapConstants')
const percentageChange = require('./uniswapApi')
const maximise = require('./maximise')


const isProfitable = async (filteredTransaction) => {
    let etherValue = filteredTransaction.etherValue/1e18;
    let tokenOutAmount = filteredTransaction.amountOutMin/Math.pow(10,filteredTransaction.decimals)

    let { token, pair } = await uniswap.getData(filteredTransaction)
    let { priceIncrease, eth, pairToken } = await percentageChange(pair.liquidityToken.address.toLowerCase(), etherValue, tokenOutAmount)

    if(priceIncrease <0) return undefined
    let MaximumEtherLoss = etherValue - (eth.price * tokenOutAmount)
    if (MaximumEtherLoss < 0) {
        console.log(chalk.red('undefined slippage'))
        return undefined
    }
    let slippage = 1 + ((MaximumEtherLoss / etherValue) * 0.7);

    let willingToLoseUsd = MaximumEtherLoss * process.env.ETHPRICE

    let GasCost = ((filteredTransaction.gasPrice + 40e9) / 25e8)

    console.log(chalk.blue("Price increase : " + priceIncrease))

    console.log(chalk.blue("Maximumu ether loss : " + MaximumEtherLoss))

    console.log(chalk.blue("Etherum value :" + etherValue))

    console.log(chalk.blue(`Willing to lose usd : ${willingToLoseUsd} GasCost  = ${GasCost}`))

    let x = await maximise(eth, pairToken, slippage, priceIncrease)
    let theoreticalProfit = x * priceIncrease * process.env.ETHPRICE
    console.log(chalk.magenta.bold("theoretical - gascost : " + (theoreticalProfit - GasCost)))
    if (parseFloat(theoreticalProfit) - GasCost > 70) {
        console.log(chalk.green('found profitable transaction, passing back buyObj'))
        let trade = uniswap.getTrade(pair, Weth, x * 1e18)
        return {
            buyObj: await uniswap.getBuyObj(filteredTransaction, trade, token),
            pairAddress : pair.liquidityToken.address.toLowerCase(),
            txHash : filteredTransaction.txHash,
            pair,
            token
        }
    }
    return undefined
}




module.exports = isProfitable