import { ChatCommand, SetCommand, TwitchContext } from "@twitchfy/chatbot";

@SetCommand({
    name: 'hello'
})

export default class extends ChatCommand {
    async run(ctx: TwitchContext) {
        return await ctx.reply('Hello World!');
    }
}