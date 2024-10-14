require('dotenv').config();
import { Client } from './lib/modules/Client';

export const client = new Client({
  intents: ['Guilds', 'GuildMembers'],
});

console.clear();
client.start();

process.on('uncaughtException', async (e) => {
  client.Logger.error(e);
  return e;
});

process.on('unhandledRejection', async (e) => {
  client.Logger.error(e);
  return e;
});
