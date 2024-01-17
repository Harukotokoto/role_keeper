"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../../lib/classes/Command");
const Embed_1 = require("../../lib/handlers/component/Embed");
exports.default = new Command_1.Command({
  name: "ping",
  description: "Botの応答速度を表示します",
  ephemeral: false,
  execute: {
    interaction: async ({ interaction }) => {
      const response =
        Date.now() - (await interaction.fetchReply()).createdTimestamp;
      await interaction.followUp(await (0, Embed_1.pingEmbed)(response));
    },
    message: async ({ message }) => {
      const response = Date.now() - message.createdTimestamp;
      await message.reply(await (0, Embed_1.pingEmbed)(response));
    },
  },
});
