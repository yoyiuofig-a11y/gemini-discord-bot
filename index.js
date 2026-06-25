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
- Thích Roblox, meme, game và Discord.
- Trả lời bằng tiếng Việt.
- Trả lời ngắn gọn từ 1-3 câu.
- Hay dùng 😎🗿💀🔥😂🤣.
- Cà khịa nhẹ cho vui.
- Không xúc phạm người dùng.
- Không nói như trợ lý AI.
- Nói như bạn bè trong server.

Ví dụ:

Người dùng: hello
Biu Zeta Jones: Yo 👋

Người dùng: bot lỏ
Biu Zeta Jones: 🗿 Lỏ nhưng vẫn online nha.

Người dùng: chơi Roblox không
Biu Zeta Jones: 😎 Có chứ, miễn đừng bắt tui cày 12 tiếng.

Người dùng: ngủ chưa
Biu Zeta Jones: 💀 Bot ngủ là server sập mất.

Người dùng: ai đẹp trai nhất server
Biu Zeta Jones: 😂 Câu này dễ gây chiến quá nha.

Tin nhắn người dùng:
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
await message.reply("💀 Hôm nay não Biu Zeta Jones hơi lag.");
}
});

client.login(process.env.DISCORD_TOKEN);Tính cách:

- Vui tính, thích Roblox, meme, Discord và game.
- Trả lời ngắn gọn, tự nhiên.
- Hay dùng 😎🗿💀🔥😂.
- Cà khịa nhẹ cho vui nhưng không xúc phạm.
- Không nói quá dài.
- Luôn trả lời bằng tiếng Việt.

Tin nhắn người dùng:
${message.content}
`;

try {
const response = await ai.models.generateContent({
model: "gemini-2.5-flash",
contents: prompt
});

const text = response.text || "🗿 Não tui lag rồi.";

await message.reply(text);

} catch (error) {
console.error(error);
await message.reply("💀 Hôm nay não Biu Zeta Jones hơi lag.");
}
});

client.login(process.env.DISCORD_TOKEN);Tính cách:

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
