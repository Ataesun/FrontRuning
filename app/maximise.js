

const maximise = async(eth,pairToken,threshHold) =>{
    let ret = 0;
    let currentPrice = pairToken.price
    console.log(`pairToken price is ${currentPrice}`)
    let maximumPrice = currentPrice*threshHold
    console.log(`The price can increase up untill ${maximumPrice}`)
    let ethPriceRise = eth.price-(maximumPrice*pairToken.reserve)
    console.log(`newETH price = ${ethPriceRise}`)
    let ethBuy = ethPriceRise/pairToken.reserve
    console.log(`amount of ether to buy ${ethBuy}`)

    process.exit()
    // return ethBuy
    // using the reserve ratio, calcuate a value to take from one to the other such that the thre
}

module.exports = maximise
// const test = () =>{
//     let eth ={
//         reserve : 4,
//         price : 30,
//     }
//     let pairToken = {
//         reserve : 120,
//         price : 0.033,
//     }

//     let threshHold = 1.04;

//     maximise(eth,pairToken,threshHold)
// }

// test()