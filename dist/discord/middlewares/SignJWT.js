"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const seyfert_1 = require("seyfert");
exports.default = (0, seyfert_1.createMiddleware)(async (data) => {
    const response = data.context.metadata.DeferReply.response;
    const { interaction } = data.context;
    const jwt = (0, jsonwebtoken_1.sign)({ channelId: interaction.channelId, guildId: interaction.guildId, messageId: response.id, messageURL: response.url }, process.env.JWT_SECRET, { expiresIn: '10min', allowInsecureKeySizes: true });
    return data.next({ jwt });
});
