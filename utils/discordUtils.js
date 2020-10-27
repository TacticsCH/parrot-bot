const { MessageEmbed } = require('discord.js');

/**
 * Function to create Embed easier.
 *
 * @param {string} color The color of the embed
 * @param {string} title The title of the embed
 * @param {string} footer The fotter of the embed
 * @param {boolean} timestamp The fotter of the embed
 * @return {MessageEmbed} A Discord Embed
 */
function createEmbed(color, title, footer, timestamp = true) {
  const embed = new MessageEmbed().setColor(color);

  title && embed.setTitle(title);
  if (footer) {
    if (typeof footer === 'string') {
      embed.setFooter(footer);
    } else if (footer.footer && footer.image) {
      embed.setFooter(footer.footer, footer.image);
    }
  }
  timestamp && embed.setTimestamp();

  return embed;
}

/**
 * Function to make Embed creation easier
 *
 * @param {string} color The color of the embed
 * @param {string} title The title of the embed
 * @param {{author: Author}} footer The fotter of the embed
 * @return {MessageEmbed} A Discord Embed
 */
function createUserEmbed(color, title, { author }) {
  const embed = new MessageEmbed().setColor(color).setTimestamp();

  title && embed.setTitle(title);
  author && embed.setFooter(`Asked by ${author.username}`, author.avatarURL());

  return embed;
}

exports.createEmbed = createEmbed;
exports.createUserEmbed = createUserEmbed;
