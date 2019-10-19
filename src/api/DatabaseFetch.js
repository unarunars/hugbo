const fetch = require('isomorphic-fetch');
export { readJSON };

async function readJSON(){
    const response = await fetch('https://api.myjson.com/bins/11wwo4');
    const myJson = await response.json();
    return myJson;
}

async function 