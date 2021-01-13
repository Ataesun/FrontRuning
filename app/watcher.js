require('dotenv').config()
const axios = require('axios').default;

const precise = async (token) => {
  let sig = await axios.get(`https://api.ethplorer.io/getTokenInfo/${token}?apiKey=${process.env.TOKENKEY}`);
  decimals = sig.data.decimals
  holdersCount = sig.data.holdersCount

  return {
    decimals,
    holdersCount
  };
}



const watcher = async (event) => {
  let compareGas = await axios.get(process.env.GASAPI)
  compareGas = compareGas.data
  if (
    event.status === 'pending' && event.contractCall.methodName === 'swapExactETHForTokens' ||
    event.status === 'pending' && event.contractCall.methodName === 'swapETHForExactTokens') {

    if (parseInt(event.gasPrice) > (compareGas.average - 10) * 100000000 && parseInt(event.gasPrice) < (compareGas.fast +10) * 100000000) {
      if (event.contractCall.params.path[1].toLowerCase() !== '0x6b175474e89094c44da98b954eedeac495271d0f'.toLocaleLowerCase() &&
        event.contractCall.params.path[1].toLowerCase() !== '0xdac17f958d2ee523a2206206994597c13d831ec7'.toLocaleLowerCase() &&
        event.contractCall.params.path[1].toLowerCase() !== '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'.toLocaleLowerCase() &&
        event.contractCall.params.path[1].toLowerCase() !== '0x90f64cd258373c6a2bf7f0fc0034d1a95ff6954e'.toLocaleLowerCase() &&
        event.contractCall.params.path[1].toLowerCase() !== '0x5d3a536e4d6dbd6114cc1ead35777bab948e3643'.toLocaleLowerCase() &&
        event.contractCall.params.path[1].toLowerCase() !== '0x39aa39c021dfbae8fac545936693ac917d5e7563'.toLocaleLowerCase() &&
        event.contractCall.params.path[1].toLowerCase() !== '0xd46ba6d942050d489dbd938a2c909a5d5039a161'.toLocaleLowerCase() &&
        event.contractCall.params.path[1].toLowerCase() !== '0x363edC62b8236a0079c00320340485Ee0E7B17ae'.toLocaleLowerCase() &&
        event.contractCall.params.path[1].toLowerCase() !== '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599'.toLocaleLowerCase()
      ) {

        if (event.contractCall.params.amountOutMin !== undefined && event.value/1e18 > 3  ) {
          // if all cases are passed, passes object with unmodified key data

          let obj = {
            method: event.contractCall.methodName,
            txHash: event.hash,
            gas: parseInt(event.gas),
            gasPrice: parseInt(event.gasPrice),
            etherValue: parseInt(event.value)/1e18,
            amountOutMin: event.contractCall.params.amountOutMin,
            tokenOut: event.contractCall.params.path[1],
            deadline: parseInt(event.contractCall.params.deadline)
          }

          let ret = await precise(obj.tokenOut,obj.amountOutMin)
          obj.decimals = ret.decimals;
          obj.holdersCount = ret.holdersCount;

          obj.amountOutMin = Number.parseFloat(obj.amountOutMin)/Math.pow(10, obj.decimals)
          if(holdersCount<200){
            return undefined
          }

          console.log(obj)
          return obj;
        }
      }
    }
  }
}


module.exports = {
  watcher,
}