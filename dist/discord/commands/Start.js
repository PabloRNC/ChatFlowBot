"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const seyfert_1 = require("seyfert");
const utils_1 = require("../utils");
let default_1 = class extends seyfert_1.Command {
    async run(ctx) {
        const url = (0, utils_1.makeLoginURL)(ctx.metadata.SignJWT.jwt);
        console.log(url);
        const embed = new seyfert_1.Embed()
            .setTitle('Start Twitch Community')
            .setDescription(`Click [this link](${url}) to start the Twitch Community setup by authorizing with your Twitch account.`)
            .setURL(url)
            .addFields({
            name: 'Status',
            value: 'Pending',
        })
            .setColor('Yellow');
        return await ctx.editOrReply({ embeds: [embed] });
    }
};
default_1 = __decorate([
    (0, seyfert_1.Declare)({
        name: 'start',
        description: 'Starts a Twitch Community inside this Discord Guild'
    }),
    (0, seyfert_1.Middlewares)(['OnlyOwner', 'DeferReply', 'SignJWT'])
], default_1);
exports.default = default_1;
