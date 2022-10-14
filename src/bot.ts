
import { Bot, Router, session, Context/* , v4 */ } from '../deps.ts'
import { store } from './store.ts'
import type { SessionFlavor } from '../deps.ts'
import { Flatmate } from './models/Flatmate.ts'
console.log(localStorage)

interface SessionData {
    route: "newFlatmate" | "move_in" | "idle"
    flatmate?: Flatmate
    //wgUid:string | null
}

type GuteFee = Context & SessionFlavor<SessionData>

const bot = new Bot<GuteFee>(Deno.env.get("BOT_TOKEN") || '')

//log the store after each interaction
bot.use(() => console.log(store))


bot.use(session({ initial: (): SessionData => ({ route: "idle" }) }))

bot.command("start", (ctx) => {
    ctx.session.flatmate = Flatmate.newFromTelegram(ctx.from?.id)
    console.log(localStorage)
    //ctx.reply(`cool, you are Flatmate ${ctx.session.flatmate?.uid}`)
    if (!ctx.session.flatmate.name) {
        ctx.reply(`Please let me know your name`)
        ctx.session.route = 'newFlatmate'
    }
    else ctx.reply(`welcome back, ${ctx.session.flatmate.name}`)

})

bot.command('test', ctx => {
    Flatmate.use().set({ name: 'testname' })
    console.log(Flatmate.all())
})

bot.command("move_in", async (ctx) => {
    if (!ctx.match) await ctx.reply('Where would you move in? (wg_id)')
    console.log('moving in', ctx.match)
})

bot.command("new_wg", (ctx) => {
    ctx.reply('')
    console.log('moving out')
})

bot.command("manage_wg", (ctx) => {
    ctx.reply('')
    console.log('moving out')
})

const router = new Router<GuteFee>((ctx) => ctx.session.route)
router.route("newFlatmate", async (ctx) => {
    ctx.session.flatmate?.set({
        name: ctx.msg?.text
    })

    await ctx.reply('Got it! You are' + ctx.session.flatmate?.name);
})


/* router.route("move_in", async (ctx) => {

    ctx.msg
    const day = parseInt(ctx.msg?.text ?? "", 10);
    if (isNaN(day) || day < 1 || 31 < day) {
      await ctx.reply("That is not a valid day, try again!");
      return;
    }

    ctx.session.step = "month";
    await ctx.reply("Got it! Now, send me the month!");
  }) */

bot.use(router)
bot.start()