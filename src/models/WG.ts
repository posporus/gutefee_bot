import {StoredModel} from '../store.ts'
import { Flatmate } from './Flatmate.ts'
class WG extends StoredModel {
    static list = 'wgs'
    name!: string
    flatmates!:Flatmate[]
}
WG.introduce()
export { WG }