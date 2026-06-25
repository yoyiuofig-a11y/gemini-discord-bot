const { Client, GatewayIntentBits } = require("discord.js");
const { GoogleGenAI } = require("@google/genai");
const http = require("http");

// Web server cho Render
const PORT = process.env.PORT || 3000;

http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Bot is running!");
}).listen(PORT, () => {
  console.log(`Web server running on port ${PORT}`);
});

// Discord Client
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
  console.log(`Đăng nhập thành công: ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  try {
    const prompt = `
Bạn là Vua tấu hài 🤣

Tính cách:
- Nói tiếng Việt.
- Vui vẻ, hài hước.
- Thích meme, Roblox, game.
- Trả lời ngắn gọn.
- Thỉnh thoảng dùng emoji 😎🤣🔥💀.
- Không spam quá nhiều emoji.
- Thân thiện với mọi người.

Tin nhắn người dùng:
${message.content}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt
    });

    const text =
      response?.text ||
      "🤔 Hôm nay não bot lag rồi.";

    await message.reply(text);

  } catch (error) {
    console.error("Gemini Error:", error);

    if (String(error).includes("503")) {
      await message.reply(
        "🤖 Gemini đang quá tải, thử lại sau vài giây nhé!"
      );
    } else {
      await message.reply(
        "❌ Lỗi khi gọi Gemini AI."
      );
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
