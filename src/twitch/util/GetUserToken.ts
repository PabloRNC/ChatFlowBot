import { TokenAdapter } from "@twitchfy/helix";
import { TwitchCredentials } from "../../models";

export async function getUserToken() {
    const data = await TwitchCredentials.findOne();
    if (!data) return null;

    return new TokenAdapter({
        type: "code",
        token: data.userToken,
        refreshToken: data.refreshToken,
        refresh: true,
    });
}

