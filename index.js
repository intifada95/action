const fs = require('fs');
const axios = require('axios');

/**
 * get data joke
 */

function getJoke() {
    axios.get('https://api.chucknorris.io/jokes/random')
        .then((data) => {
            console.log(data.data);
            updateFile(data.data);
        })
        .catch((error) => {
            console.log(error);
        })
}

/**
 * update file
 */

function updateFile(joke) {
    fs.readFile('./data/joke.json', 'utf8', function(error, data) {
        if (error) {
            console.log(error);
        } else {
            const file = JSON.parse(data);
            file.randomJoke.push(joke);
            const toStringData = JSON.stringify(file);

            fs.writeFile('./data/joke.json', toStringData, 'utf8', function(error) {
                if (error) {
                    console.log(error)
                } else {
                    console.log("Success update data");
                }
            })
        }
    })
}
getJoke();