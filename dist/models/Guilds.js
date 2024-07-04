"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Guilds = void 0;
const mongoose_1 = require("mongoose");
const GuildsSchema = new mongoose_1.Schema({
    guildId: String,
    twitch: {
        userId: String,
        username: String,
        displayName: String
    },
    token: {
        userToken: String,
        refreshToken: String
    }
});
exports.Guilds = (0, mongoose_1.model)("guilds", GuildsSchema);
