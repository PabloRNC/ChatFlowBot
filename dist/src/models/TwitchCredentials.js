"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TwitchCredentials", {
    enumerable: true,
    get: function() {
        return TwitchCredentials;
    }
});
const _mongoose = require("mongoose");
const TwitchCredentialsSchema = new _mongoose.Schema({
    userToken: String,
    refreshToken: String
});
const TwitchCredentials = (0, _mongoose.model)("credentials", TwitchCredentialsSchema);
