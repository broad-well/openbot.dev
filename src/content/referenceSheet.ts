export default {
  input: {
    title: "Input",
    entries: {
      when: {
        title: "Event handler",
        subtitle: "Whenever this happens, do that",
        code: `mod.when(Events.MessageCreate, event => await event.react('✨'))
// When this happens, do that once and never again:
mod.once(Events.ClientReady, event => console.log('module started!'))`,
      },
      command: {
        title: "Slash commands",
        subtitle:
          "Build a chat input command and validate/fulfill interactions",
        code: `mod.command('ping', 'Get a response from the bot',
            intx => await intx.reply('pong!'))
// Fully customized:
mod.command('quote', 'Short description', {
  build(builder) {
    return builder
      .addStringOption((opt) => opt
        .setName("content")
        .setDescription("The statement to quote")
        .setRequired(true))
    },
  check(intx) {
    if (intx.options.getString("content", true).trim().length === 0) {
      throw new Error('The quote cannot be empty')
    }
  },
  run(intx, resolved) {
    /* fulfill the interaction to completion */
    /* only called if "check" did not fail */
  },
  /* optional: limit this command to a given guild */
  guild: '1002274815270465607'
})`,
      },
      menu: {
        title: "Context menu items",
        subtitle:
          "Attach a new context menu button to a message or a user, and do this when someone clicks it",
        code: `mod.menu('Menu item label', ApplicationCommandType.User, intx => { /* what to do? */ })

mod.menu('Menu item label', ApplicationCommandType.Message, {
  build(builder) {
    /* customize the context menu item, e.g. by adding localized labels */
    /* optional */
  },
  check(intx) {
    /* validate the incoming interaction to see if it should be fulfilled or rejected */
    /* optional */
    /* return something resolved to pass it to "run" below */
    /* throw an error to indicate an invalid interaction */
  },
  run(intx, resolved) {
    /* fulfill the interaction to completion */
    /* only called if "check" did not fail */
  },
  /* optional: limit this command to a given guild */
  guild: '12345678901234567890'
})`,
      },
    },
  },
  terms: {
    title: "Terms",
    entries: {
      snowflake: {
        title: '❄️ Snowflake',
        subtitle: 'Unique ID that represents an entity (message, user, channel, guild, etc.) on Discord. Example: 135824500603224064'
      },
      guild: {
        title: 'Guild',
        subtitle: 'Discord server (technical term for disambiguation)'
      },
      memberUser: {
        title: 'Member vs User',
        subtitle: "A User is a human's Discord account (e.g. username#ID). A Member is a User's profile in a Guild (server profile, roles, etc.)"
      },
      command: {
        title: 'Command',
        subtitle: 'Interactive feature provided by a bot. Types: Slash command, context menu command',
        links: {
          Docs: 'https://discord.com/developers/docs/interactions/application-commands#application-commands'
        }
      },
      intent: {
        title: 'Gateway Intent',
        subtitle: 'Group of events that take place on Discord. Specify intents to receive their events from Discord',
        links: {
          List: 'https://discord.com/developers/docs/topics/gateway#list-of-intents'
        }
      }
    }
  },
  queries: {
    title: "Queries",
    entries: {
      allGuildMembers: {
        title: 'All guild members',
        subtitle: 'List all the members and their profiles in a guild',
        code: `const guild = await mod.client.guilds.resolve('1028759256750633062')!
const members = await guild.members.list({limit: 1000})
// members is a Collection<Snowflake, GuildMember>`,
        intents: ['GuildMembers']
      },
      memberRoles: {
        title: 'Guild member & roles',
        subtitle: 'List all the roles held by a guild member',
        code: `const guild = await mod.client.guilds.resolve('1028759256750633062')!
const member = await guild.members.fetch({user: '135824500603224064'})
// member.roles.cache is a Collection<string, Role>`,
        links: {
          'Docs': 'https://discord.js.org/#/docs/discord.js/main/class/GuildMemberRoleManager'
        },
        intents: ['GuildMembers']
      },
      // resolve user by ID or discriminator
      // resolve channel by ID/name
    }
  },
  output: {
    title: "Output",
    entries: {
      textReply: {
        title: "Plain-text reply",
        subtitle: "Reply to the user that invoked the slash command",
        code: `async (intx: ChatInputCommandInteraction) => {
  // everyone in the guild can see:
  await intx.reply('sus?')
  // only the user can see:
  await intx.reply({
    content: 'sus?',
    ephemeral: true
  })
  // DM the user
  await intx.user.send('sus?')
}`
      },
      reactions: {
        title: 'Reactions',
        subtitle: 'React to any given message (e.g. from MessageCreate)',
        code: `async (msg: MessageEvent) => {
  await msg.react('😎')
}`
      },
      richReply: {
        title: "Embeds and buttons",
        subtitle: "Display embedded cards and buttons for more interaction",
        links: {
          'Embed Guide': 'https://discordjs.guide/popular-topics/embeds.html#using-an-embed-object',
          'Embed Preview': 'https://discohook.org/'
        },
        code: `async (intx: ChatInputCommandInteraction) => {
  // Display a button "✅ Agree" under the message
  const buttons = new ActionRowBuilder<ButtonBuilder>({
    components: [{
      type: ComponentType.Button,
      customId: 'custom-agree',
      label: 'Agree',
      emoji: '✅',
      style: ButtonStyle.Primary
    }]
  })
  await intx.reply({
    // Build and preview embeds at https://discohook.org
    embeds: [{
      title: 'Some title',
      description: "Embeds are cool because humans can't send them legally"
    }],
    components: [buttons]
  })
}`
      },
      modals: {
        title: 'Modals',
        subtitle: 'Display a form in a focused dialog to the user',
        links: {
          'Modal Guide': 'https://discordjs.guide/interactions/modals.html#building-and-responding-with-modals'
        },
        code: `async (intx: CommandInteraction) => {
  const modal = new ModalBuilder()
    .setCustomId('form-modal')
    .setTitle('My Modal')
  const question = new TextInputBuilder()
    .setCustomId('number-input')
    .setLabel('Enter any significant number')
    .setStyle(TextInputStyle.Short)
  const firstRow = new ActionRowBuilder<ModalActionRowComponentBuilder>()
    .addComponents(question)
  modal.addComponents(firstRow)
  await intx.showModal(modal)
}`
      }
      // assign roles
    }
  },
};
