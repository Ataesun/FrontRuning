const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const axios = require("axios")

const insertApprove = async (obj) => {

    const client = new MongoClient(url, { useUnifiedTopology: true })

    try {
        await client.connect();
        let dbo = client.db("frontRun");
        let collection = dbo.collection("approvedToken")
        await collection.insertOne(obj, async (err) => {
            if (err) throw err;
            console.log('Successfully inserted')
            await client.close()
        })
    } catch {
    }
}


const checkApprove = async (id) => {


    const client = new MongoClient(url, { useUnifiedTopology: true })

    try {
        await client.connect();
        let dbo = client.db("frontRun");
        let collection = dbo.collection("approvedToken")
        let ret = await collection.findOne({ id: id });
        if (ret !== null) {
            return true;
        } else {
            return false
        }
    } finally {
        await client.close();
    }

}
const init = async () => {
    let arr = [
        '0xa478c2975ab1ea89e8196811f51a7b7ade33eb11',
        '0x53455f3b566d6968e9282d982dd1e038e78033ac',
        '0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852',
        '0xf346d00965776e504930675100c8e2871bd6530d',
        '0x92330d8818e8a3b50f027c819fa46031ffba2c8c',
        '0x87febfb3ac5791034fd5ef1a615e9d9627c2665d',
        '0x10db37f4d9b3bc32ae8303b46e6166f7e9652d28',
        '0xbb0a009ba1eb20c5062c790432f080f6597662af', //bbp
        '0xbf7045f6ea651abb04e96cba61adabe6d7bf0ee8', //cvr
        '0x9127ecda2976c0476c434c1cf8a472d7b86cdc0a', //dsd
        '0xe7607a563105f7dba8beb87ad7f5b3a9ec793958', //infi
        '0x4d96369002fc5b9687ee924d458a7e5baa5df34e', //mph
        '0x64cac8fa24f437ceca90e20a7a24a609f162b0d1', //prq
        '0x40f0e70a7d565985b967bcdb0ba5801994fc2e80', //zero
        '0x97524f602706cdb64f9dfa71909ace06e98200b6', //badger
        '0x4dd26482738be6c06c31467a19dcda9ad781e8c4',//api3
        '0x70ec2fa6eccf4010eaf572d1c1a7bcbc72dec983',
        '0x7b890092f81b337ed68fba266afc7b4c3710a55b',
        '0xde68ad8502874a7d5dd1758f7b0a7831f142b78a' //rook
    ]



    for (let e in arr) {
        await insertApprove({ id: arr[e] })
    }
}

// init()

module.exports = {
    insertApprove,
    checkApprove
}