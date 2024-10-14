import { Event } from '../../lib/modules/Event';
import { client } from '../../index';
import { ActivityType } from 'discord.js';

export default new Event('ready', () => {
  let index = 0;
  const status_list = [`[count]サーバー`, `導入するだけで使えます！`];

  setInterval(() => {
    if (index === status_list.length) index = 0;

    const status = status_list[index];

    client.user?.setActivity({
      name: status
        .replace('[count]', client.guilds.cache.size.toString()),
      type: index === 0 ? ActivityType.Competing : ActivityType.Playing,
    });

    index++;
  }, 5000);
});