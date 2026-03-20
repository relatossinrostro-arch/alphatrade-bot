require('dotenv').config()

const { Telegraf, Markup } = require('telegraf')

const bot = new Telegraf(process.env.BOT_TOKEN)

// Handle /start - Show menu
bot.start(async (ctx) => {
  await ctx.reply(
    "Bienvenido a AlphaTrade 🚀",
    Markup.keyboard([
      ['🌐 Abrir Plataforma'],
      ['💰 Depositar USDT', '📊 Mi inversión'],
      ['💸 Retirar', '👥 Referidos']
    ]).resize()
  )
})

// Handle "🌐 Abrir Plataforma" button
bot.hears('🌐 Abrir Plataforma', async (ctx) => {
  const id = ctx.from.id
  const url = `http://147.93.181.40:3000/?user_id=${id}`

  await ctx.reply(
    "🚀 Accede a la plataforma 👇",
    Markup.inlineKeyboard([
      [Markup.button.url("🎰 Entrar a la plataforma", url)]
    ])
  )
})

// Additional handlers for the menu buttons
bot.hears('💰 Depositar USDT', async (ctx) => {
  await ctx.reply("💳 Envíe USDT a la siguiente dirección:\n\nTRC20: TU_WALLET_AQUI")
})

bot.hears('📊 Mi inversión', async (ctx) => {
  await ctx.reply("📊 Tu inversión actual: 0 USDT")
})

bot.hears('💸 Retirar', async (ctx) => {
  await ctx.reply("💸 Para retirar, escribe el monto que deseas retirar.")
})

bot.hears('👥 Referidos', async (ctx) => {
  const id = ctx.from.id
  const link = `https://t.me/AlphaTrade_Bot?start=${id}`
  await ctx.reply(`👥 Tu link de referido:\n${link}`)
})

bot.launch()

console.log("BOT RUNNING with full menu integration")

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
