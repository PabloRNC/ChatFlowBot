"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwitchCredentials = void 0;
const mongoose_1 = require("mongoose");
const TwitchCredentialsSchema = new mongoose_1.Schema({
    userToken: String,
    refreshToken: String
});
exports.TwitchCredentials = (0, mongoose_1.model)("credentials", TwitchCredentialsSchema);
