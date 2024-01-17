"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("../../lib/classes/Event");
const index_1 = require("../../index");
const discord_js_1 = require("discord.js");
const Embed_1 = require("../../lib/handlers/component/Embed");
exports.default = new Event_1.Event("messageCreate", async (message) => {
  const prefix = ".";
  if (
    message.author.bot ||
    !message.guild ||
    !message.content.startsWith(prefix)
  ) {
    return;
  }
  const [cmd, ...args] = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const command =
    index_1.client.commands.get(cmd.toLowerCase()) ||
    index_1.client.commands.find((c) => c.aliases?.includes(cmd.toLowerCase()));
  if (!command) return;
  if (!command.execute.message) {
    return await message.reply({
      embeds: [
        {
          description: "このコマンドはスラッシュコマンドに対応していません",
          color: discord_js_1.Colors.Yellow,
          footer: (0, Embed_1.footer)(),
        },
      ],
      allowedMentions: {
        parse: [],
      },
    });
  }
  const admins = ["1004365048887660655", "1176812229631430660"];
  if (command.isOwnerCommand && !admins.includes(message.author.id)) {
    return await message.reply({
      embeds: [
        {
          title: "エラーが発生しました",
          description: "このコマンドはBot管理者限定です",
          color: discord_js_1.Colors.Red,
          footer: (0, Embed_1.footer)(),
        },
      ],
      allowedMentions: {
        parse: [],
      },
    });
  }
  await command.execute.message({ client: index_1.client, message, args });
});
