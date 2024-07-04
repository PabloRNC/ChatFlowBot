"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomMongoAdapter = void 0;
const eventsub_1 = require("@twitchfy/eventsub");
class CustomMongoAdapter extends eventsub_1.StorageAdapter {
    connection;
    constructor(connection) {
        super();
        this.connection = connection;
    }
    async set(id, subscription) {
        const { secret, type, options, nonce } = subscription;
        await this.connection.model('subscriptions', eventsub_1.SubscriptionSchema).create({
            id,
            secret,
            type,
            options,
            nonce
        });
    }
    async get(id) {
        return await this.connection.model('subscriptions', eventsub_1.SubscriptionSchema).findOne({ id });
    }
    async getAll() {
        return await this.connection.model('subscriptions', eventsub_1.SubscriptionSchema).find();
    }
    async delete(id) {
        await this.connection.model('subscriptions', eventsub_1.SubscriptionSchema).deleteOne({ id });
    }
}
exports.CustomMongoAdapter = CustomMongoAdapter;
