import { Bot, Context, webhookCallback, session } from "grammy";
import { freeStorage } from "@grammyjs/storage-free";
import { env } from "./env";
import express from "express";
import {
  type Conversation,
  type ConversationFlavor,
  conversations,
  createConversation,
} from "@grammyjs/conversations";

const bot = new Bot<MyContext>(env.BOT_TOKEN);

bot.command("asdf1", (ctx) =>
  ctx.reply(
    "This bot is for creating string session for javascript using gramjs. Use /generate command to start."
  )
);
bot.use(
  session({
    initial() {
      return {};
    },
    storage: freeStorage(bot.token),
  })
);
bot.command("asdf2", (ctx) =>
  ctx.reply(
    "This bot is for creating string session for javascript using gramjs. Use /generate command to start."
  )
);

bot.use(conversations);
bot.command("asdf3", (ctx) =>
  ctx.reply(
    "This bot is for creating string session for javascript using gramjs. Use /generate command to start."
  )
);
bot.use(createConversation(greeting));

bot.command("start", (ctx) =>
  ctx.reply(
    "This bot is for creating string session for javascript using gramjs. Use /generate command to start."
  )
);

bot.command("generate", async (ctx) => {
  await ctx.conversation.enter("greeting");
});

const app = express();

app.use(express.json());
app.use(webhookCallback(bot, "express"));

export default app;

type MyContext = Context & ConversationFlavor;
type MyConversation = Conversation<MyContext>;

async function greeting(conversation: MyConversation, ctx: MyContext) {
  await ctx.reply("How many favorite movies do you have?");
  const count = await conversation.form.number();
  const movies: string[] = [];
  for (let i = 0; i < count; i++) {
    await ctx.reply(`Tell me number ${i + 1}!`);
    const titleCtx = await conversation.waitFor(":text");
    movies.push(titleCtx.msg.text);
  }
  await ctx.reply("Here is a better ranking!");
  movies.sort();
  await ctx.reply(movies.map((m, i) => `${i + 1}. ${m}`).join("\n"));
}
