"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("../../lib/classes/Event");
const index_1 = require("../../index");
exports.default = new Event_1.Event(
  "messageUpdate",
  async (oldMessage, newMessage) => {
    if (!newMessage.content && !newMessage.attachments) return;
    index_1.client.edit_snipes.set(newMessage.channel.id, {
      newMessage,
      oldMessage,
    });
  },
);
