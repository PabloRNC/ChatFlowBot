import { model, Schema } from "mongoose";

export interface GuildsI {
    guildId: string;
    streams: {
        channelId: string;
        message: string;
        notify: boolean;
        roleId: string | null;
    };
    token: { userToken: string; refreshToken: string };
    twitch: { userId: string };
}

const GuildsSchema = new Schema<GuildsI>({
    guildId: String,
    streams: {
        channelId: { type: String, default: null },
        message: {
            type: String,
            default:
                "**{streamer}** is live streaming right now on Twitch!\n{url}",
        },
        notify: { type: Boolean, default: false },
        roleId: { type: String, default: null },
    },
    token: { userToken: String, refreshToken: String },
    twitch: { userId: String },
});

export const Guilds = model<GuildsI>("guilds", GuildsSchema);

