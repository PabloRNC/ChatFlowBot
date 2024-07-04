"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedirectURI = exports.Scopes = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.Scopes = [
    'bits:read'
];
const { TWITCH_URI, TWITCH_REDIRECT } = process.env;
exports.RedirectURI = TWITCH_URI + TWITCH_REDIRECT;
