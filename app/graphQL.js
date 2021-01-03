const axios = require("axios")

const getPair = async (pairId) => {

    console.log(typeof pairId)


    let response = await axios({
        url: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2',
        method: 'post',
        data: {
            query: `
      query test{
        pair(id : "${pairId}" ){
          reserve0
          reserve1
        }
      }
      `,}
    })
    let data = response.data
    console.log(data)
}
getPair("0xbb2b8038a1640196fbe3e38816f3e67cba72d940");