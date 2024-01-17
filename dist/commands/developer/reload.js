"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../../lib/classes/Command");
const discord_js_1 = require("discord.js");
const child_process_1 = require("child_process");
const Embed_1 = require("../../lib/handlers/component/Embed");
exports.default = new Command_1.Command({
  name: "reload",
  description: "Botの機能を再読み込みします",
  isOwnerCommand: true,
  options: [
    {
      name: "event",
      description: "イベントファイルをリロードします",
      type: discord_js_1.ApplicationCommandOptionType.Subcommand,
    },
    {
      name: "all",
      description: "Botを再起動します",
      type: discord_js_1.ApplicationCommandOptionType.Subcommand,
    },
    {
      name: "sync",
      description: "Githubと同期して再起動します",
      type: discord_js_1.ApplicationCommandOptionType.Subcommand,
    },
  ],
  execute: {
    interaction: async ({ client, interaction }) => {
      const cmd = interaction.options.getSubcommand();
      switch (cmd) {
        case "event":
          await client.loadEvents();
          await interaction.followUp({
            embeds: [
              {
                title:
                  "<:check:1190622673999503390> イベントを再読み込みしました",
                color: discord_js_1.Colors.Aqua,
                footer: (0, Embed_1.footer)(),
              },
            ],
          });
          break;
        case "all":
          await interaction.followUp({
            embeds: [
              {
                title: "<:check:1190622673999503390> Botを再起動します",
                color: discord_js_1.Colors.Purple,
                footer: (0, Embed_1.footer)(),
              },
            ],
          });
          (0, child_process_1.exec)("pm2 restart ktrnds");
          break;
        case "sync":
          await interaction.followUp({
            embeds: [
              {
                title: "GitHubの情報を取得しています",
                color: discord_js_1.Colors.Purple,
                footer: (0, Embed_1.footer)(),
              },
            ],
          });
          (0, child_process_1.execSync)("git fetch");
          await interaction.editReply({
            embeds: [
              {
                title: "GitHubのデータを同期しています",
                color: discord_js_1.Colors.Purple,
                footer: (0, Embed_1.footer)(),
              },
            ],
          });
          (0, child_process_1.execSync)("git pull");
          await interaction.editReply({
            embeds: [
              {
                title: "Botをビルドしています",
                color: discord_js_1.Colors.Purple,
                footer: (0, Embed_1.footer)(),
              },
            ],
          });
          (0, child_process_1.execSync)("yarn build");
          await interaction.editReply({
            embeds: [
              {
                title: "同期が完了しました",
                description: "Botを再起動します",
                color: discord_js_1.Colors.Purple,
                footer: (0, Embed_1.footer)(),
              },
            ],
          });
          (0, child_process_1.execSync)("pm2 restart takkun");
          break;
      }
    },
    message: async ({ client, message, args }) => {
      if (
        !args[0] ||
        (args[0] !== "event" && args[0] !== "all" && args[0] !== "sync")
      )
        return message.reply({
          embeds: [
            {
              title: "エラーが発生しました",
              description: "必要なパラメーターを指定してください",
              color: discord_js_1.Colors.Red,
              footer: (0, Embed_1.footer)(),
            },
          ],
          allowedMentions: {
            parse: [],
          },
        });
      if (args[0] === "event") {
        await client.loadEvents();
        await message.reply({
          embeds: [
            {
              title: `✅ イベントを再読み込みしました`,
              color: discord_js_1.Colors.Aqua,
              footer: (0, Embed_1.footer)(),
            },
          ],
          allowedMentions: {
            parse: [],
          },
        });
      } else if (args[0] === "all") {
        await message.reply({
          embeds: [
            {
              title: "✅ Botを再起動します",
              color: discord_js_1.Colors.Purple,
              footer: (0, Embed_1.footer)(),
            },
          ],
          allowedMentions: {
            parse: [],
          },
        });
        (0, child_process_1.exec)("pm2 restart ktrnds");
      } else if (args[0] === "sync") {
        const msg_1 = await message.reply({
          embeds: [
            {
              title: "☑️ GitHubの情報を取得しています",
              color: discord_js_1.Colors.Purple,
              footer: (0, Embed_1.footer)(),
            },
          ],
          allowedMentions: {
            parse: [],
          },
        });
        (0, child_process_1.execSync)("git fetch");
        const msg_2 = await msg_1.edit({
          embeds: [
            {
              title: "☑️ GitHubのデータを同期しています",
              color: discord_js_1.Colors.Purple,
              footer: (0, Embed_1.footer)(),
            },
          ],
          allowedMentions: {
            parse: [],
          },
        });
        (0, child_process_1.execSync)("git pull");
        const msg_3 = await msg_2.edit({
          embeds: [
            {
              title: "☑️ Botをビルドしています",
              color: discord_js_1.Colors.Purple,
              footer: (0, Embed_1.footer)(),
            },
          ],
          allowedMentions: {
            parse: [],
          },
        });
        (0, child_process_1.execSync)("yarn build");
        await msg_3.edit({
          embeds: [
            {
              title: "✅ 同期が完了しました",
              description: "Botを再起動します",
              color: discord_js_1.Colors.Purple,
              footer: (0, Embed_1.footer)(),
            },
          ],
          allowedMentions: {
            parse: [],
          },
        });
        (0, child_process_1.execSync)("pm2 restart takkun");
      }
    },
  },
});
