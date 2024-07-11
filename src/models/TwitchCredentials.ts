import { model, Schema } from "mongoose";

export interface TwitchCredentialsI {
    refreshToken: string;
    userToken: string;
}

const TwitchCredentialsSchema = new Schema<TwitchCredentialsI>({
    refreshToken: String,
    userToken: String,
});

export const TwitchCredentials = model<TwitchCredentialsI>(
    "credentials",
    TwitchCredentialsSchema
);

