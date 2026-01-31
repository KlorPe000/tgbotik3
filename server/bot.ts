
import { Telegraf } from "telegraf";

let bot: Telegraf | null = null;

export async function setupBot() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    throw new Error("TELEGRAM_BOT_TOKEN environment variable is required");
  }
  bot = new Telegraf(token);

  bot.command("start", async (ctx) => {
    try {
      await ctx.replyWithInvoice({
        title: "Бот",
        description: "Оплатите 3 звезды что бы получить доступ.",
        payload: `access_fee_${ctx.from.id}`,
        currency: "XTR",
        prices: [{ label: "Активация", amount: 3 }],
        provider_token: "",
      });

    } catch (error) {
      console.error("Error in start command:", error);
      await ctx.reply("Произошла ошибка. Пожалуйста, попробуйте позже.");
    }
  });

  bot.on("pre_checkout_query", async (ctx) => {
    await ctx.answerPreCheckoutQuery(true);
  });

  bot.on("successful_payment", async (ctx) => {
    await ctx.reply("Оплата прошла успешно! Теперь у вас есть доступ.");
  });

  bot.launch().catch((err) => {
    console.error("Failed to launch bot:", err);
  });

  process.once("SIGINT", () => bot?.stop("SIGINT"));
  process.once("SIGTERM", () => bot?.stop("SIGTERM"));
}
