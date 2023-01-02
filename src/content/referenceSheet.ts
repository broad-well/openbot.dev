export default {
    input: {
        title: 'Input',
        entries: {
            when: {
                title: 'Event handler',
                subtitle: 'Whenever this happens, do that',
                code: `mod.when(Events.MessageCreate, event => await event.react('✨'))
// When this happens, do that once and never again:
mod.once(Events.ClientReady, event => console.log('module started!'))`
            },
            command: {
                title: 'Slash commands',
                subtitle: 'Build a chat input command and validate/fulfill interactions',
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
})`
            },
            menu: {
                title: 'Context menu items',
                subtitle: 'Attach a new context menu button to a message or a user, and do this when someone clicks it',
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
})`
            }
        }
    },
    terms: {
        title: 'Terms',

    },
    queries: {
        title: 'Queries',

    },
    output: {
        title: 'Output',

    }
}