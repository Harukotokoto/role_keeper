"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../../lib/classes/Command");
const discord_js_1 = require("discord.js");
const Embed_1 = require("../../lib/handlers/component/Embed");
exports.default = new Command_1.Command({
  name: "archive",
  description: "指定したチャンネルをアーカイブします",
  isOwnerCommand: true,
  options: [
    {
      name: "channel",
      description: "<#Channel>",
      type: discord_js_1.ApplicationCommandOptionType.Channel,
      channelTypes: [
        discord_js_1.ChannelType.GuildForum,
        discord_js_1.ChannelType.GuildText,
        discord_js_1.ChannelType.GuildAnnouncement,
        discord_js_1.ChannelType.GuildVoice,
        discord_js_1.ChannelType.GuildStageVoice,
      ],
      required: false,
    },
  ],
  execute: {
    interaction: async ({ client, interaction }) => {
      const target_channel =
        interaction.options.getChannel("channel") || interaction.channel;
      const selected_channel = interaction.guild?.channels.cache.get(
        target_channel?.id,
      );
      if (!target_channel || !selected_channel) return;
      if (!selected_channel) return;
      const archives_category = interaction.guild?.channels.cache.get(
        "1176827301049139252",
      );
      if (
        !archives_category ||
        archives_category.type !== discord_js_1.ChannelType.GuildCategory
      )
        return;
      await selected_channel
        .setParent(archives_category, {
          lockPermissions: true,
        })
        .then(async () => {
          await interaction
            .followUp({
              embeds: [
                {
                  title: "チャンネルをアーカイブしました",
                  description: `<#${target_channel?.id}>をアーカイブしました`,
                  color: discord_js_1.Colors.Aqua,
                  footer: (0, Embed_1.footer)(),
                },
              ],
            })
            .catch(async () => {
              await interaction.followUp({
                embeds: [
                  {
                    title: "チャンネルのアーカイブに失敗しました",
                    description: "エラーの原因が権限不足の場合が多いです",
                    color: discord_js_1.Colors.Aqua,
                    footer: (0, Embed_1.footer)(),
                  },
                ],
              });
            });
        });
    },
  },
});
