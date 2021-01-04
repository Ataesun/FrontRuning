

const maximise = async(eth,pairToken,threshHold) =>{
    let ret = 0;
    let currentPrice = pairToken.price
    let maximumPrice = currentPrice*threshHold
    let tokenTransfer = maximumPrice*pairToken.reserve-eth.price
    console.log(tokenTransfer)
    // using the reserve ratio, calcuate a value to take from one to the other such that the thre
}


const test = () =>{
    let eth ={
        reserve : 4,
        price : 30,
    }
    let pairToken = {
        reserve : 120,
        price : 0.25,
    }

    let threshHold = 1.04;

    maximise(eth,pairToken,threshHold)
}

test()