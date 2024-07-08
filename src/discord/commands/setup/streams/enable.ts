import { Declare, Group, SubCommand, type CommandContext } from "seyfert";
import { Guilds } from "../../../../models/Guilds";

@Declare({
    name: "enable",
    description: "Enable Twitch notifications.",
})
@Group("streams")
export default class ChannelCommand extends SubCommand {
    async run(context: CommandContext) {
        const data = await Guilds.findOneAndUpdate(
            { guildId: context.guildId },
            { $set: { "streams.notify": true } },
            { new: true }
        );

        const profile = context.chatbot.profiles.get(data?.twitch.userId!);

        if (profile) {
            await profile.addEvent("StreamOffline");
            await profile.addEvent("StreamOnline");
        }

        await context.editOrReply({
            content: profile
                ? "Notifications enabled for Twitch live streams."
                : "There is no profile created on Twitch.",
        });
    }
}
