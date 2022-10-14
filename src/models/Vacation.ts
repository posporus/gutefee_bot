import {StoredModel} from '../store.ts'
import { Flatmate } from './Flatmate.ts'
enum VacationAction { LEAVE, ARRIVE }
class Vacation extends StoredModel {
    static list = 'wgs'
    time!: Date
    action!: VacationAction
    flatmateId!: string
    flatmate!:Flatmate
}
export {
    Vacation,
    VacationAction
}