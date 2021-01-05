const maximise = async(eth,pairToken,threshHold) =>{
    let newPrice = threshHold*eth.price;  
    console.log(newPrice)
    let x = Number.parseFloat((pairToken.reserve-(newPrice*eth.reserve))/pairToken.reserve-(newPrice*eth.price))
    console.log(x)



    // return ethBuy
    // using the reserve ratio, calcuate a value to take from one to the other such that the thre
}

module.exports = maximise
const test = () =>{
    let eth ={
        reserve : 7,
        price : 7/1400,
    }
    let pairToken = {
        reserve : 1400,
        price : 1400/7,
    }

    let threshHold = 2;

    maximise(eth,pairToken,threshHold)
}

test()