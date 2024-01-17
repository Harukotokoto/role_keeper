"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../../lib/classes/Command");
const Embed_1 = require("../../lib/handlers/component/Embed");
exports.default = new Command_1.Command({
  name: "server",
  description: "サーバー情報を表示します",
  execute: {
    interaction: async ({ interaction }) => {
      const guild = interaction.guild;
      if (!guild) return;
      const embed = await (0, Embed_1.serverInfo)(guild);
      await interaction.followUp({
        embeds: [embed],
      });
    },
    message: async ({ message }) => {
      const guild = message.guild;
      if (!guild) return;
      const embed = await (0, Embed_1.serverInfo)(guild);
      await message.reply({
        embeds: [embed],
        allowedMentions: {
          parse: [],
        },
      });
    },
  },
});
