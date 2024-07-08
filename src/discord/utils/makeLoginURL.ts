import { Scopes, RedirectURI } from "../../Constants";

export function makeLoginURL(jwt: string) {
    const { TWITCH_CLIENT_ID } = process.env;

    return `https://id.twitch.tv/oauth2/authorize?client_id=${TWITCH_CLIENT_ID}&redirect_uri=${RedirectURI}&response_type=code&scope=${Scopes.join(
        " "
    )}&state=${jwt}`;
}
