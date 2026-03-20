require('dotenv').config()

const { Telegraf, Markup } = require('telegraf')
const axios = require('axios')

const bot = new Telegraf(process.env.BOT_TOKEN)

const API_URL = 'http://localhost:3001'
const WEB_URL = 'http://147.93.181.40:3000'

bot.start(async (ctx) => {
  try {
    const telegram_id = ctx.from.id.toString()
    const username = ctx.from.username || 'Usuario'

    await axios.post(`${API_URL}/user/create`, {
      telegram_id,
      username
    })

    const url = `${WEB_URL}/?user_id=${telegram_id}`

    await ctx.reply(
      "🚀 Bienvenido a AlphaTrade\n\nPresiona para entrar 👇",
      Markup.inlineKeyboard([
        [Markup.button.url("🎰 Entrar a la plataforma", url)]
      ])
    )

  } catch (error) {
    console.log(error.message)
  }
})

// /web command to quickly open the platform
bot.command('web', async (ctx) => {
  const url = "http://147.93.181.40:3000"

  await ctx.reply(
    "🚀 Accede a la plataforma aquí 👇",
    Markup.inlineKeyboard([
      [Markup.button.url("🎰 Open Platform", url)]
    ])
  )
})

bot.launch()
