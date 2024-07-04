import { Router } from "express";
import { decode } from "jsonwebtoken";
import { Guilds } from "../../models";
import { RedirectURI } from "../../Constants";
import { helix } from "../..";
import { Embed } from "seyfert";
import { client } from "../../discord";

const router = Router();

router.get('/redirect', async(req, res) => {

    const { state: jwt } = req.query;

    if (!jwt) return res.status(400).send('Missing state');

    const payload = decode(jwt as string) as { channelId: string, messageId: string, guildId: string, messageURL: string};

    const data = await Guilds.findOne({ guildId: payload.guildId });

    if (data) return res.status(400).send('Already connected');

    const token = await helix.generateUserToken({ code: req.query.code as string, flow: 'code', redirectURI: RedirectURI });

    const info = await helix.getUserToken(true, { userToken: token })

    const user = await helix.getUser(info.user_id, { userToken: token, useTokenType: 'user' });

    await Guilds.create({
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
    })

    const embed = new Embed()
    .setTitle('Twitch Connected')
    .setDescription(`You have **successfully** connected your Twitch account to this server. Welcome **${user.display_name}**!`)
    .setColor('Green')
    .addFields({
        name: 'Status',
        value: 'Connected'
    })
    .setThumbnail(user.profile_image_url)

    await client.messages.edit(payload.messageId, payload.channelId, { embeds: [embed] })


    return res.redirect(payload.messageURL);
});

export default router;