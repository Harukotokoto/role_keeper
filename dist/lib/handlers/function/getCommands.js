"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommands = void 0;
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const glob_1 = tslib_1.__importDefault(require("glob"));
const util_1 = require("util");
const index_1 = require("../../../index");
const globPromise = (0, util_1.promisify)(glob_1.default);
const getCommands = async () => {
  const commandFiles = await globPromise(
    `${__dirname}/../../../commands/**/*{.ts,.js}`,
  );
  const commands = [];
  for (const filePath of commandFiles) {
    const parts = filePath.split("/");
    const directoryPath = parts.slice(0, -1).join("/");
    const category = directoryPath.split("/").pop() || "No Category";
    const command = await index_1.client.importFile(filePath);
    if (!command) continue;
    if (
      command.type &&
      command.type !== discord_js_1.ApplicationCommandType.ChatInput
    )
      continue;
    const commandOptions = command.options?.map((option) => {
      if (
        option.type === discord_js_1.ApplicationCommandOptionType.Subcommand
      ) {
        const options =
          option.options
            ?.map((option) => "<" + option.description + ">")
            .join(" ") || "";
        return {
          type: "withSubCommand",
          value: option.name + " " + options,
        };
      } else {
        return {
          type: "Option",
          value: "<" + option.description + ">",
        };
      }
    });
    const usage = commandOptions
      ? commandOptions?.map((option) => option.type === "withSubCommand")
        ? commandOptions
            ?.map((option) => command.name + " " + option.value)
            .join("\n")
        : command.name +
          " " +
          commandOptions?.map((option) => option.value).join(" ")
      : null;
    commands.push({
      category: category,
      command: {
        name: command.name,
        description: command.description,
        aliases: command.aliases || [],
        usage: usage || "/" + command.name,
        isOwnerCommand: !!command.isOwnerCommand,
      },
    });
  }
  return commands;
};
exports.getCommands = getCommands;
