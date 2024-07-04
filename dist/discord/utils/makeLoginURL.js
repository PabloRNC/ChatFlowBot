"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeLoginURL = void 0;
const Constants_1 = require("../../Constants");
function makeLoginURL(jwt) {
    const { TWITCH_CLIENT_ID } = process.env;
    return `https://id.twitch.tv/oauth2/authorize?client_id=${TWITCH_CLIENT_ID}&redirect_uri=${Constants_1.RedirectURI}&response_type=code&scope=${Constants_1.Scopes.join(' ')}&state=${jwt}`;
}
exports.makeLoginURL = makeLoginURL;
