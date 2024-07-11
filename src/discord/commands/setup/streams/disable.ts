import { Declare, Group, SubCommand, type CommandContext } from "seyfert";

import { MessageFlags } from "seyfert/lib/types";
import { Guilds } from "../../../../models/Guilds";

@Declare({ name: "disable", description: "Disable Twitch notifications." })
@Group("streams")
export default class ChannelCommand extends SubCommand {
    async run(context: CommandContext) {
        const data = await Guilds.findOneAndUpdate(
            { guildId: context.guildId },
            { $set: { "streams.notify": false } },
            { new: true }
        );

        const profile = context.chatbot.profiles.get(data?.twitch.userId!);
        if (profile) await profile.removeEvent("StreamOnline");

        await context.editOrReply({
            content: "Notifications were disabled for live streams.",
            flags: MessageFlags.Ephemeral,
        });
    }
}
