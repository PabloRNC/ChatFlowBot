//@ts-check

const { config } = require('seyfert');
require('dotenv/config');

module.exports = config.bot({
	locations: {
		base: 'src/discord',
		commands: 'commands',
		output: 'dist/discord',
		events: 'events',
	},
	token: process.env.DISCORD_CLIENT_TOKEN ?? '',
	intents: [
		'Guilds',
        'GuildMessages',
        'GuildMembers',
	],
	debug: false,
});
