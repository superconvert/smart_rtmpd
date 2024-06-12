const fs = require('fs');

var config
var path = require('path');
try {
	const filepath = path.join(process.cwd(), 'config.json');
    const data = fs.readFileSync(filepath, 'utf8');
    // parse JSON string to JSON object
    config = JSON.parse(data);
} catch (err) {
    console.log('Error reading file from disk: ${err}');
}

module.exports = config;


