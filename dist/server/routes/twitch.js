"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jsonwebtoken_1 = require("jsonwebtoken");
const models_1 = require("../../models");
const Constants_1 = require("../../Constants");
const __1 = require("../..");
const seyfert_1 = require("seyfert");
const discord_1 = require("../../discord");
const router = (0, express_1.Router)();
router.get('/redirect', async (req, res) => {
    const { state: jwt } = req.query;
    if (!jwt)
        return res.status(400).send('Missing state');
    const payload = (0, jsonwebtoken_1.decode)(jwt);
    const data = await models_1.Guilds.findOne({ guildId: payload.guildId });
    if (data)
        return res.status(400).send('Already connected');
    const token = await __1.helix.generateUserToken({ code: req.query.code, flow: 'code', redirectURI: Constants_1.RedirectURI });
    const info = await __1.helix.getUserToken(true, { userToken: token });
    const user = await __1.helix.getUser(info.user_id, { userToken: token, useTokenType: 'user' });
    await models_1.Guilds.create({
        guildId: payload.guildId,
        twitch: {
            userId: info.user_id,
            username: user.login,
            displayName: user.display_name
        },
        token: {
            userToken: token.token,
            refreshToken: token.refreshToken
        }
    });
    const embed = new seyfert_1.Embed()
        .setTitle('Twitch Connected')
        .setDescription(`You have **successfully** connected your Twitch account to this server. Welcome **${user.display_name}**!`)
        .setColor('Green')
        .addFields({
        name: 'Status',
        value: 'Connected'
    })
        .setThumbnail(user.profile_image_url);
    await discord_1.client.messages.edit(payload.messageId, payload.channelId, { embeds: [embed] });
    return res.redirect(payload.messageURL);
});
exports.default = router;
