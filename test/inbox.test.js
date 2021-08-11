const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3'); // Capital letter because we're working with a constructor
const web3 = new Web3(ganache.provider()); // lower case because we're using an instance
const {interface, bytecode} = require('../compile.js');

let fetchedAccounts;
let inbox;

const initialString = 'Hi there'

beforeEach(async () => {
    // Get a list of all accounts
    fetchedAccounts = await web3.eth.getAccounts();

    // Use one of those accounts to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({
            data: bytecode, // bytecode of the compiled contract
            arguments: [initialString], // We write arguments because the inbox contract has a constructor
        }).send({from: fetchedAccounts[0], gas: '1000000'})
});

describe('Tests for inbox contract', () => {
    it('Given the inbox contract, when the contract is deployed, then an instance of the contract is created', () => {
        assert.ok(inbox.options.address);
    });

    it('Given the inbox contract, when the contract is deployed, then a message should be initialized', async () => {
        const message = await inbox.methods.message().call(); // We need to call a function when getting information in the Contract, calling a function is a read-only operation
        // if the function message would require parameters we use message(someParameter).call()

        assert(message === initialString);
    });

    it('Can change the message', async () => {
        // From the transaction below we're getting a hash value
        await inbox.methods.setMessage('Other message').send({from: fetchedAccounts[0]}); // Since we're changing data in the Contract we use send() because we need to send gas

        const newMessage = await inbox.methods.message().call();

        assert(newMessage === 'Other message')
    });
});
