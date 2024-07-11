import { config } from "dotenv";
config();

export const Scopes = ["bits:read"];
const { TWITCH_URI, TWITCH_REDIRECT } = process.env;

export const RedirectURI = TWITCH_URI + TWITCH_REDIRECT;

