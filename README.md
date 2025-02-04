# Discord Bot for Real-Time Player Statistics

This is a work-in-progress Discord bot that delivers real-time updates on player statistics, such as shots on target, cards, corners, goals, and expected goals (xG). As a designer stepping into coding, this is my first project using Node.js, and I’m excited to share my journey!

## Project Overview

This bot is designed to check for player statistics every 15 seconds, providing timely updates to a specified Discord channel. Using a sample JSON file (`test.json`), the bot simulates real-time data from an imagined API, as actual services can be prohibitively expensive. 

The planned functionalities include providing real-time information for a specific match. This will encompass not only shots on target but also cards, fouls, tackles, and goals. The bot will offer a comprehensive view of the match statistics, catering to the needs of users seeking detailed insights.

Currently, the bot uses a JSON file as an example data source, which includes simulated player statistics. However, this will be replaced with real-time API calls in future iterations to ensure accurate and up-to-date information during matches. 


## The Idea

- **Real-Time Updates:** Automatically fetches player statistics at regular intervals.
- **Dynamic Messaging:** Sends formatted messages to Discord channels when players have shots on target.
- **Integration with Discord:** Easily integrates with Discord servers for seamless interaction.

## Dependencies

To run this bot, you need to have Node.js installed on your machine. Additionally, the following packages are required:

- **discord.js**: A powerful library for interacting with the Discord API.
- **node-schedule**: A library for scheduling tasks in Node.js.

### Installation

1. **Clone the Repository or report me cuz im designer:**

   ```bash
   git clone [<repository-url>](https://github.com/rogercamara/LiveStatsBot.git)
   cd LiveStatsBot

2. Change your information in config.json (I recomend using a .env, but i like to take risks)

   ```json
{
  "token": "TOKEN",
  "clientId": "BOT_CLIENT_ID",
  "guildId": "DISCORD_CHANNEl_ID",
  "channelId": "DISCORD_ROOM_ID"
}

### Run

Let him cook by using a **npm start**
