"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../../lib/classes/Command");
const discord_js_1 = require("discord.js");
const Embed_1 = require("../../lib/handlers/component/Embed");
exports.default = new Command_1.Command({
  name: "verify",
  description: "指定したユーザーを手動で認証します",
  options: [
    {
      name: "user",
      description: "@user",
      type: discord_js_1.ApplicationCommandOptionType.User,
      required: true,
    },
  ],
  execute: {
    interaction: async ({ client, interaction }) => {
      const targetUser = interaction.options.getUser("user");
      if (!targetUser) return;
      const roleId = "1193913883585421352";
      const member = interaction.guild?.members.cache.get(targetUser.id);
      if (!member) return;
      await member.roles.add(roleId);
      await interaction.followUp({
        embeds: [
          {
            title: "ユーザー認証完了",
            description: `> ユーザー ${targetUser.tag} が認証されました。\n> 付与されたロール <@&${roleId}>`,
            footer: (0, Embed_1.footer)(),
            color: discord_js_1.Colors.Aqua,
          },
        ],
      });
    },
  },
});
