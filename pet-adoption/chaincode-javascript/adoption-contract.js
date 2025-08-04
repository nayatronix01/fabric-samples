'use strict';

const { Contract } = require('fabric-contract-api');

class AdoptionContract extends Contract {
    constructor() {
        super('AdoptionContract');
        console.log('[CHAINCODE] AdoptionContract constructor called.');
    }

    async initLedger(ctx) {
        console.log('[CHAINCODE] initLedger invoked.');
        try {
            const adopters = new Array(16).fill('');
            console.log('[CHAINCODE] Generated empty adopters array:', adopters);
            await ctx.stub.putState('adopters', Buffer.from(JSON.stringify(adopters)));
            console.log('[CHAINCODE] Successfully wrote adopters to world state.');
        } catch (err) {
            console.error('[CHAINCODE] Error in initLedger:', err);
            throw new Error(`[CHAINCODE] initLedger failed: ${err.message}`);
        }
    }

    // Optional: add more logging to other functions
    async queryAll(ctx) {
        console.log('[CHAINCODE] queryAll called.');
        // your logic here
    }
}

module.exports = AdoptionContract;
