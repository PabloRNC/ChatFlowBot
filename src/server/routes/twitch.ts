import { Router } from "express";
import { verify } from "jsonwebtoken";
import { Embed } from "seyfert";
import { Guilds } from "../../models";
import { RedirectURI } from "../../Constants";
import { helix } from "../..";
import { client } from "../../discord";
import { chatbot } from "../../twitch";

const router = Router();

router.get("/redirect", async (req, res) => {
    const { state: jwt } = req.query;

    if (!jwt) return res.status(400).send("Missing state");

    let payload;

    try {
        payload = verify(jwt as string, process.env.JWT_SECRET) as {
            channelId: string;
            messageId: string;
            guildId: string;
            messageURL: string;
            interactionToken: string;
        };
    } catch(err) {
        if((err as Error).name === "TokenExpiredError") return res.status(400).send("You must complete the connection within 10 minutes.");
        return res.status(400).send((err as Error).message);
    }
    
    const data = await Guilds.findOne({ guildId: payload.guildId });

    if (data) return res.status(400).send("Already connected");

    const token = await helix.generateUserToken({
        code: req.query.code as string,
        flow: "code",
        redirectURI: RedirectURI,
    });

    const info = await helix.getUserToken(true, { userToken: token });

    await chatbot.channels.join(info.user_id);

    const user = await helix.getUser(info.user_id, {
        userToken: token,
        useTokenType: "user",
    });

    await Guilds.create({
        guildId: payload.guildId,
        twitch: { userId: info.user_id },
        token: {
            userToken: token.token,
            refreshToken: token.refreshToken,
        },
    });

    const embed = new Embed()
        .setTitle("Twitch Connected")
        .setDescription(
            `You have **successfully** connected your Twitch account to this server. Welcome **${user.display_name}**!`
        )
        .setColor("Green")
        .addFields({
            name: "Status",
            value: "Connected",
        })
        .setThumbnail(user.profile_image_url);

    await client.interactions.editOriginal(payload.interactionToken, {
        embeds: [embed],
    });

    return res.redirect(payload.messageURL);
});

export default router;
