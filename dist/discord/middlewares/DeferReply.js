"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const seyfert_1 = require("seyfert");
exports.default = (0, seyfert_1.createMiddleware)(async (data) => {
    await data.context.deferReply();
    const response = await data.context.client.interactions.fetchOriginal(data.context.interaction.token);
    return data.next({ response: response });
});
