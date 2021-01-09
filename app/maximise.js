const { ethers } = require("ethers");

const maximise = async(eth,pairToken,threshHold) =>{

    // console.log({eth,pairToken,threshHold})

    let newPrice = Number.parseFloat(threshHold*eth.price);  
    let lhs = Number.parseFloat((newPrice*(pairToken.reserve)-eth.reserve))
    let rhs = Number.parseFloat(1+(newPrice*pairToken.price))
    let x = lhs/rhs
    console.log({x,eth,pairToken})


    if(x>3){
        return 3;
    }
    return x 
}

module.exports = maximise

// const test = () =>{
//     let eth ={
//         reserve : 740,
//         price : 0.00019087,
//     }
//     let pairToken = {
//         reserve : 3876981.54,
//         price :5239.168,
//     }

//     let threshHold = 1.016;

//     maximise(eth,pairToken,threshHold)
// }

// test();