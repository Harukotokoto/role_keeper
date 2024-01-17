"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("../../lib/classes/Event");
const index_1 = require("../../index");
const discord_js_1 = require("discord.js");
exports.default = new Event_1.Event("ready", () => {
  setInterval(async () => {
    const guildId = "1176812762110885908";
    const guild = index_1.client.guilds.cache.get(guildId);
    if (!guild) return;
    const memberCount = guild?.memberCount || 0;
    const channel = guild.channels.cache.get("1189473966297981030");
    if (!channel) return;
    await channel.setName(`メンバー数：${memberCount}人`);
    index_1.client.user?.setPresence({
      activities: [
        {
          name: `たっくん鯖 | ${memberCount}人を捕食中`,
          type: discord_js_1.ActivityType.Custom,
        },
      ],
      status: "online",
    });
  }, 30000);
});
