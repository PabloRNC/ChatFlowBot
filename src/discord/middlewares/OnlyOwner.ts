import { createMiddleware } from "seyfert";
import { MessageFlags } from "seyfert/lib/types";

export default createMiddleware<void>(async(data) => {

    const guild = data.context.guild();

    if(guild?.ownerId !== data.context.author.id) return data.context.write({ content: 'You must be the guild owner to run this command!', flags: MessageFlags.Ephemeral });

    data.next();
})