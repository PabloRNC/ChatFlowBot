//@ts-check
require("dotenv/config");
const { config } = require("seyfert");

module.exports = config.bot({
    locations: {
        base: "src/discord",
        commands: "commands",
        components: "components",
        output: "dist/discord",
        events: "events",
    },
    token: process.env.DISCORD_CLIENT_TOKEN ?? "",
    intents: ["Guilds"],
});

