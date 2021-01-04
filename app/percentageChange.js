const axios = require("axios")

const percentageChange = async (etherAmount, tokenAmount, pair) => {

  let response = await axios({
    url: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2',
    method: 'post',
    data: {
      query: `
  query test{
    pair(id : "0x6591c4bcd6d7a1eb4e537da8b78676c1576ba244"){
      reserve0
      reserve1
    }
  }
  `,
    }
  })

  let data = await response.data
  console.log(data)
  let reserve0 = parseFloat(data.data.pair.reserve0)
  let reserve1 = parseFloat(data.data.pair.reserve1)


  let current = reserve0 / reserve1
  let change = (reserve0 - etherAmount) / (reserve1 + tokenAmount)

  return (current / change) - 1

}
// const test = async () => {
//   let data = await getRevenue(5.214, 150000, '0xba65016890709dBC9491Ca7bF5DE395B8441DC8B')
//   console.log(data)
// }
// test()

module.exports = percentageChange