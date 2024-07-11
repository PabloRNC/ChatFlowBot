import {
    ActionRow,
    Declare,
    Group,
    Modal,
    SubCommand,
    TextInput,
    type CommandContext,
} from "seyfert";

import { TextInputStyle } from "seyfert/lib/types";

@Declare({
    name: "message",
    description: "Sets a custom live message for the live stream notifications.",
})
@Group("streams")
export default class ChannelCommand extends SubCommand {
    async run(context: CommandContext<{}, 'UnauthorisedUser'>) {
        const input = new TextInput()
            .setCustomId("live")
            .setLabel("Live Message")
            .setPlaceholder(
                "**{streamer}** is live streaming right now on Twitch!\n{url}"
            )
            .setRequired(true)
            .setStyle(TextInputStyle.Paragraph);

        const live = new ActionRow<TextInput>().setComponents([input]);
        const modal = new Modal()
            .setComponents([live])
            .setCustomId("modal")
            .setTitle("Custom Message");

        context.interaction.modal(modal);
    }
}
