"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("../../lib/classes/Event");
const index_1 = require("../../index");
exports.default = new Event_1.Event("messageDelete", async (message) => {
  if (!message.content && !message.attachments) return;
  index_1.client.snipes.set(message.channel.id, message);
});
