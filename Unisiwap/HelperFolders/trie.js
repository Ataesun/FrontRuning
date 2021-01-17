const trie = require('trie-prefix-tree');
const dbRetrieve = require('../database/tokenAdress')


const getTrie = async () => {
    let myTrie = trie([])
    //Retrieve data from database; 
    let data = await dbRetrieve()
    data.forEach(element => {
        // store the id in a trie tree for better speed
        myTrie.addWord(element.id)
    });
    return myTrie
}


const trieInit = async () =>{
    const myTrie = await getTrie()
    return myTrie
}

module.exports = trieInit
