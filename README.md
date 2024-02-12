# Transaction Builder

This script provides functions to build Bitcoin transactions and create P2SH (Pay to Script Hash) addresses.

## Prerequisites

Ensure you have Node.js installed on your system.

## Installation

1. Clone this repository to your local machine.
2. Run `npm install` to install the required dependencies.

## Usage

1. Import the necessary modules:

    ```javascript
    const crypto = require('crypto');
    const bs58 = require('bs58');
    const { OPCODES, VERSION_PREFIX } = require('./constants');
    ```

2. Call the provided functions to perform various tasks:

    ```javascript
    // Example usage
    const scriptPubKey = createP2shScriptPubKey('427472757374204275696c64657273');
    const p2shAddress = createP2shAddress('427472757374204275696c64657273');
    ```

## Functions

### createP2shScriptPubKey(input)

Creates a P2SH scriptPubKey from the input.

### createP2shAddress(input)

Creates a P2SH address from the input.

### createTransactionToSendToP2sh(scriptPubKey)

Creates a Bitcoin transaction to send funds to a P2SH address. **Note:** This function is incomplete and requires further implementation.

### Other Utility Functions

- `sha256(input)`: Computes the SHA-256 hash of the input.
- `ripemd160(input)`: Computes the RIPEMD-160 hash of the input.
- `convertEndian(hexString)`: Converts the byte order of a hexadecimal string.
- `satoshiToLEHex(value)`: Converts a value in satoshis to little-endian hexadecimal.

