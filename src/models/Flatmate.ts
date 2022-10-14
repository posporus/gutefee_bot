import { PairisStore, persist, Model } from '../../deps.ts'
import { StoredModel, store } from '../store.ts'
import { WG } from './WG.ts'
import { Vacation } from './Vacation.ts'

//@persist(store)
class Flatmate extends Model {
    static list = 'flatmates'
    name!: string
    wgId!: string
    telegram!: number
    wg!: WG
    vacations!: Vacation[]

    static newFromTelegram (id?: number) {
        const find = id ? this.where('telegram', id) : []
        console.log('FIND:', find)
        if (find.length > 0)
            return this.use(find[0].uid)
        else return this.use()
    }

}
Flatmate.introduce()

export { Flatmate }