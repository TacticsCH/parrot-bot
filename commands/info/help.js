const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const { prefix } = require('../../config.json');

async function run(client, message, args) {
  if (args[0]) {
    return getCmd(client, message, args[0]);
  } else {
    return getAll(client, message);
  }

  function getAll(client, message) {
    const embed = new MessageEmbed()
      .setColor('#32CD32')
      .setTitle('**Command list :**')
      .setFooter(
        `Type ${prefix}help [commandname] to have more info on a specific command`,
      )
      .setThumbnail(
        'https://i2.wp.com/thesecuritynoob.com/wp-content/uploads/2020/02/632px-Parrot_Logo.png?fit=632%2C599&ssl=1',
      )
      .setTimestamp();

    const commands = category => {
      return client.commands
        .filter(cmd => cmd.category === category)
        .map(cmd => `- \`${cmd.name}\``)
        .join('\n');
    };

    const info = client.categories
      .map(
        cat =>
          stripIndents`**${cat[0].toUpperCase() + cat.slice(1)}** \n${commands(
            cat,
          )}`,
      )
      .reduce((string, category) => string + '\n' + category);

    return message.channel.send(embed.setDescription(info));
  }

  function getCmd(client, message, input) {
    const embed = new MessageEmbed();

    const cmd =
      client.commands.get(input.toLowerCase()) ||
      client.commands.get(client.aliases.get(input.toLowerCase()));

    let info = `No info for command : **${input.toLowerCase()}**`;

    if (!cmd) {
      return message.channel.send(embed.setColor('RED').setDescription(info));
    }

    if (cmd.name) info = `**Command name**: ${cmd.name}`;
    if (cmd.aliases)
      info += `\n**Aliases**: ${cmd.aliases.map(a => `\`${a}\``).join(', ')}`;
    if (cmd.description) info += `\n**Description**: ${cmd.description}`;
    if (cmd.usage) {
      info += `\n**Usage**: ${cmd.usage}`;
      embed.setFooter(`Syntax: <> = required, [] = optional`);
    }

    return message.channel.send(embed.setColor('GREEN').setDescription(info));
  }
}

const helpCommand = {
  name: 'help',
  aliases: ['h'],
  category: 'info',
  description: 'Gives a list of all the commands',
  usage: '[command | alias]',
  run,
};

module.exports = helpCommand;