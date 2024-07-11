import { createMiddleware } from "seyfert";
import { MessageFlags } from "seyfert/lib/types";
import { Document } from "mongoose";
import { Guilds, GuildsI } from "../../models/Guilds";

export default createMiddleware<{ identity: Document<unknown, {}, GuildsI> }>(async (data) => {

    const identity = await Guilds.findOne({ guildId: data.context.guildId });

    if (!identity) {
        return data.context.editOrReply({
            content: "You must authorize your identity to use this command.",
            flags: MessageFlags.Ephemeral,
        });
    }

    data.next({ identity });
});
