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

const scriptPubKey = createP2shScriptPubKey('427472757374204275696c64657273');
const p2shAddress = createP2shAddress('427472757374204275696c64657273');

console.log(scriptPubKey);
console.log(p2shAddress);

