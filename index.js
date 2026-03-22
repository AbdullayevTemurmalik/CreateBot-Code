const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const app = express();

// Siz bergan token shu yerga qo'yildi
const token = "8604869966:AAEjp2d-fOVftE6Me_4JKYa-N-WV9JQwCDg";

const bot = new TelegramBot(token, { polling: true });

// /start buyrug'i bosilganda tugma chiqarish
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Salom do'stim! Tugmani bosing:", {
    reply_markup: {
      inline_keyboard: [[{ text: "Tugmacha", callback_data: "mening_tugmam" }]],
    },
  });
});

// Tugma bosilganda javob qaytarish
bot.on("callback_query", (query) => {
  if (query.data === "mening_tugmam") {
    bot.sendMessage(query.message.chat.id, "Abdullayev Otabek");
  }
});

// Serverni yaratish (Hosting xato bermasligi uchun)
app.get("/", (req, res) => {
  res.send("Bot muvaffaqiyatli ishlayapti!");
});

// Portni sozlash
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server ${PORT}-portda ishga tushdi`);
});
