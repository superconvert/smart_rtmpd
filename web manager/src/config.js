const fs = require('fs');

var config
try {
    const data = fs.readFileSync('./config.json', 'utf8');
    // parse JSON string to JSON object
    config = JSON.parse(data);
} catch (err) {
    console.log('Error reading file from disk: ${err}');
}

module.exports = config;


