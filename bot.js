require('dotenv').config()

const { Telegraf, Markup } = require('telegraf')
const axios = require('axios')

const bot = new Telegraf(process.env.BOT_TOKEN)

// Main Menu Keyboard
const mainMenu = Markup.keyboard([
  ['🌐 Abrir Plataforma'],
  ['💰 Depositar USDT', '📊 Mi inversión'],
  ['💸 Retirar', '👥 Referidos'],
  ['📈 Ranking', '📊 Estadísticas'],
  ['ℹ️ Información', '📞 Soporte'],
  ['🎬 Videos', '🔄 Reiniciar']
]).resize();

bot.start(async (ctx) => {
  try {
    const id = ctx.from.id
    console.log("User started:", id)

    await ctx.reply(
      "🚀 Bienvenido a AlphaTrade\n\nPresiona para entrar 👇",
      mainMenu
    )

  } catch (err) {
    console.log("ERROR:", err)
  }
})

// --- MENU HANDLERS ---

bot.hears('🌐 Abrir Plataforma', async (ctx) => {
  try {
    const telegram_id = ctx.from.id
    const url = `http://147.93.181.40:3000/?user_id=${telegram_id}`

    await ctx.reply(
      "🚀 Accede a la plataforma aquí 👇",
      Markup.inlineKeyboard([
        [Markup.button.url("🎰 Entrar a la plataforma", url)]
      ])
    )
  } catch (err) {
    console.log("ERROR HEARING WEB:", err)
  }
})

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
  const link = `https://t.me/AlphaTrade_Bot?start=${id}` // Updated to match bot name context

  await ctx.reply(`👥 Tu link de referido:\n${link}`)
})

bot.hears('📈 Ranking', async (ctx) => {
  await ctx.reply("🏆 Ranking próximamente...")
})

bot.hears('📊 Estadísticas', async (ctx) => {
  await ctx.reply("📊 Estadísticas próximamente...")
})

bot.hears('ℹ️ Información', async (ctx) => {
  await ctx.reply("ℹ️ Plataforma AlphaTrade - Inversiones automatizadas.")
})

bot.hears('📞 Soporte', async (ctx) => {
  await ctx.reply("📞 Contacta soporte: @AlphaTradeSupport")
})

bot.hears('🎬 Videos', async (ctx) => {
  await ctx.reply("🎬 Videos próximamente...")
})

bot.hears('🔄 Reiniciar', async (ctx) => {
  await ctx.reply("🔄 Reiniciado. Escribe /start")
})

bot.launch()

console.log("✅ BOT RUNNING with all menu handlers.")

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
