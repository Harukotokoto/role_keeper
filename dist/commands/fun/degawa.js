"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Command_1 = require("../../lib/classes/Command");
const axios_1 = tslib_1.__importDefault(require("axios"));
const canvas_1 = require("canvas");
const discord_js_1 = require("discord.js");
const createBuffer = async (Buffer) => {
  const base64Data = `data:image/png;base64,${Buffer}`;
  const image = await (0, canvas_1.loadImage)(base64Data);
  const canvas = (0, canvas_1.createCanvas)(image.width, image.height);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0);
  return canvas.toBuffer("image/png");
};
exports.default = new Command_1.Command({
  name: "degawa",
  description: "めっちゃ出川",
  aliases: ["d"],
  options: [
    {
      name: "text",
      description: "text",
      type: discord_js_1.ApplicationCommandOptionType.String,
      max_length: 10,
    },
  ],
  execute: {
    interaction: async ({ client, interaction }) => {
      const text = interaction.options.getString("text");
      if (!text) {
        const imageBuffer = (
          await axios_1.default.get("https://degawa.ktrnds.com/random")
        ).data.data;
        await interaction.followUp({
          files: [
            {
              attachment: await createBuffer(imageBuffer),
              name: "degawa.png",
            },
          ],
        });
      } else {
        const imageBuffer = (
          await axios_1.default.post(
            "https://api.ktrnds.com/degawa/generator",
            {
              text: text,
            },
          )
        ).data.data;
        await interaction.followUp({
          files: [
            {
              attachment: await createBuffer(imageBuffer),
              name: "degawa.png",
            },
          ],
        });
      }
    },
    message: async ({ client, message, args }) => {
      const imageBuffer = (
        await axios_1.default.get("http://degawa.ktrnds.com/random")
      ).data.data;
      await message.reply({
        files: [
          {
            attachment: await createBuffer(imageBuffer),
            name: "degawa.png",
          },
        ],
        allowedMentions: {
          parse: [],
        },
      });
    },
  },
});
