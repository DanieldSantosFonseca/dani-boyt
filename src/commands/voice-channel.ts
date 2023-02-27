import { Client } from 'discord.js';
import { Channels } from '../channels';

export type EnableVoiceChannelCommands = {
  autoCreateWhenJoin: boolean;
  autoRemoveChannel: boolean;
};

export class VoiceChannelCommands {
  constructor(
    private readonly client: Client,
    private readonly channels: Channels,
  ) {}
  private autoCreateWhenJoin() {
    this.client.on('voiceStateUpdate', async (oldState, newState) => {
      const { channel, member, guild } = newState;
      if (channel && channel.name === 'Criar sala') {
        const newChannel = await this.channels.createVoiceChannel(
          guild,
          member.user.username,
          channel.parentId,
        );
        newState.member.voice.setChannel(newChannel);
      }
    });
  }
  private autoRemoveChannel() {
    this.client.on('voiceStateUpdate', (oldState) => {
      const { channel } = oldState;
      if (
        channel &&
        this.channels.isAcurrentVoiceChannel(channel.id) &&
        !channel.members.size
      ) {
        this.channels.deleteVoiceChannel(channel);
      }
    });
  }

  enableCommands(args: EnableVoiceChannelCommands) {
    const res = Object.entries(args);

    const commands = {
      [this.autoCreateWhenJoin.name]: this.autoCreateWhenJoin(),
      [this.autoRemoveChannel.name]: this.autoRemoveChannel(),
    };

    res.forEach(([key, value]) => {
      if (value) {
        commands[key];
      }
    });
  }
}
