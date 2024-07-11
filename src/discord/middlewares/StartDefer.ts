import { createMiddleware, WebhookMessage } from "seyfert";

export default createMiddleware<{ response: WebhookMessage }>(async (data) => {
    await data.context.deferReply(true);

    const response = await data.context.client.interactions.fetchOriginal(
        data.context.interaction.token
    );

    return data.next({ response: response! });
});
