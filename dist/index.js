"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
require("dotenv").config();
const ExtendedClient_1 = require("./lib/classes/ExtendedClient");
exports.client = new ExtendedClient_1.ExtendedClient();
console.clear();
exports.client.start();
process.on("uncaughtException", async (error) => {
  console.log(error);
  return error;
});
process.on("unhandledRejection", async (error) => {
  console.log(error);
  return error;
});
