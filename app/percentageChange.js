const axios = require("axios")

const fetchData = async (pairID)=> {
  let response = await axios({
    url: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2',
    method: 'post',
    data: {
      query: `
  query test{
    pair(id: "${pairID}"){
    reserve0
    reserve1
    token0{
        name
      }
    	token1{
        name
      }
 		token0Price
    token1Price
    }
  }

  `,
    }
  })


  response = response.data.data.pair;

  if(response.token0.name !== 'Wrapped Ether'){
    return {
      eth : {
        name : response.token1.name,
        price : response.token1Price,
        reserve : response.reserve1
      },
      pairToken : {
        name : response.token0.name,
        price : response.token0Price,
        reserve : response.reserve0
      }
    }
  }

  return {
    eth : {
      name : response.token0.name,
      price : response.token0Price,
      reserve : response.reserve0
    },
    pairToken : {
      name : response.token1.name,
      price : response.token1Price,
      reserve : response.reserve1
    }
  }
}

const percentageChange = async (pair, etherAmount, tokenAmount) => {
let { eth, pairToken} = await fetchData(pair);
let priceIncrease = (eth.reserve+etherAmount/pairToken.reserve-tokenAmount)*0.7
  return {
    priceIncrease,
    eth,
    pairToken
  }
}

// const test = async () => {
//   let data = await percentageChange("0x81fbef4704776cc5bba0a5df3a90056d2c6900b3")
// }
// test()

module.exports = percentageChange