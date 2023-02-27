import { ChannelType, Guild, VoiceBasedChannel } from 'discord.js';

export class Channels {
  private readonly currentVoiceChannels: VoiceBasedChannel[] = [];

  async createVoiceChannel(guild: Guild, name: string, parent?: string) {
    const channel = await guild.channels.create({
      name,
      type: ChannelType.GuildVoice,
      parent,
    });
    this.currentVoiceChannels.push(channel);
    return channel;
  }

  isAcurrentVoiceChannel(id: string): boolean {
    return this.currentVoiceChannels.some((channel) => channel.id === id);
  }

  deleteVoiceChannel(channel: VoiceBasedChannel) {
    channel.delete();
    const index = this.currentVoiceChannels.indexOf(channel);
    this.currentVoiceChannels.slice(index, 1);
  }
}
