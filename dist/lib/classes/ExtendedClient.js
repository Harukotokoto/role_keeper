"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedClient = exports.log = void 0;
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const util_1 = require("util");
const glob_1 = tslib_1.__importDefault(require("glob"));
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const process = tslib_1.__importStar(require("process"));
const moment_1 = tslib_1.__importDefault(require("moment"));
const globPromise = (0, util_1.promisify)(glob_1.default);
const log = (message, LogType) => {
  message = message.toString();
  const now = (0, moment_1.default)().format("MM/DD hh:mm:ss");
  const type =
    LogType === "INFO"
      ? "\x1b[46mINFO\x1b[0m   |"
      : LogType === "DEBUG"
        ? "\x1b[45mDEBUG\x1b[0m  |"
        : LogType === "ERROR"
          ? "\x1b[41mERROR\x1b[0m  |"
          : LogType === "CLIENT"
            ? "\x1b[43mCLIENT\x1b[0m |"
            : "";
  console.log(
    `\x1b[33m[\x1b[0m${now}\x1b[33m]\x1b[0m ${type} ${LogType === "ERROR" ? "\x1b[31m" : "\x1b[32m"}${message.toString()}\x1b[0m`,
  );
};
exports.log = log;
class ExtendedClient extends discord_js_1.Client {
  commands = new discord_js_1.Collection();
  snipes = new discord_js_1.Collection();
  edit_snipes = new discord_js_1.Collection();
  webCaptcha = new discord_js_1.Collection();
  calculateLevelXp(level) {
    return 100 * level || 1;
  }
  constructor() {
    super({
      intents: [
        discord_js_1.IntentsBitField.Flags.Guilds,
        discord_js_1.IntentsBitField.Flags.GuildMembers,
        discord_js_1.IntentsBitField.Flags.MessageContent,
        discord_js_1.IntentsBitField.Flags.GuildMessages,
        discord_js_1.IntentsBitField.Flags.GuildPresences,
      ],
    });
  }
  start() {
    const startTime = process.hrtime();
    this.registerModules().then(() => {
      const endTime = process.hrtime(startTime);
      const processingTimeMs = Math.floor(endTime[0] * 1000 + endTime[1] / 1e6);
      (0, exports.log)(
        `Modules loaded successfully on \x1b[35m${processingTimeMs}ms\x1b[0m`,
        "INFO",
      );
    });
    this.login(process.env.CLIENT_TOKEN).then(() => {
      const endTime = process.hrtime(startTime);
      const processingTimeMs = Math.floor(endTime[0] * 1000 + endTime[1] / 1e6);
      (0, exports.log)(
        `Logged in successfully on \x1b[35m${processingTimeMs}ms\x1b[0m`,
        "INFO",
      );
    });
    mongoose_1.default.connect(process.env.DATABASE_CONNECTION_URI).then(() => {
      const endTime = process.hrtime(startTime);
      const processingTimeMs = Math.floor(endTime[0] * 1000 + endTime[1] / 1e6);
      (0, exports.log)(
        `Successfully connected to database on \x1b[35m${processingTimeMs}ms\x1b[0m`,
        "INFO",
      );
    });
  }
  async importFile(filePath) {
    return (
      await Promise.resolve(`${filePath}`).then((s) =>
        tslib_1.__importStar(require(s)),
      )
    )?.default;
  }
  async loadEvents() {
    const eventFiles = await globPromise(
      `${__dirname}/../../events/**/*{.ts,.js}`,
    );
    for (const filePath of eventFiles) {
      const event = await this.importFile(filePath);
      if (event && "event" in event) {
        this.on(event.event, event.run);
      }
    }
  }
  async registerModules() {
    const slashCommands = [];
    const commandFiles = await globPromise(
      __dirname + `/../../commands/*/*{.ts,.js}`,
    );
    for (const filePath of commandFiles) {
      const command = await this.importFile(filePath);
      if (!command || !("name" in command)) continue;
      this.commands.set(command.name, command);
      slashCommands.push(command);
    }
    this.on("ready", () => {
      const startTime = process.hrtime();
      this.application?.commands
        .set(slashCommands)
        .then(() => {
          const endTime = process.hrtime(startTime);
          const processingTimeMs = Math.floor(
            endTime[0] * 1000 + endTime[1] / 1e6,
          );
          (0, exports.log)(
            `Registered ${slashCommands.length} slash commands on ${this.guilds.cache.size} servers on \x1b[35m${processingTimeMs}ms\x1b[0m`,
            "INFO",
          );
        })
        .catch((e) => {
          (0, exports.log)(`Failed to register slash commands\x1b[0m`, "ERROR");
          console.log(`\x1b[31m=> ${e}\x1b[0m`);
        });
    });
    await this.loadEvents();
  }
}
exports.ExtendedClient = ExtendedClient;
