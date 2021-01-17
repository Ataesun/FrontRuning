
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



const getGas = async () => {
    let compareGas = await axios.get(process.env.GASAPI)
    compareGas = compareGas.data
    compareGas = (parseInt(compareGas.fast) + parseInt(compareGas.fastest) + parseInt(compareGas.average)) / 30;

    return parseInt(compareGas)
}


const viableEvent = async (event) => {


    let compareGas = await getGas();
    if (
        event.status === 'pending' && event.contractCall.methodName === 'swapExactETHForTokens' ||
        event.status === 'pending' && event.contractCall.methodName === 'swapETHForExactTokens') {
        if (parseInt(event.gasPrice) > (compareGas * 0.7e9) || parseInt(event.gasPrice) < (compareGas)) {
            let path = event.contractCall.params.path
        }
            
                if (event.contractCall.params.amountOutMin !== undefined && event.value > 1e18) {
                    return true;
                }
            
        }
    }



const createFilteredTransaction = async (event) => {
    // if event.contractCall.methodName === (swapExactTokensForTokens) {
        
    // }

    let path = event.contractCall.params.path
    if(!path) return

    let obj = {
        method: event.contractCall.methodName,
        txHash: event.hash,
        gas: parseInt(event.gas),
        gasPrice: parseInt(event.gasPrice),
        etherValue: parseInt(event.value) / 1e18,
        amountOutMin: event.contractCall.params.amountOutMin,
        tokenOut: event.contractCall.params.path[event.contractCall.params.path.length-1],
        deadline: parseInt(event.contractCall.params.deadline)
    }

    let ret = await precise(obj.tokenOut, obj.amountOutMin)
    obj.decimals = ret.decimals;
    obj.holdersCount = ret.holdersCount;

    obj.amountOutMin = Number.parseFloat(obj.amountOutMin) / Math.pow(10, obj.decimals)
    if (holdersCount < 200) {
      return undefined
    }

    console.log('')
    console.log(event.hash)
    console.log(parseInt(event.value)/1e18)
    console.log('token ' + event.contractCall.params.path[path.length-1])

    return obj;
}

module.exports = {
    viableEvent,
    createFilteredTransaction,
}