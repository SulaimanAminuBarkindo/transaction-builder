const crypto = require('crypto');
const { OPCODES } = require('./constants');

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

function sha256ThenRipemd160(input) {
    const sha256Hash = sha256(input);
    const ripemd160Hash = ripemd160(sha256Hash);
    return ripemd160Hash;
}

function createP2SHScriptPubKey(input) {
    const redeemScripthash = sha256ThenRipemd160(input);

    const scriptPubKey = Buffer.concat([
        Buffer.from(OPCODES.OP_HASH160, 'hex'),
        Buffer.from(redeemScripthash, 'hex'), 
        Buffer.from(OPCODES.OP_EQUAL, 'hex')   
    ]);

    return scriptPubKey.toString('hex');
}

const scriptPubKey = createP2SHScriptPubKey('427472757374204275696c64657273');

console.log(scriptPubKey);

