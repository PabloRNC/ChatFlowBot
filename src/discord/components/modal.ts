import { Embed, ModalCommand, type ModalContext } from "seyfert";

import { Guilds } from "../../models/Guilds";
import { MessageFlags } from "seyfert/lib/types";

export default class MyModal extends ModalCommand {
    filter(context: ModalContext) {
        return context.customId === "modal";
    }

    async run(context: ModalContext) {
        const { interaction } = context;
        const live = interaction
            .getInputValue("live", true)
            .replaceAll("\n", "{nl}");

        await context.deferReply(true);
        await Guilds.updateOne(
            { guildId: context.guildId },
            { $set: { "streams.message": live } }
        );

        const embed = new Embed()
            .setColor("#9146ff")
            .setDescription("The message has been saved successfully.")
            .addFields({
                name: "Live Message",
                value: `> ${live.replaceAll("{nl}", "\n> ")}`,
            });

        await context.editOrReply({
            embeds: [embed],
            flags: MessageFlags.Ephemeral,
        });
    }
}
