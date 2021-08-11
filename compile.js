const path = require('path');
const solc = require('solc');
const fs = require('fs');

// Create the path
const inboxPath = path.resolve(__dirname, 'contracts', 'inbox.sol');

// Read the contents
const source = fs.readFileSync(inboxPath, 'utf8');

// Compile the source code and export only the inbox contract, use [] because the name of the key of the contract
// is :Inbox
module.exports = solc.compile(source, 1).contracts[':Inbox'];
