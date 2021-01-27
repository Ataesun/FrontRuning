require('dotenv').config()
const chalk = require('chalk')
const maximise = async(eth,pairToken,slippage, increase) =>{

    let newPrice = Number.parseFloat(slippage*eth.price);  
    let lhs = Number.parseFloat((newPrice*(pairToken.reserve)-eth.reserve))
    let rhs = Number.parseFloat(1+(newPrice*pairToken.price))
    let x = lhs/rhs
    
    console.log(x)
    console.log(chalk.blue("This is the maximum Money  : " + x*process.env.ETHPRICE*increase))

    if(x>2.11){
        return 2.11;
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

//     let slippage = 1.016;

//     maximise(eth,pairToken,slippage)
// }

// test();