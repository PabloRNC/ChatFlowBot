import { sign } from "jsonwebtoken";
import { CommandContext, createMiddleware } from "seyfert";

export default createMiddleware<{ jwt: string }, CommandContext<{}, 'DeferReply' | 'OnlyOwner'>>(async(data) => {

    const response = data.context.metadata.DeferReply.response;

    const { interaction } = data.context;

    const jwt = sign({ channelId: interaction.channelId, guildId: interaction.guildId, messageId: response.id, messageURL: response.url }, process.env.JWT_SECRET!, { expiresIn: '10min', allowInsecureKeySizes: true });

    return data.next({ jwt });
})