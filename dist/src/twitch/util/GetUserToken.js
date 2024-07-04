"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getUserToken", {
    enumerable: true,
    get: function() {
        return getUserToken;
    }
});
const _helix = require("@twitchfy/helix");
const _models = require("../../models");
async function getUserToken() {
    const data = await _models.TwitchCredentials.findOne();
    if (!data) return null;
    return new _helix.TokenAdapter({
        type: 'code',
        token: data.userToken,
        refreshToken: data.refreshToken,
        refresh: true
    });
}
