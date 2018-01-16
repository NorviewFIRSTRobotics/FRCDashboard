const dashmod = require('dashmod');
const process = require('process');
const path = require('path');
const fs = require('fs');

function getUserHome() {
    return process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
}

const file = getUserHome() + "/modules.json";

if(!fs.exists(file)) {
    fs.createReadStream(path.join(__dirname,'modules.json')).pipe(fs.createWriteStream(file));
}
console.log(file);
var test = "https://gist.githubusercontent.com/primetoxinz/beb381e29dc67b3d5878c6e89013da25/raw/c5ccb02911792c45e748558f1bebe008366dadef/module.json";
dashmod.load(test);