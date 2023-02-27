import { Client, GatewayIntentBits } from 'discord.js';
import 'dotenv/config';
import { Channels } from './channels';
import { VoiceChannelCommands } from './commands/voice-channel';

export class DaniBoyt {
  async start() {
    const client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
      ],
    });
    const channels = new Channels();
    const voiceChannelCommands = new VoiceChannelCommands(client, channels);

    client.on('ready', () => {
      console.log('\nlogado com sucesso!!!\n');
    });

    voiceChannelCommands.enableCommands({
      autoCreateWhenJoin: true,
      autoRemoveChannel: true,
    });

    await client.login(process.env.TOKEN);
  }
}

new DaniBoyt().start();
