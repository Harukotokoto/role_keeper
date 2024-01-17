"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../../lib/classes/Command");
const discord_js_1 = require("discord.js");
const Embed_1 = require("../../lib/handlers/component/Embed");
exports.default = new Command_1.Command({
  name: "send",
  description: "send embed",
  execute: {
    message: async ({ client, message, args }) => {
      const baseEmbed = new discord_js_1.EmbedBuilder()
        .setColor(discord_js_1.Colors.Blue)
        .setFooter((0, Embed_1.footer)());
      switch (message.channel.id) {
        case "1194671901541412884":
          message.channel.send({
            embeds: [
              baseEmbed
                .setTitle("参加方法")
                .setDescription(
                  "JE（Java版）\n" +
                    "> アドレス: play.ktrnds.com\n" +
                    "> ポート: 25565\n" +
                    "> バージョン: 1.8.9~1.20.4\n" +
                    "> 推奨: 1.20.2\n" +
                    "\n" +
                    "> BE（統合版）\n" +
                    "> アドレス: play.ktrnds.com\n" +
                    "> ポート: 19132\n" +
                    "> バージョン: 最新\n" +
                    "\n" +
                    "※プラグインの更新の問題で稀に統合版で接続できない場合があります。接続できない場合は <@!1004365048887660655> までお知らせください。\n" +
                    "※Nintendo Switchでの参加方法は下の動画をご覧ください\n" +
                    "[【マイクラ統合版】スイッチ版でスマホやPCの外部サーバーを追加する方法！【Switch/スイッチ】ver1.16](https://youtu.be/bZWHDhKoqnc)\n" +
                    "\n" +
                    "※Nintendo Switchでの参加は、別途Nintendo Onlineへの加入が必要です",
                )
                .setImage(
                  "https://cdn.discordapp.com/attachments/1112252949595422730/1194935137658482790/BqNrgE1.png",
                ),
            ],
          });
          break;
        case "1194671749627916288":
          message.channel.send({
            embeds: [
              baseEmbed
                .setTitle("ルール")
                .setFields([
                  {
                    name: "1. サーバーに関するルール",
                    value:
                      "1 ) サーバーに負荷をかける行為を行わない/避けること\n" +
                      "> チャンクローダーの量産\n" +
                      "> 大量のポイ捨て\n" +
                      "> モンスタートラップの溜めすぎ\n" +
                      "2 ) チート行為\n" +
                      "> X-Ray, fly, KAなどチートの類に含まれる行為\n" +
                      "> OP Hack 等\n" +
                      "3) 村人の家の中にある自分のチェストには看板を立てておいてください\n" +
                      "> 物取られても知りませんよ",
                  },
                  {
                    name: "2. ゲーム内のルール",
                    value:
                      "1 ) 放火や他人の建築物の破壊/フレンドリファイア\n" +
                      "> 森などでもサーバーなどに負荷がかかるので放火はやめてください！（聖地などの理由で少量なら許可）\n" +
                      "> 人殺すのだめだよ\n" +
                      "2 ) 他人のチェストの物色\n" +
                      "> 全部ログ出てますので何か盗まれたと思ったら <@!1004365048887660655> まで。\n" +
                      "3 ) エンダードラゴンの復活\n" +
                      "> エンドに建物作ってる人もいるので復活させないでください\n" +
                      "> もし復活させたいのであれば <@!1004365048887660655> まで。 (建築物を保護します)\n" +
                      "4 ) 暴言や過度な物乞い\n" +
                      "> 不快です",
                  },
                  {
                    name: "3. もし荒らされた時は",
                    value:
                      "チェストのアイテムがなくなってる/建物が壊れてる\n" +
                      "などが確認されましたら <@!1004365048887660655> までお願いします",
                  },
                  {
                    name: "4. その他",
                    value:
                      "\n" +
                      "> ※Mod/リソパについて\n" +
                      "> クライアントmodなら導入可能です。X-rayや、ESP系のmod/リソパの導入は禁止です。\n" +
                      "\n" +
                      "> ※統合版で参加してもサーバーはJava版なので使用はすべてJava版の仕様です。BUD回路とかetc...\n" +
                      "> 装置を作るときはJava版の装置を作ってください",
                  },
                ])
                .setImage(
                  "https://cdn.discordapp.com/attachments/1112252949595422730/1194946436702416896/UjER8lv.png",
                ),
            ],
          });
        default:
          return;
      }
    },
  },
});
