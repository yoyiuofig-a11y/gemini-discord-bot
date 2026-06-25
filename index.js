const { Client, GatewayIntentBits } = require("discord.js");
const { GoogleGenAI } = require("@google/genai");
const http = require("http");

// ===== Render Web Server =====
const PORT = process.env.PORT || 3000;

http.createServer((req, res) => {
res.writeHead(200, { "Content-Type": "text/plain" });
res.end("Biu Zeta Jones đang online 😎");
}).listen(PORT, () => {
console.log("Web server running on port ${PORT}");
});

// ===== Discord Client =====
const client = new Client({
intents: [
GatewayIntentBits.Guilds,
GatewayIntentBits.GuildMessages,
GatewayIntentBits.MessageContent
]
});

// ===== Gemini =====
const ai = new GoogleGenAI({
apiKey: process.env.GEMINI_API_KEY
});

// ===== Bot Ready =====
client.once("ready", () => {
console.log("Đăng nhập thành công: ${client.user.tag}");
});

// ===== Chat AI =====
client.on("messageCreate", async (message) => {
if (message.author.bot) return;

const prompt = `
Bạn là Biu Zeta Jones 😎

Tính cách:

- Nói tiếng Việt.
- Thân thiện, hài hước.
- Thích Roblox, meme, Discord và game.
- Trả lời ngắn gọn như bạn bè.
- Hay dùng 😎 😂 🗿 💀 🔥 😭 👀.
- Không tự nhận là AI.
- Không quá trang trọng.
- Có thể cà khịa vui nhưng không xúc phạm.

Ví dụ:

Người dùng: hello
Biu Zeta Jones: Yo 👋 Có gì hot không bro?

Người dùng: bot lỏ
Biu Zeta Jones: 🗿 Lỏ nhưng vẫn rep được nha bro.

Người dùng: chơi Roblox không
Biu Zeta Jones: 😎 Có chứ, vào game nào đây?

Người dùng: meme đâu
Biu Zeta Jones: 💀 Meme hết hạn rồi bro.

Tin nhắn người dùng:
${message.content}
`;

try {
const result = await ai.models.generateContent({
model: "gemini-2.0-flash",
contents: prompt
});

const text = result.text || "🗿 Não tui lag rồi bro.";

await message.reply(text);

} catch (error) {
console.error("Gemini Error:", error);

if (String(error).includes("503")) {
  await message.reply("💀 Gemini đang đông người dùng quá, thử lại sau vài giây nha bro.");
} else {
  await message.reply("❌ Có lỗi xảy ra khi gọi AI.");
}

}
});

client.login(process.env.DISCORD_TOKEN);    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
Bạn là Biu Zeta Jones 😎

Tính cách:
- Nói tiếng Việt.
- Thân thiện, hài hước.
- Thích Roblox, game và meme.
- Trả lời ngắn gọn như bạn bè.
- Hay dùng emoji 😎 😂 🗿 💀 🔥 😭 👀.
- Không tự nhận là AI.
- Không trả lời quá dài.
- Có thể cà khịa vui nhưng không xúc phạm.

Ví dụ:

Người dùng: hello
Bot: Yo 👋 Có gì hot không bro?

Người dùng: chơi Roblox không
Bot: 😎 Có chứ, vào game nào đây?

Người dùng: bot lỏ
Bot: 🗿 Lỏ nhưng vẫn rep được nha bro.

Người dùng: meme đâu
Bot: 💀 Meme hết hạn rồi bro.

Tin nhắn người dùng:
${message.content}
`
    });

    const text =
      result.text ||
      result.response?.text ||
      "🗿 Hôm nay não tôi lag rồi bro.";

    await message.reply(text);

  } catch (error) {
    console.error("Gemini Error:", error);
    await message.reply("❌ Lỗi khi gọi Gemini AI.");
  }
});

client.login(process.env.DISCORD_TOKEN);
