import {
    createChannelOption,
    Declare,
    Group,
    Options,
    SubCommand,
    type CommandContext,
} from "seyfert";

import { MessageFlags } from "seyfert/lib/types";
import { Guilds } from "../../../../models/Guilds";

const options = {
    channel: createChannelOption({
        channel_types: [0, 5],
        description: "Enter the channel.",
        required: true,
    }),
};

@Declare({
    name: "channel",
    description: "Sets the channel through which alerts will be sent.",
})
@Group("streams")
@Options(options)
export default class ChannelCommand extends SubCommand {
    async run(context: CommandContext<typeof options>) {
        const { channel } = context.options;

        await Guilds.updateOne(
            { guildId: context.guildId },
            { $set: { "streams.channelId": channel.id } }
        );

        await context.editOrReply({
            content: `The channel ${channel.toString()} has been correctly saved for alerts.`,
            flags: MessageFlags.Ephemeral,
        });
    }
}
