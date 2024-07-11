import { Embed } from "seyfert";
import {
    createEvent,
    type Stream,
    type EventSubConnection,
} from "@twitchfy/chatbot";

import { Guilds } from "../../models";
import { client } from "../../discord/index";

function escape(text: string) {
    return text
        .replace(/([_*~`|\\<>:!])/g, "\\$1")
        .replace(/@(everyone|here|[!&]?\d{17,21})/g, "@\u200b$1");
}

function content(
    stream: Stream<EventSubConnection.Webhook>,
    text: string,
    url: string
) {
    return text
        .replaceAll("{nl}", "\n")
        .replaceAll("{streamer}", stream.broadcaster.username)
        .replaceAll("{url}", url);
}

export default createEvent({
    event: "StreamOnline",

    run: async (_chatbot, streamData) => {
        const data = await Guilds.findOne({
            "twitch.userId": streamData.broadcasterId,
        });

        if (!data) {
            throw new Error(
                `USER ID: ${streamData.broadcasterId}. Unexpected behaviour has occurred.`
            );
        }

        const { streams } = data;

        let stream = await streamData.broadcaster.stream();
        while (!stream) {
            stream = await streamData.broadcaster.stream();
            await new Promise((resolve) => setTimeout(resolve, 1000));
        }

        const embed = new Embed().setColor("#9146ff");
        const url = `https://www.twitch.tv/${stream.broadcaster.username}`;

        if (stream.title) embed.setTitle(escape(stream.title)).setURL(url);

        embed
            .setAuthor({ name: stream.broadcaster.displayName })
            .setDescription(content(stream, streams.message, url))
            .setImage(stream.thumbnailURL({ height: 1536, width: 2048 }))
            .setFooter({ text: "© 2024 ChatFlowBot. All rights reserved." });

        await client.messages.write(streams.channelId, {
            content: `<@&${streams.roleId || data.guildId}>`,
            embeds: [embed],
        });
    },
});
