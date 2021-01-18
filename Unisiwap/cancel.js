require('dotenv').config()
const Web3 = require("web3");
const EthereumTx = require('ethereumjs-tx').Transaction;
const axios = require('axios');
const ethNetwork = process.env.INFURA;
const web3 = new Web3(new Web3.providers.HttpProvider(ethNetwork))

const sendersData = {
    address: process.env.TO,
    privateKey: process.env.WALLET
}
const recieverData = {
    address: '0x7d00DA0B76792128cC07bB987Ce53Cc59313F99f'
}
const value = 0.0


async function cancel(gasPrice,nonce) {
    console.log('Canceling transaction')

    return new Promise(async (resolve, reject) => {

        let details = {
            "to": recieverData.address,
            "value": 0,
            "gas": 210000,
            "gasPrice": gasPrice,
            "nonce": nonce,
            "chainId": 1 // EIP 155 chainId - mainnet: 1, rinkeby: 4
        };

        const transaction = new EthereumTx(details, { chain: 'mainnet' });
        let privateKey = sendersData.privateKey.split('0x');
        let privKey = Buffer.from(privateKey[0], 'hex');
        transaction.sign(privKey);
        const serializedTransaction = transaction.serialize();
        console.log(serializedTransaction)
        
        web3.eth.sendSignedTransaction('0x' + serializedTransaction.toString('hex'), (err, id) => {
            if (err) {
                console.log(err);
                return reject();
            }

            const url = `https://etherscan.io/tx/${id}`;
            console.log(url);
            resolve({ id: id, link: url });
        });
    });
}

module.exports = cancel

