import { CommandContext, Command, Declare, Middlewares, Embed } from "seyfert";
import { makeLoginURL } from "../utils";

@Declare({
    name: "start",
    description: "Starts a Twitch Community inside this Discord Guild",
})
@Middlewares(["StartDefer", "OnlyOwner", "SignJWT"])
export default class extends Command {
    async run(ctx: CommandContext<{}, "StartDefer" | "OnlyOwner" | "SignJWT">) {
        const url = makeLoginURL(ctx.metadata.SignJWT.jwt);

        const embed = new Embed()
            .setTitle("Start Twitch Community")
            .setDescription(
                `Click [this link](${url}) to start the **Twitch Community** setup by authorizing with your **Twitch account**.`
            )
            .setURL(url)
            .addFields({ name: "Status", value: "Pending" })
            .setColor("Yellow");

        return await ctx.editOrReply({ embeds: [embed] });
    }
}

