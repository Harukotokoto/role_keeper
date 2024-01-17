"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("../../lib/classes/Event");
const index_1 = require("../../index");
const ExtendedClient_1 = require("../../lib/classes/ExtendedClient");
exports.default = new Event_1.Event("ready", async () => {
  (0, ExtendedClient_1.log)(
    `\x1b[32m${index_1.client.user?.tag} is now ready!\x1b[0m`,
    "CLIENT",
  );
});
