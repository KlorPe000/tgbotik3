import { setupBot } from "./bot.js";

(async () => {
  try {
    console.log("[Bot] Запускаем Телеграм бота...");
    await setupBot();
    console.log("[Bot] Телеграм бот успешно запущен.");
  } catch (error) {
    console.error("[Bot] Ошибка запуска бота:", error);
    process.exit(1);
  }
})();
