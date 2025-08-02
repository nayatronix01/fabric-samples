'use strict';

const { Contract } = require('fabric-contract-api');

class AdoptionContract extends Contract {
    async initLedger(ctx) {
        const adopters = Array(16).fill('');
        await ctx.stub.putState('adopters', Buffer.from(JSON.stringify(adopters)));
    }

    async adopt(ctx, petId) {
        petId = parseInt(petId);
        if (petId < 0 || petId > 15) throw new Error('Invalid pet ID');

        const adoptersBytes = await ctx.stub.getState('adopters');
        if (!adoptersBytes || adoptersBytes.length === 0) throw new Error('Adopters not initialized');

        const adopters = JSON.parse(adoptersBytes.toString());
        adopters[petId] = ctx.clientIdentity.getID();

        await ctx.stub.putState('adopters', Buffer.from(JSON.stringify(adopters)));
        return petId;
    }

    async getAdopters(ctx) {
        const adoptersBytes = await ctx.stub.getState('adopters');
        if (!adoptersBytes || adoptersBytes.length === 0) throw new Error('No adopters found');
        return JSON.stringify(JSON.parse(adoptersBytes.toString()));
    }
}

module.exports = AdoptionContract;
