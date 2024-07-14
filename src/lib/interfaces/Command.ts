import {
  ApplicationCommandData,
  ApplicationCommandType,
  ChatInputCommandInteraction,
  Message,
  MessageContextMenuCommandInteraction,
  PermissionResolvable,
  UserContextMenuCommandInteraction,
} from 'discord.js';
import { Client } from '../modules/Client';

type MessageExecuteType = ({
  client,
  message,
  args,
}: {
  client: Client;
  message: Message;
  args: string[];
}) => any;

type CommandBase = {
  requiredPermissions?: PermissionResolvable[];
  ephemeral?: boolean;
  aliases?: string[];
  isOwnerCommand?: boolean;
};

type Command<
  T extends
    | ApplicationCommandType.ChatInput
    | ApplicationCommandType.Message
    | ApplicationCommandType.User,
> = {
  type: T;
  execute: {
    interaction?: ({
      client,
      interaction,
    }: {
      client: Client;
      interaction: T extends ApplicationCommandType.ChatInput
        ? ChatInputCommandInteraction
        : T extends ApplicationCommandType.Message
          ? MessageContextMenuCommandInteraction
          : UserContextMenuCommandInteraction;
    }) => any;
    message?: MessageExecuteType;
  };
};

type CommandWithDefault = {
  type?: never;
  execute: {
    interaction?: ({
      client,
      interaction,
    }: {
      client: Client;
      interaction: ChatInputCommandInteraction;
    }) => any;
    message?: MessageExecuteType;
  };
};

export type CommandType = CommandBase &
  ApplicationCommandData &
  (
    | (
        | Command<ApplicationCommandType.ChatInput>
        | Command<ApplicationCommandType.Message>
        | Command<ApplicationCommandType.User>
      )
    | CommandWithDefault
  );
