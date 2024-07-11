import { sign } from "jsonwebtoken";
import { CommandContext, createMiddleware } from "seyfert";

export default createMiddleware<
    { jwt: string },
    CommandContext<{}, "StartDefer" | "OnlyOwner">
>(async (data) => {
    const { interaction } = data.context;
    const response = data.context.metadata.StartDefer.response;
    const jwt = sign(
        {
            channelId: interaction.channelId,
            guildId: interaction.guildId,
            messageId: response.id,
            messageURL: response.url,
            interactionToken: data.context.interaction.token,
        },
        process.env.JWT_SECRET!,
        { expiresIn: "10min", issuer: 'ChatFlowBot', subject: 'login' }
    );

    return data.next({ jwt });
});

