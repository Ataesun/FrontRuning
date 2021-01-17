const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const axios = require("axios")
const client = new MongoClient(url, { useUnifiedTopology: true })

const insertApprove = async (obj) => {
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
    try {
        await client.connect();
        let dbo = client.db("frontRun");
        let collection = dbo.collection("approvedToken")
        let ret = await collection.findOne({ id: id});
        if(ret !== null){
            return true;
        }else{
            return false
        }
    } finally {
        await client.close();
    }

}
const init= async ()=>{

   console.log(await checkApprove(1))
}

// init()

module.exports = {
    insertApprove,
    checkApprove
}