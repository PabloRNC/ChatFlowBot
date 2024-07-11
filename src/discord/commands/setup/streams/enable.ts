import {
    createRoleOption,
    Declare,
    Embed,
    Group,
    Options,
    SubCommand,
    type CommandContext,
} from "seyfert";

import { MessageFlags } from "seyfert/lib/types";
import { Guilds } from "../../../../models/Guilds";

const options = {
    role: createRoleOption({
        description: "Sets a role to be mentioned in the live stream.",
    }),
};

@Declare({ name: "enable", description: "Enable Twitch notifications." })
@Options(options)
@Group("streams")
export default class ChannelCommand extends SubCommand {
    async run(context: CommandContext<typeof options>) {
        const { role } = context.options;
        const updateData: any = { "streams.notify": true };

        const embed = new Embed()
            .setColor("#9146ff")
            .setTitle("Changes made!")
            .setDescription("Notifications were enabled for live streams.");

        if (role) {
            updateData["streams.roleId"] = role.id;

            embed.addFields({
                name: "Role has been saved for live streaming.",
                value: `${role}`,
            });
        }

        const data = await Guilds.findOneAndUpdate(
            { guildId: context.guildId },
            { $set: updateData },
            { new: true }
        );

        const profile = context.chatbot.profiles.get(data?.twitch.userId!);
        if (profile) await profile.addEvent("StreamOnline");

        await context.editOrReply({
            embeds: [embed],
            flags: MessageFlags.Ephemeral,
        });
    }
}
