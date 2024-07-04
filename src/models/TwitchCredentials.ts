import { model, Schema } from "mongoose";

export interface TwitchCredentialsI {
    userToken: string;
    refreshToken: string;
}

const TwitchCredentialsSchema = new Schema<TwitchCredentialsI>({
    userToken: String,
    refreshToken: String
});

export const TwitchCredentials = model<TwitchCredentialsI>("credentials", TwitchCredentialsSchema);