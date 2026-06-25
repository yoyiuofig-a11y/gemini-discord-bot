const { Client, GatewayIntentBits } = require("discord.js");
const { GoogleGenAI } = require("@google/genai");
const http = require("http");

// Web server cho Render
const PORT = process.env.PORT || 3000;

http.createServer((req, res) => {
res.writeHead(200, { "Content-Type": "text/plain" });
res.end("Bot is running!");
}).listen(PORT, () => {
console.log("Web server running on port ${PORT}");
});

const client = new Client({
intents: [
GatewayIntentBits.Guilds,
GatewayIntentBits.GuildMessages,
GatewayIntentBits.MessageContent
]
});

const ai = new GoogleGenAI({
apiKey: process.env.GEMINI_API_KEY
});

client.once("ready", () => {
console.log("Đăng nhập thành công: ${client.user.tag}");
});

client.on("messageCreate", async (message) => {
if (message.author.bot) return;

try {
const response = await ai.models.generateContent({
model: "gemini-2.5-flash",
contents: message.content
});

if (response.text) {
  await message.reply(response.text);
}

} catch (error) {
console.error(error);
await message.reply("❌ Lỗi khi gọi Gemini AI.");
}
});

client.login(process.env.DISCORD_TOKEN);  } catch (err) {
    console.error(err);
  }
});

client.login(process.env.DISCORD_TOKEN);
