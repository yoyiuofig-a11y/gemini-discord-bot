const { Client, GatewayIntentBits } = require("discord.js");
const { GoogleGenAI } = require("@google/genai");
const http = require("http");

// Kiểm tra biến môi trường
if (!process.env.DISCORD_TOKEN) {
console.error("Thiếu DISCORD_TOKEN");
process.exit(1);
}

if (!process.env.GEMINI_API_KEY) {
console.error("Thiếu GEMINI_API_KEY");
process.exit(1);
}

// Web server cho Render
const PORT = process.env.PORT || 3000;

http.createServer((req, res) => {
res.writeHead(200, { "Content-Type": "text/plain" });
res.end("Biu Zeta Jones online 😎");
}).listen(PORT, () => {
console.log("Web server running on port ${PORT}");
});

// Discord
const client = new Client({
intents: [
GatewayIntentBits.Guilds,
GatewayIntentBits.GuildMessages,
GatewayIntentBits.MessageContent
]
});

// Gemini
const ai = new GoogleGenAI({
apiKey: process.env.GEMINI_API_KEY
});

client.once("ready", () => {
console.log("Đăng nhập thành công: ${client.user.tag}");
});

client.on("messageCreate", async (message) => {
if (message.author.bot) return;

try {
const prompt = `
Bạn là Biu Zeta Jones 😎

- Nói tiếng Việt.
- Vui tính, thân thiện.
- Thích Roblox, meme và game.
- Trả lời ngắn gọn.
- Hay dùng 😎😂🗿💀🔥.

Người dùng: ${message.content}
`;

const result = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: prompt
});

const text =
  result?.text ||
  "🗿 Hôm nay não tui lag rồi bro.";

await message.reply(text);

} catch (error) {
console.error("Gemini Error:", error);

if (String(error).includes("503")) {
  await message.reply("💀 Gemini đang quá tải, thử lại sau vài giây nha bro.");
} else {
  await message.reply("❌ Có lỗi xảy ra.");
}

}
});

client.login(process.env.DISCORD_TOKEN);
