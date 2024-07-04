"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserToken = void 0;
const helix_1 = require("@twitchfy/helix");
const models_1 = require("../../models");
async function getUserToken() {
    const data = await models_1.TwitchCredentials.findOne();
    if (!data)
        return null;
    return new helix_1.TokenAdapter({
        type: 'code',
        token: data.userToken,
        refreshToken: data.refreshToken,
        refresh: true
    });
}
exports.getUserToken = getUserToken;
