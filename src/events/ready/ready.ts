import { Event } from "../../lib/classes/Event";
import { client } from "../../index";
import { log } from "../../lib/classes/ExtendedClient";
import { ActivityType } from "discord.js";

export default new Event("ready", async () => {
  log(`\x1b[32m${client.user?.tag} is now ready!\x1b[0m`, "CLIENT");

  client.user?.setPresence({
    activities: [
      {
        name: `/help | Produced by Rena`,
        type: ActivityType.Custom,
      },
    ],
    status: "online",
  });
});
