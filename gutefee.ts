import { Bot } from './deps.ts'
import { BOT_TOKEN, GROUP_ID } from './env.ts'

export class Gutefee extends Bot {
    constructor(){
        super(BOT_TOKEN || '')
    }
    async doWink(){
        await this.api.sendMessage(+(GROUP_ID || 0), '👋')
    }
    async sendReminderMessage(){
        await this.api.sendMessage(+(GROUP_ID || 0), generateReminderText())
    }
}

const generateReminderText = () => {
    const greeting = randomVariation(greedingVariations)
    const mainMessage = randomVariation(mainMessageVariations)
    const bye = randomVariation(byeVariations)
    return `${greeting}\n${mainMessage}\n${bye}
    `
}

const randomVariation = (variations: string[]) => {
    return variations[Math.floor(Math.random() * variations.length)]
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
