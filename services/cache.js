const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');

const client = redis.createClient({
  host: "127.0.0.1",
  port: 6379,
  legacyMode: false,
});

client.hget = util.promisify(client.hget);

const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function (options = {}) {
    this.useCache = true;

    this.hashKey = JSON.stringify(options.key || '');

    return this;
}


mongoose.Query.prototype.exec = async function () {

    if (!this.useCache) { 
        return await exec.apply(this, arguments);
    }

    // this.getQuery()

    const key = JSON.stringify(Object.assign({}, this._mongooseOptions, this.options, {collection: this.mongooseCollection.name}))

    const cacheValues = await client.hget(this.hashKey, key);

    if (cacheValues) {

        console.log(`\n✅ get cache values collectionName:${this.mongooseCollection.name}\n`)

        let doc = JSON.parse(cacheValues);

        return Array.isArray(doc)
            ? doc.map(d => this.model(d))
            : this.model(doc);
        
    }

    const result = await exec.apply(this, arguments);

    client.hset(this.hashKey, key, JSON.stringify(result));

    return result;
}

module.exports = {
    clearHash(hashKey) {
        client.del(JSON.stringify(hashKey));
    }
}