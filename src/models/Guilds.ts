import { model, Schema } from "mongoose";


export interface GuildsI {
    guildId: string;
    twitch: {
        userId: string;
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
    },
    token: {
        userToken: String,
        refreshToken: String
    }
});

export const Guilds = model<GuildsI>("guilds", GuildsSchema);