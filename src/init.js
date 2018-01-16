const dashmod = require('dashmod');
const process = require('process');
const path = require('path');
const fs = require('fs');
function home() {
    return process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
}

let file = path.join(home(), "/modules.json");

if(!fs.exists(file))
    file = "./modules.json";

dashmod.load(file);