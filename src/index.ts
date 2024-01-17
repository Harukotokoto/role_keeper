require("dotenv").config();
import { ExtendedClient, log } from "./lib/classes/ExtendedClient";

export const client = new ExtendedClient();

console.clear();
client.start();

process.on("uncaughtException", async (error: Error) => {
  log(error.toString(), "ERROR");
  return error;
});

process.on("unhandledRejection", async (error: Error) => {
  log(error.toString(), "ERROR");
  return error;
});
