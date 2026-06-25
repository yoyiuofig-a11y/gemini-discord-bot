const { Client, GatewayIntentBits } = require("discord.js");
const { GoogleGenAI } = require("@google/genai");
const http = require("http");

// Web server cho Render
const PORT = process.env.PORT || 3000;

http.createServer((req, res) => {
res.writeHead(200, { "Content-Type": "text/plain" });
res.end("Biu Zeta Jones đang online 😎");
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

const prompt = `
Bạn là Biu Zeta Jones.

Tính cách:

- Thành viên Discord vui tính.
- Nói tiếng Việt.
- Thích Roblox, meme, game.
- Trả lời ngắn gọn 1-3 câu.
- Hay dùng 😎🗿💀🔥😂.
- Cà khịa nhẹ cho vui.
- Không toxic.
- Không tự nhận là AI trừ khi được hỏi.

Tin nhắn của người dùng:
${message.content}
`;

try {
const result = await ai.models.generateContent({
model: "gemini-2.5-flash",
contents: prompt
});

const text = result.text || "🗿 Não tui lag rồi.";

await message.reply(text);

} catch (error) {
console.error(error);
await message.reply("💀 Hôm nay Biu Zeta Jones bị lag não.");
}
});

client.login(process.env.DISCORD_TOKEN);contents: message.content
});

const text = result.text || "Không có phản hồi.";

await message.reply(text);

} catch (error) {
console.error("Gemini Error:", error);
await message.reply("❌ Lỗi khi gọi Gemini AI.");
}
});

client.login(process.env.DISCORD_TOKEN);
