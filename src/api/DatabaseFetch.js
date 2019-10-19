async function readJSON(){
    const response = await fetch('http://myjson.com/11wwo4');
    const myJson = await response.json();
    console.log(JSON.stringify(myJson));
}
readJSON();