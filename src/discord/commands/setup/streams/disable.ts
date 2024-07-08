import { Declare, Group, SubCommand, type CommandContext } from "seyfert";
import { Guilds } from "../../../../models/Guilds";

@Declare({
    name: "disable",
    description: "Disable Twitch notifications.",
})
@Group("streams")
export default class ChannelCommand extends SubCommand {
    async run(context: CommandContext) {
        const data = await Guilds.findOneAndUpdate(
            { guildId: context.guildId },
            { $set: { "streams.notify": false } },
            { new: true }
        );

        const profile = context.chatbot.profiles.get(data?.twitch.userId!);

        if (profile) {
            await profile.removeEvent("StreamOffline");
            await profile.removeEvent("StreamOnline");
        }

        await context.editOrReply({
            content: profile
                ? "Notifications disable for Twitch live streams."
                : "There is no profile created on Twitch.",
        });
    }
}
