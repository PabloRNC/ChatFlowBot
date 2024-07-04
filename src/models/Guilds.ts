import { model, Schema } from "mongoose";


export interface GuildsI {
    guildId: string;
    twitch: {
        userId: string;
        username: string;
        displayName: string;
    }
    token: {
        userToken: string;
        refreshToken: string;
    }
}

const GuildsSchema = new Schema<GuildsI>({
    guildId: String,
    twitch: {
        userId: String,
        username: String,
        displayName: String
    },
    token: {
        userToken: String,
        refreshToken: String
    }
});

export const Guilds = model<GuildsI>("guilds", GuildsSchema);