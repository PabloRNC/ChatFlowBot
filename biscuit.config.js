//@ts-check

const { config } = require('biscuitjs');
require('dotenv/config');

module.exports = config.bot({
	locations: {
		base: 'src',
		commands: 'commands',
		output: 'dist',
		events: 'events',
		components: 'components',
	},
	token: process.env.TOKEN ?? '',
	intents: [
		'Guilds',
        'GuildMembers'
	],
	debug: false,
});
