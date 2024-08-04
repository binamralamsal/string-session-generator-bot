import { Bot, webhookCallback } from "grammy";
import { env } from "./env";
import express from "express";

const bot = new Bot(env.BOT_TOKEN);

export const app = express();

app.use(express.json());
app.use(webhookCallback(bot, "express"));

bot.command("start", (ctx) =>
  ctx.reply(
    "This bot is for creating string session for javascript using gramjs"
  )
);
