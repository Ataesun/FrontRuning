const axios = require("axios")

const fetchData = async (pairID)=> {

  let response = await axios({
    url: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2',
    method: 'post',
    data: {
      query: `
  query test{
    pair(id: "${pairID.toLowerCase()}"){
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

  // sorting the data so token0 is always etherum

console.log(response)

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

const percentageChange = async (pair) => {


let { eth, pairToken} = await fetchData(pair);
  // console.log(eth)
  // console.log(token)
  return {
    eth,
    pairToken
  }

}
// const test = async () => {
//   let data = await percentageChange(5.214, 150000, '0x81fbef4704776cc5bba0a5df3a90056d2c6900b3')
//   console.log(data)
// }
// test()

module.exports = percentageChange