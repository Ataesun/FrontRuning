const trie = require('trie-prefix-tree');
const dbRetrieve = require('../database/database')

var myTrie = trie([]);
const getTrie = async (myTrie) => {
    //Retrieve data from database; 
    let data = await dbRetrieve()
    data.forEach(element => {
        // store the id in a trie tree for better speed
        myTrie.addWord(element.id)
    });
    return myTrie
}

console.log(getTrie(myTrie))
