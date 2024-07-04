"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const seyfert_1 = require("seyfert");
const types_1 = require("seyfert/lib/types");
exports.default = (0, seyfert_1.createMiddleware)(async (data) => {
    const guild = data.context.guild();
    if (guild?.ownerId !== data.context.author.id)
        return data.context.write({ content: 'You must be the guild owner to run this command!', flags: types_1.MessageFlags.Ephemeral });
    data.next();
});
