const OPCODES = {
    OP_HASH160: 'a9',
    OP_EQUAL: '87',
};

const VERSION_PREFIX = {
    TESTNET_P2SH: '05',
    MAINNET_P2SH: 'C4',
}

module.exports = { OPCODES, VERSION_PREFIX };
