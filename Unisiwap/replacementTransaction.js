const Web3 = require("web3");
require('dotenv').config()
const EthereumTx = require('ethereumjs-tx').Transaction;
const axios = require('axios');
const ethNetwork = 'https://mainnet.infura.io/v3/ce0341ce076c4c7d8a3f4344be1d9932';
const web3 = new Web3(new Web3.providers.HttpProvider(ethNetwork))
 
const address = process.env.TO
const privateKey = process.env.WALLET
const address2 = '0x7d00DA0B76792128cC07bB987Ce53Cc59313F99f'
const value = 0.0


async function transferFund(sendersData, recieverData, amountToSend) {
    return new Promise(async (resolve, reject) => {
        var nonce = await web3.eth.getTransactionCount(sendersData.address);
        web3.eth.getBalance(sendersData.address, async (err, result) => {
            
            let details = {
                "to": recieverData.address,
                "value": web3.utils.toHex(web3.utils.toWei(amountToSend.toString(), 'ether')),
                "gas": 210000,
                "gasPrice": 20 * 1000000000,
                "nonce": 11,
                "chainId": 1 // EIP 155 chainId - mainnet: 1, rinkeby: 4
            };

            const transaction = new EthereumTx(details, {chain: 'mainnet'});
            let privateKey = sendersData.privateKey.split('0x');

            console.log(privateKey)
            let privKey = Buffer.from(privateKey[0],'hex');
            transaction.sign(privKey);

            const serializedTransaction = transaction.serialize();
            console.log(serializedTransaction)
            web3.eth.sendSignedTransaction('0x' + serializedTransaction.toString('hex'), (err, id) => {
                if(err) {
                    console.log(err);
                    return reject();
                }
                console.log("4")
                const url = `https://ropsten.etherscan.io/tx/${id}`;
                console.log(url);
                resolve({id: id, link: url});
            });
        });
    });
}

async function getCurrentGasPrices() {
    let response = await axios.get('https://ethgasstation.info/json/ethgasAPI.json');
    let prices = {
      low: response.data.safeLow / 10,
      medium: response.data.average / 10,
      high: response.data.fast / 10
    };
    return prices;
}

async function getBalance(address) {
    return new Promise((resolve, reject) => {
        web3.eth.getBalance(address, async (err, result) => {
            if(err) {
                return reject(err);
            }
            resolve(web3.utils.fromWei(result, "ether"));
        });
    });
}

transferFund({address, privateKey}, address2, value)