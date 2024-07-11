import { AutoLoad, Command, Declare, Groups, Middlewares } from "seyfert";

@Declare({
    contexts: ["Guild"],
    defaultMemberPermissions: ["Administrator"],
    description: "setup command",
    name: "setup",
})
@Groups({ streams: { defaultDescription: "streams command" } })
@Middlewares(["OnlyOwner", "UnauthorisedUser"])
@AutoLoad()
export default class AccountCommand extends Command {}
