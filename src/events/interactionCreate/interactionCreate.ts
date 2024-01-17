import {
  ApplicationCommandType,
  ChatInputCommandInteraction,
  Colors,
  Events,
  MessageContextMenuCommandInteraction,
  UserContextMenuCommandInteraction,
} from "discord.js";
import { client } from "../../index";
import { Event } from "../../lib/classes/Event";
import { footer } from "../../lib/handlers/component/Embed";

export default new Event(Events.InteractionCreate, async (interaction) => {
  if (interaction.isCommand()) {
    const command = client.commands.get(interaction.commandName);

    if (!command) {
      return await interaction.reply({
        embeds: [
          {
            title: "予期せぬエラーが発生しました",
            color: Colors.Red,
            footer: footer(),
          },
        ],
      });
    }
    const admins = ["1004365048887660655", "1176812229631430660"];

    if (command.isOwnerCommand && !admins.includes(interaction.user.id)) {
      return await interaction.reply({
        embeds: [
          {
            description: "このコマンドはBot管理者限定です",
            color: Colors.Blue,
            footer: footer(),
          },
        ],
      });
    }

    if (!command.execute.interaction) {
      return await interaction.reply({
        embeds: [
          {
            description: "このコマンドはスラッシュコマンドに対応していません",
            color: Colors.Yellow,
            footer: footer(),
          },
        ],
      });
    }

    await interaction.deferReply({
      ephemeral: command?.ephemeral || false,
    });

    if (!command.type || command.type === ApplicationCommandType.ChatInput) {
      await command.execute.interaction({
        client,
        interaction: interaction as ChatInputCommandInteraction,
      });
    }

    if (command.type === ApplicationCommandType.Message) {
      await command.execute.interaction({
        client,
        interaction: interaction as MessageContextMenuCommandInteraction,
      });
    }

    if (command.type === ApplicationCommandType.User) {
      await command.execute.interaction({
        client,
        interaction: interaction as UserContextMenuCommandInteraction,
      });
    }
  }
});
