# 🎰 Discord Casino Bot

A comprehensive Discord bot with various commands including economy, utility, roleplay, and owner-specific commands. This bot supports features like balance checking, daily and weekly rewards, slot games, emoji lists, server management, and more.

## 📂 Directory Structure

```bash
discord-casino-bot/
├── commands/
│   ├── Economy/
│   │   ├── balance.js
│   │   ├── daily.js
│   │   ├── deposit.js
│   │   ├── ranking.js
│   │   ├── slots.js
│   │   ├── spin.js
│   │   ├── transfer.js
│   │   ├── weekly.js
│   │   └── withdraw.js
│   ├── Utility/
│   │   ├── avatar.js
│   │   ├── banner.js
│   │   ├── botinfo.js
│   │   ├── botshard.js
│   │   ├── invite.js
│   │   ├── ping.js
│   │   ├── uptime.js
│   │   ├── userinfo.js
│   │   ├── serverinfo.js
│   │   ├── status.js
│   │   ├── help.js
│   │   ├── bigemoji.js
│   │   ├── emojilist.js
│   ├── Roleplay/
│   │   ├── angry.js
│   │   ├── bite.js
│   │   ├── blush.js
│   │   ├── bored.js
│   │   ├── clap.js
│   │   ├── cry.js
│   │   ├── dance.js
│   │   ├── facepalm.js
│   │   ├── happy.js
│   │   ├── highfive.js
│   │   ├── hug.js
│   │   ├── kiss.js
│   │   ├── laugh.js
│   │   ├── nod.js
│   │   ├── pat.js
│   │   ├── poke.js
│   │   ├── punch.js
│   │   ├── shrug.js
│   │   ├── shy.js
│   │   ├── slap.js
│   │   ├── sleep.js
│   │   ├── smile.js
│   │   ├── wave.js
│   │   ├── wink.js
│   ├── Owner/
│   │   ├── eval.js
│   │   ├── leaveserver.js
│   │   ├── serverjoin.js
│   │   ├── listservers.js
│   │   ├── addmoney.js
│   │   ├── removemoney.js
│   │   ├── reload.js
│   │   ├── restart.js
│   │   └── dm.js
├── events/
│   ├── ready.js
│   └── messageCreate.js
├── handlers/
│   ├── antiCrashHandler.js
│   ├── BotClient.js
│   ├── eventHandler.js
│   ├── commandHandler.js
│   ├── clientErrorHandler.js
│   └── antiCrashHandler.js
├── models/
│   ├── user.js
│   └── economy.js
├── index.js
├── shard.js
└── .env
```

## 🚀 Setup and Installation

### 1. Clone the repository:
```bash
git clone https://github.com/Sophan-Developer/discord-casino-bot.git
cd discord-casino-bot
```

### 2. Install the dependencies:
```bash
npm install
```

### 3. Create a `.env` file and add your bot token and MongoDB URI:
```env
DISCORD_TOKEN=your-bot-token
MONGODB_URI=your-mongodb-uri
PREFIX=.
```

### 4. Run the bot:
```bash
node shard.js
```

## 📜 Commands Overview

### 💰 Economy Commands
- **balance**: Check your balance
- **bank**: Check your bank balance
- **daily**: Claim your daily reward
- **deposit**: Deposit money into your bank
- **ranking**: Show the top users by balance
- **slots**: Play a game of slots
- **spin**: Play a spin game to win or lose money
- **transfer**: Transfer money to another user
- **weekly**: Claim your weekly reward
- **withdraw**: Withdraw money from your bank

### 🔧 Utility Commands
- **avatar**: Display the avatar of a user
- **banner**: Display the banner of a user
- **botinfo**: Display information about the bot
- **botshard**: Display shard information
- **help**: Displays a list of all commands or detailed information for a specific command
- **invite**: Get the invite link for the bot
- **ping**: Check the bot's ping
- **serverinfo**: Display information about the server
- **status**: Display the bot's status
- **uptime**: Check the bot's uptime
- **userinfo**: Display information about a user
- **bigemoji**: Display a big version of an emoji
- **emojilist**: List emojis with IDs

### 🎭 Roleplay Commands
- **angry**: Express your anger with an anime GIF
- **bite**: Bite someone with an anime GIF
- **blush**: Blush with an anime GIF
- **bored**: Express your boredom with an anime GIF
- **clap**: Clap with an anime GIF
- **cry**: Express your sadness with an anime GIF
- **dance**: Dance with an anime GIF
- **facepalm**: Facepalm with an anime GIF
- **happy**: Express happiness with an anime GIF
- **highfive**: High-five someone with an anime GIF
- **hug**: Hug someone with an anime GIF
- **kiss**: Kiss someone with an anime GIF
- **laugh**: Laugh with an anime GIF
- **nod**: Nod with an anime GIF
- **pat**: Pat someone with an anime GIF
- **poke**: Poke someone with an anime GIF
- **punch**: Punch someone with an anime GIF
- **shrug**: Shrug with an anime GIF
- **shy**: Express shyness with an anime GIF
- **slap**: Slap someone with an anime GIF
- **sleep**: Express your sleepiness with an anime GIF
- **smile**: Smile with an anime GIF
- **wave**: Wave with an anime GIF
- **wink**: Wink with an anime GIF

### 🛠️ Owner Commands
- **eval**: Evaluate code
- **leaveserver**: Make the bot leave a server
- **serverjoin**: Force the bot to join a server
- **listservers**: List all servers the bot is in
- **addmoney**: Add money to a user
- **removemoney**: Remove money from a user
- **reload**: Reload a command
- **restart**: Restart the bot
- **dm**: Send a direct message to a user

## 🤝 Contributing

Feel free to fork this repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## 📜 License

This project is licensed under the MIT License.