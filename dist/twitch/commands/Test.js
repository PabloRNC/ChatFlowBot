"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const chatbot_1 = require("@twitchfy/chatbot");
let default_1 = class extends chatbot_1.ChatCommand {
    async run(ctx) {
        return await ctx.reply('Hello World!');
    }
};
default_1 = __decorate([
    (0, chatbot_1.SetCommand)({
        name: 'hello'
    })
], default_1);
exports.default = default_1;
