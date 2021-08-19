const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');

// Setup the HD wallet provider, this will get the account that will deploy
// the contract and also will tell which node to connect to

const provider = new HDWalletProvider(
    'use-a-proper-mnemotic',
    'infura link'
);

// Instance completely enabled for the Rinkeby network
const web3 = new Web3(provider);

// The purpose of this function is just to be able to use async/await
const deploy = async () => {
    // Get the list of accounts
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account: ', accounts[0]);
    // Use the first account for sending the contract

    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hello world!']})
        .send({ gas: '1000000', from: accounts[0] });  // the interface is the ABI

    console.log('Address: ', result.options.address);
};

deploy();
