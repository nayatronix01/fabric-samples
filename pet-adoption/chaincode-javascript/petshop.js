'use strict';

const { Contract } = require('fabric-contract-api');

class PetShop extends Contract {

    async initLedger(ctx) {
        const pets = [
            { id: '1', name: 'Max', breed: 'Labrador', age: 2, price: 100, adopted: false, owner: '' },
            { id: '2', name: 'Bella', breed: 'Beagle', age: 3, price: 120, adopted: false, owner: '' }
        ];

        for (const pet of pets) {
            await ctx.stub.putState(pet.id, Buffer.from(JSON.stringify(pet)));
        }

        return 'Ledger initialized';
    }

    async registerPet(ctx, id, name, breed, age, price) {
        const pet = {
            id,
            name,
            breed,
            age: parseInt(age),
            price: parseInt(price),
            adopted: false,
            owner: ''
        };

        await ctx.stub.putState(id, Buffer.from(JSON.stringify(pet)));
        return JSON.stringify(pet);
    }

    async adoptPet(ctx, id, owner) {
        const petBytes = await ctx.stub.getState(id);
        if (!petBytes || petBytes.length === 0) throw new Error(`Pet ${id} does not exist`);

        const pet = JSON.parse(petBytes.toString());
        if (pet.adopted) throw new Error(`Pet ${id} is already adopted`);

        pet.adopted = true;
        pet.owner = owner;

        await ctx.stub.putState(id, Buffer.from(JSON.stringify(pet)));
        return JSON.stringify(pet);
    }

    async readPet(ctx, id) {
        const petBytes = await ctx.stub.getState(id);
        if (!petBytes || petBytes.length === 0) throw new Error(`Pet ${id} does not exist`);
        return petBytes.toString();
    }

    async getAllPets(ctx) {
        const iterator = await ctx.stub.getStateByRange('', '');
        const results = [];
        for await (const res of iterator) {
            results.push(JSON.parse(res.value.toString()));
        }
        return JSON.stringify(results);
    }
}

module.exports = PetShop;
