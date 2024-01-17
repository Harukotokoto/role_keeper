"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const index_1 = require("../../index");
const Event_1 = require("../../lib/classes/Event");
const Embed_1 = require("../../lib/handlers/component/Embed");
exports.default = new Event_1.Event(
  "interactionCreate",
  async (interaction) => {
    if (interaction.isCommand()) {
      const command = index_1.client.commands.get(interaction.commandName);
      if (!command) {
        return await interaction.reply({
          embeds: [
            {
              title: "予期せぬエラーが発生しました",
              color: discord_js_1.Colors.Red,
              footer: (0, Embed_1.footer)(),
            },
          ],
        });
      }
      const admins = ["1004365048887660655", "1176812229631430660"];
      if (command.isOwnerCommand && !admins.includes(interaction.user.id)) {
        return await interaction.reply({
          embeds: [
            {
              description: "このコマンドはBot管理者限定です",
              color: discord_js_1.Colors.Blue,
              footer: (0, Embed_1.footer)(),
            },
          ],
        });
      }
      if (!command.execute.interaction) {
        return await interaction.reply({
          embeds: [
            {
              description: "このコマンドはスラッシュコマンドに対応していません",
              color: discord_js_1.Colors.Yellow,
              footer: (0, Embed_1.footer)(),
            },
          ],
        });
      }
      await interaction.deferReply({
        ephemeral: command?.ephemeral || false,
      });
      if (
        !command.type ||
        command.type === discord_js_1.ApplicationCommandType.ChatInput
      ) {
        await command.execute.interaction({
          client: index_1.client,
          interaction: interaction,
        });
      }
      if (command.type === discord_js_1.ApplicationCommandType.Message) {
        await command.execute.interaction({
          client: index_1.client,
          interaction: interaction,
        });
      }
      if (command.type === discord_js_1.ApplicationCommandType.User) {
        await command.execute.interaction({
          client: index_1.client,
          interaction: interaction,
        });
      }
    }
  },
);
