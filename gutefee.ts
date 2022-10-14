import "https://deno.land/x/dotenv@v3.2.0/load.ts"
import { cron, daily, monthly, weekly, everyMinute } from "https://deno.land/x/deno_cron@v1.0.0/cron.ts"

const BOT_TOKEN = Deno.env.get("BOT_TOKEN"), GROUP_ID = Deno.env.get("GROUP_ID")

import { Bot } from './deps.ts'

const bot = new Bot(BOT_TOKEN || '')

await bot.api.sendMessage(+(GROUP_ID || 0), '👋')

weekly(() => {
    remindingMessage()
},0)

const remindingMessage = async () => {
    await bot.api.sendMessage(+(GROUP_ID || 0), reminderText())
}


const reminderText = () => {
    const greeting = randomVariation(greedingVariations)
    const mainMessage = randomVariation(mainMessageVariations)
    const bye = randomVariation(byeVariations)
    return `${greeting}\n${mainMessage}\n${bye}
        `
}

const greedingVariations = [
    'Hello Guys!',
    'Dear loveled WG!',
    'Loved Emanuelf!',
    'Hey Peeps!',
    'Hey sweeties!',
    'Salut!',
    'Schalom!'
]

const byeVariations = [
    'Byebye!',
    'See you next week!',
    'I wish you a pleseant week!',
    'I wish you a good start into the week!',
    'I hope you have a pleasant week!',
    'See you next time!'
]

const mainMessageVariations = [
    'I\'m here to remind you to clean ;)',
    'Have you guys the Putzplan in mind?',
    'Putztime guys!',
    'Its sunday again! you know what that means ;)',
    'Does erverybody know what to clean this week?'
]

/**
 * randomly return one item from a given array
 */
const randomVariation = (variations:string[]) => {
    return variations[Math.floor(Math.random() * variations.length)]
}