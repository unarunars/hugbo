const fetch = require('isomorphic-fetch');
export { readJSON };

async function readJSON(){
    const response = await fetch('https://api.myjson.com/bins/11wwo4');
    const myJson = await response.json();
    console.log("jee");
    return myJson;
}

//async function 