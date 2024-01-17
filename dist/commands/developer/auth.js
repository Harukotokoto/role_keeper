"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../../lib/classes/Command");
exports.default = new Command_1.Command({
  name: "auth",
  description: "auth",
  execute: {
    message: async ({ client, message, args }) => {
      const member = await message.guild?.members.fetch("1004365048887660655");
      if (!member) return;
      const role = message.guild?.roles.cache.get("1193913883585421352");
      if (!role) return;
      await member.roles.add(role);
      await message.reply({
        content: "権限乱用をしてたのしいか！！！！！\n認証しますた、わらい。",
      });
    },
  },
});
