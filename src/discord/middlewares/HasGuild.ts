import { createMiddleware } from "seyfert";
import { MessageFlags } from "seyfert/lib/types";
import { Guilds } from "../../models";

export default createMiddleware<void>(async(data) => {

    if(await Guilds.exists({ guildId: data.context.guildId })) {
        return data.context.editOrReply({ content: 'A Twitch Community has already been started within this guild.', flags: MessageFlags.Ephemeral })
    }

    return data.next()

})