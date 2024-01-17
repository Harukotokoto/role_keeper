"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pingEmbed = exports.footer = exports.serverInfo = void 0;
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const index_1 = require("../../../index");
const node_os_utils_1 = tslib_1.__importDefault(require("node-os-utils"));
const emojis_1 = require("../../util/emojis");
const createBar_1 = require("../../util/createBar");
const footer = () => {
  const user = index_1.client.users.cache.get("1004365048887660655");
  return {
    text: `Produced by Rena`,
    icon_url: user?.avatarURL(),
  };
};
exports.footer = footer;
const pingEmbed = async (response) => {
  // WSの速度を計算
  const ping = index_1.client.ws.ping;
  // CPU使用率を計算
  const cpuUsage = await node_os_utils_1.default.cpu.usage();
  // RAM使用率を計算
  const memUsage = (await node_os_utils_1.default.mem.info()).usedMemPercentage;
  // 整数にする
  const cpuInteger = Math.round(cpuUsage);
  const memInteger = Math.round(memUsage);
  // CPUの使用率に応じて絵文字を変更
  const cpuEmoji =
    cpuInteger < 30
      ? emojis_1.RAM_Excellent
      : cpuInteger <= 60
        ? emojis_1.RAM_Good
        : emojis_1.RAM_Bad;
  // RAMの使用率に応じて絵文字を変更
  const memEmoji =
    memInteger < 50
      ? emojis_1.RAM_Excellent
      : memInteger <= 80
        ? emojis_1.RAM_Good
        : emojis_1.RAM_Bad;
  // レスポンス速度に応じて絵文字を変更_
  const responseEmoji =
    response < 401
      ? emojis_1.Stats01
      : response <= 600
        ? emojis_1.Stats02
        : emojis_1.Stats03;
  // WS速度に応じて絵文字を変更
  const latencyEmoji =
    ping < 201
      ? emojis_1.Stats01
      : ping <= 400
        ? emojis_1.Stats02
        : emojis_1.Stats03;
  // フィールドを作成
  const latencyMessage =
    emojis_1.Space + latencyEmoji + "**WebSocket:** `" + ping + "`ms";
  const responseMessage =
    emojis_1.Space + responseEmoji + "**Response:** `" + response + "`ms";
  const cpuMessage = cpuEmoji + " **CPU:** `" + cpuUsage + "`%";
  const memMessage = memEmoji + " **RAM:** `" + memUsage + "`%";
  const resourceFieldMessage =
    emojis_1.Space + emojis_1.Journey + " **Resources:**";
  const resourceField =
    emojis_1.Space +
    emojis_1.Space +
    cpuMessage +
    "\n" +
    emojis_1.Space +
    emojis_1.Space +
    memMessage;
  const title = emojis_1.Stage + " **Shard[0]:**";
  return {
    embeds: [
      {
        title: emojis_1.Online + " Bot Status:",
        fields: [
          {
            name: title,
            value:
              latencyMessage +
              "\n" +
              responseMessage +
              "\n" +
              resourceFieldMessage +
              "\n" +
              resourceField,
          },
        ],
        color: discord_js_1.Colors.Aqua,
        footer: footer(),
      },
    ],
    allowedMentions: {
      parse: [],
    },
  };
};
exports.pingEmbed = pingEmbed;
const serverInfo = async (guild) => {
  const verification_levels = {
    0: "無し",
    1: "低",
    2: "中",
    3: "高",
    4: "最高",
  };
  const createBoostBar = () => {
    const boostCount = guild.premiumSubscriptionCount ?? 0;
    const boostLevel = guild.premiumTier;
    switch (boostLevel) {
      case 0:
        return (
          `レベル無し | ${boostCount === 0 ? "未" : boostCount}ブースト\n` +
          (0, createBar_1.createBar)(boostCount, 2) +
          `\n次のレベルまで: ${boostCount}/2`
        );
      case 1:
        return (
          `レベル ${boostLevel} | ${boostCount}ブースト\n` +
          (0, createBar_1.createBar)(boostCount, 7) +
          `\n次のレベルまで: ${boostCount}/7`
        );
      case 2:
        return (
          `レベル ${boostLevel} | ${boostCount}ブースト\n` +
          (0, createBar_1.createBar)(boostCount, 14) +
          `\n次のレベルまで: ${boostCount}/14`
        );
      case 3:
        return (
          `レベル ${boostLevel} | ${boostCount}ブースト\n` +
          (0, createBar_1.createBar)(14, 14) +
          "\nブーストレベル最大🎉"
        );
    }
  };
  return {
    author: {
      name: guild.name,
      icon_url: guild.iconURL()?.toString(),
    },
    image: {
      url: guild.bannerURL()?.toString() || "",
    },
    fields: [
      {
        name: emojis_1.Server + " サーバー作成日",
        value: "<t:" + Math.round(guild.createdAt.getTime() / 1000) + ">",
        inline: true,
      },
      {
        name: emojis_1.Member + " サーバー所有者",
        value: "<@!" + (await guild.fetchOwner()).id + ">",
      },
      {
        name: emojis_1.Member + " メンバー数",
        value: guild.memberCount + "人",
        inline: true,
      },
      {
        name: emojis_1.Lock + " BANされたユーザー数",
        value: (await guild.bans.fetch()).size.toString() + "メンバー",
        inline: true,
      },
      {
        name: emojis_1.Protected + " 認証レベル",
        value: verification_levels[guild.mfaLevel],
        inline: true,
      },
      {
        name: emojis_1.Boost + " サーバーブースト進行度",
        value: createBoostBar() ?? "生成中にエラーが発生しました",
      },
      {
        name: "チャンネル数(" + guild.channels.cache.size + ")",
        value:
          emojis_1.Channel +
          " **テキストチャンネル:** " +
          guild.channels.cache.filter((channel) => channel.isTextBased).size +
          "\n" +
          emojis_1.Voice +
          " **ボイスチャンネル:** " +
          guild.channels.cache.filter((channel) => channel.isVoiceBased()).size,
      },
    ],
    color: discord_js_1.Colors.Gold,
    footer: footer(),
  };
};
exports.serverInfo = serverInfo;
