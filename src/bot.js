// Import necessary libraries from Discord.js and Node.js
const { Client, GatewayIntentBits, bold, italic, underline, blockQuote } = require('discord.js');
const fs = require('fs'); // File system module for reading files
const schedule = require('node-schedule'); // Library for scheduling tasks
const config = require('./config/config.json'); // Load configuration from a JSON file

// Create a new Discord client instance with specified intents
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, // Allows the bot to access guild (server) information
        GatewayIntentBits.GuildMessages, // Allows the bot to read messages in guilds
        GatewayIntentBits.MessageContent // Allows the bot to read message content
    ] 
});

// Event listener for when the bot is ready
client.once('ready', () => {
    console.log(`${client.user.tag}!`); // Log the bot's username when it is ready

    // Schedule a job to check for shots on goal every 15 seconds
    // Note: Avoid this frequency if you are charged for API calls
    schedule.scheduleJob('*/15 * * * * *', checkForShotsOnGoal);
});

// Function to check for shots on goal
function checkForShotsOnGoal() {
    // Read the JSON file containing match data
    fs.readFile('./src/live.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the JSON file:', err); // Log any errors reading the file
            return;
        }

        // Parse the JSON data to an object
        const matchData = JSON.parse(data);
        const match = matchData.commentaries.tournament.match; // Access match information
        // Combine player statistics from both local and visitor teams
        const players = match.player_stats.localteam.player.concat(
            match.player_stats.visitorteam.player
        );

        // Iterate over each player to check for shots on goal
        players.forEach(player => {
            if (player.shots_on_goal && player.shots_on_goal > 0) { // Check if player has shots on goal
                const eventTime = new Date().toLocaleTimeString('pt-BR'); // Get current time in Brazilian format
                const matchTime = match.matchinfo.time.name; // Assume this is the match start time
                const half = eventTime < "45:00" ? "1T" : "2T"; // Determine if it's the first or second half

                // Construct a message with the match and player details
                const message = `
                ${bold('Match:')} ${match.localteam.name} vs ${match.visitorteam.name}
                ${player.name} - ${bold('Shot on target')} - ${bold('Total:')} ${player.shots_on_goal}
                ${bold('Period:')} ${half}
                `;

                // Send the constructed message to the specified channel
                client.channels.cache.get(config.channelId).send(blockQuote(message)).then(() => {
                    console.log(`Log: ${message}`); // Log the sent message
                }).catch(error => {
                    console.error('Oops, it crashed:', error); // Log any errors sending the message
                });
            }
        });
    });
}

// Log in the bot using the token from the configuration file
client.login(config.token).catch(error => {
    console.error('Error logging in:', error); // Log any errors during the login process
});
