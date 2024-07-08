import { model, Schema } from "mongoose";

export interface GuildsI {
    guildId: string;
    streams: { channelId: string; notify: boolean; message: string };
    token: { userToken: string; refreshToken: string };
    twitch: { userId: string };
}

const GuildsSchema = new Schema<GuildsI>({
    guildId: String,
    streams: { channelId: String, notify: Boolean, message: String },
    token: { userToken: String, refreshToken: String },
    twitch: { userId: String },
});

export const Guilds = model<GuildsI>("guilds", GuildsSchema);

