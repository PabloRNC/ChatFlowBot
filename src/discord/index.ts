import { ChatBot, EventSubConnection } from "@twitchfy/chatbot";
import { Client, extendContext, ParseMiddlewares } from "seyfert";

import * as middlewares from "./middlewares";

let client: Client;

export async function initDiscordBot(
    chatbot: ChatBot<EventSubConnection.Webhook>
) {
    const context = extendContext(() => ({ chatbot }));

    client = new Client({ context });
    client.setServices({ middlewares });

    await client.start();
    await client.uploadCommands();

    console.log("HOLA?");
    return client;
}

export { client };

declare module "seyfert" {
    interface RegisteredMiddlewares
        extends ParseMiddlewares<typeof middlewares> {}
    interface ExtendContext {
        chatbot: ChatBot<EventSubConnection.Webhook>;
    }
}

