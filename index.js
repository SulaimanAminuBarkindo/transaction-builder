const crypto = require('crypto');
const bs58 = require('bs58');
const { OPCODES, VERSION_PREFIX } = require('./constants');

function sha256(input) {
    const hash = crypto.createHash('sha256');
    hash.update(input);
    return hash.digest();
}

function ripemd160(input) {
    const hash = crypto.createHash('ripemd160');
    hash.update(input);
    return hash.digest();
}

function createScriptHash(input) {
    const sha256Hash = sha256(input);
    const ripemd160Hash = ripemd160(sha256Hash);
    return ripemd160Hash;
}

function createP2shScriptPubKey(input) {
    const scriptHash = createScriptHash(input);

    const scriptPubKey = Buffer.concat([
        Buffer.from(OPCODES.OP_HASH160, 'hex'),
        Buffer.from(scriptHash, 'hex'), 
        Buffer.from(OPCODES.OP_EQUAL, 'hex')   
    ]);

    return scriptPubKey.toString('hex');
}

function createP2shAddress(input) {
    // Step 1: Create script hash
    const scriptHash = createScriptHash(input);

    // Step 2: Add version prefix
    const prefixedScriptHash = Buffer.concat([
        Buffer.from(VERSION_PREFIX.TESTNET_P2SH, 'hex'),
        Buffer.from(scriptHash, 'hex')
    ])

    // Step 3: Calculate checksum
    const hashedChecksum = sha256(sha256(prefixedScriptHash))
    const checksum = hashedChecksum.slice(0, 4);

    // Step 4: Append checksum
    const extendedScriptHash = Buffer.concat([prefixedScriptHash, checksum]);

    // Step 5: Encode as base58
    const address = bs58.encode(extendedScriptHash);

    return address;
}

function convertEndian(hexString) {
    return hexString.match(/../g).reverse().join('');
}

function satoshiToLEHex(value) {
    // Convert Satoshi value to hexadecimal
    const hexValue = value.toString(16).padStart(16, '0');

    // Reverse the byte order (little-endian)
    const littleEndianHex = convertEndian(hexValue);

    return littleEndianHex;
}

function createTransactionToSendToP2sh(scriptPubKey) {
    const version = '02000000';

    // input parameters
    const inputCount = '01';
    const utxoTxid = '9bf266a300e2e4e2a5bc3882273cbc5a53155d0e82143f0cffd49140982e4b98';
    const littleIndianTxid = convertEndian(utxoTxid);
    const utxoVout = '00000000';
    const scriptSigLength = '00';
    const scriptSig = '';
    const sequence = 'ffffffff'

    // output parameters
    const outputCount = '01';
    const outputAmount = satoshiToLEHex(320000);
    // add concatenate scriptpubkey too
    const scriptPubKeyLength = (scriptPubKey.length).toString(16);
    const lockTime = '00000000';

    const recipient = '2Mt8sqHMvQAeHNbgLRtwG7CzGM8QmEE4WZH';

    // TODO: build and sign the transaction
}


const scriptPubKey = createP2shScriptPubKey('427472757374204275696c64657273');
const p2shAddress = createP2shAddress('427472757374204275696c64657273');

console.log('scriptPubKey', scriptPubKey);
console.log('p2shAddress', p2shAddress);
