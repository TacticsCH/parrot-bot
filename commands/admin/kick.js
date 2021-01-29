const { Permissions } = require('../../utils/adminUtils');
const { createError } = require('../../utils/errorUtils');
const { createUserEmbed } = require('../../utils/discordUtils');

async function run(client, message, args) {
  const userMentioned = message.guild.member(message.mentions.users.first());

  if (userMentioned) {
    if (userMentioned.hasPermission("BAN_MEMBERS")) {
      throw createError(
        'Can\'t kick this user.',
        'This user has admin permissions. Please remove them before trying again.'
      );
    } else {
      userMentioned.kick()

      await message.channel.send(
        createUserEmbed('#8e44ad', "👋 User has been kicked 👋", {
          author: message.author,
        })
          .setDescription(`User ${userMentioned.username} has been kicked`),
      );
    }
  } else {
    throw createError(
      'Can\'t kick this user.',
      'No existing user has been mentionned in your ban command'
    );
  }
}

const kickCommand = {
  name: 'kick',
  aliases: ['kickuser'],
  category: 'admin',
  description: 'Kicks a user from your server',
  autoMessageDeletion: false,
  permissions: [Permissions.KICK_MEMBERS],
  run,
};

module.exports = kickCommand;