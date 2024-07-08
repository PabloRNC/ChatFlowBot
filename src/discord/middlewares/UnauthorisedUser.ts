import { createMiddleware } from "seyfert";
import { MessageFlags } from "seyfert/lib/types";

import { Guilds } from "../../models/Guilds";

export default createMiddleware<void>(async (data) => {
    const guild = data.context.guild();
    const databaseData = await Guilds.findOne({ guildId: guild?.id });

    if (!databaseData) {
        return data.context.editOrReply({
            content: "You must authorize your identity to use this command.",
            flags: MessageFlags.Ephemeral,
        });
    }

    data.next();
});
