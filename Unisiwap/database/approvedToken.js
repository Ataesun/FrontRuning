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