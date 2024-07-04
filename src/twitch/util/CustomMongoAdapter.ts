import { StorageAdapter, WebhookConnection, WebhookSubscription, SubscriptionSchema, StorageAdapterGet, SubscriptionTypes } from "@twitchfy/eventsub";
import { Mongoose } from "mongoose";

export class CustomMongoAdapter extends StorageAdapter<WebhookConnection> {

    public connection: Mongoose;

    constructor(connection: Mongoose){
        super();
        this.connection = connection;
    }

    async set(id: string, subscription: WebhookSubscription){

        const { secret, type, options, nonce } = subscription;

        await this.connection.model('subscriptions', SubscriptionSchema).create({
            id, 
            secret,
            type,
            options,
            nonce
        })
    }

    async get<T extends SubscriptionTypes>(id: string): Promise<StorageAdapterGet<WebhookConnection, T>>{
        return await this.connection.model('subscriptions', SubscriptionSchema).findOne({ id }) as StorageAdapterGet<WebhookConnection, T>;
    }

    async getAll(){
        return await this.connection.model('subscriptions', SubscriptionSchema).find() as StorageAdapterGet<WebhookConnection>[];
    }

    async delete(id: string){
        await this.connection.model('subscriptions', SubscriptionSchema).deleteOne({ id });
    }

}