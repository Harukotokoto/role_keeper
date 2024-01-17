"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Command_1 = require("../../lib/classes/Command");
const axios_1 = tslib_1.__importDefault(require("axios"));
const discord_js_1 = require("discord.js");
const Embed_1 = require("../../lib/handlers/component/Embed");
exports.default = new Command_1.Command({
  name: "Make it a Quote",
  type: discord_js_1.ApplicationCommandType.Message,
  execute: {
    interaction: async ({ interaction }) => {
      if (!interaction.targetMessage) {
        return await interaction.followUp({
          embeds: [
            {
              title: "エラーが発生しました",
              description: "そのメッセージにはテキストが含まれていません",
              color: discord_js_1.Colors.Red,
              footer: (0, Embed_1.footer)(),
            },
          ],
        });
      }
      const response = (
        await axios_1.default.post("https://api.voids.top/fakequote", {
          text: interaction.targetMessage.content,
          avatar: interaction.targetMessage.author.displayAvatarURL(),
          username: interaction.targetMessage.author.tag,
          display_name: interaction.targetMessage.author.displayName,
          color: true,
          watermark: "Powered by Paicha",
        })
      ).data;
      const imageBuffer = await axios_1.default.get(response.url, {
        responseType: "arraybuffer",
      });
      const imageBinary = Buffer.from(imageBuffer.data, "binary");
      await interaction.followUp({
        content: `[生成元のメッセージ](${interaction.targetMessage.url})`,
        embeds: [],
        files: [
          {
            attachment: imageBinary,
            name: "quote.jpg",
          },
        ],
      });
    },
  },
});
