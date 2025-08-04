'use strict';

console.log('[CHAINCODE] index.js loading...');

const { Shim } = require('fabric-shim');
const AdoptionContract = require('./adoption-contract');

try {
    console.log('[CHAINCODE] Starting chaincode...');
    Shim.start(new AdoptionContract());
} catch (e) {
    console.error('[CHAINCODE] Chaincode start failed:', e);
    throw e;
}
