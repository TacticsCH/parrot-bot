const { createUserEmbed } = require('../../utils/discordUtils');
const { createMdBlock } = require('../../utils/functions');
const generateSayText = require('../../utils/sayUtils');

async function run(client, message, args) {
  const sentence = args.join(' ') || 'WHAT DOES THE FOX SAYYY';

  const embed = createUserEmbed(
    '#ff9900',
    `🦊 ${message.author.username} invoked **Mr. Fox**`,
    {
      command: sayFoxCommand.name,
      author: message.author,
    },
  );

  const fox = `
 \\ 
  \\  /\\   /\\
    //\\\\_//\\\\      ____
    \\_     _/     /   /
     / o o \\     /^^^]
      =\\o/=      [   ]
      /   \\_     [   /
      \\     \\_  /  /
       [  [ ( \\/ _/
      _[ _[ / / _/`;

  embed.setDescription(
    createMdBlock(generateSayText(sentence, fox.length) + fox),
  );

  message.channel.send(embed);
}

const sayFoxCommand = {
  name: 'foxsay',
  category: 'say',
  description: 'You invoke a fox to make it say what you want!',
  autoMessageDeletion: true,
  run,
};

module.exports = sayFoxCommand;
