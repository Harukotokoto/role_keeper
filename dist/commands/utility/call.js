"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../../lib/classes/Command");
const discord_js_1 = require("discord.js");
const builders_1 = require("@discordjs/builders");
const Embed_1 = require("../../lib/handlers/component/Embed");
exports.default = new Command_1.Command({
  name: "call",
  description: "運営を呼び出します",
  options: [
    {
      name: "reason",
      description: "Reason to call",
      required: true,
      type: discord_js_1.ApplicationCommandOptionType.String,
    },
  ],
  execute: {
    interaction: async ({ interaction, client }) => {
      const reason = interaction.options.getString("reason") || "";
      await interaction.followUp({
        embeds: [
          {
            title: "お呼び出しですわよ!!",
            description:
              "理由\n" +
              (0, builders_1.codeBlock)(reason) +
              `\nBy ${interaction.user.displayName}(${interaction.user.tag})`,
            color: discord_js_1.Colors.Gold,
            footer: (0, Embed_1.footer)(),
          },
        ],
      });
      await interaction.channel?.send(`<@&1176816017905811526>`);
    },
  },
});
