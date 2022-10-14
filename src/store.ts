import { PairisStore, persist, Model } from '../deps.ts'

const store = new PairisStore(sessionStorage)

@persist(store)
class StoredModel extends Model { }
export { store, StoredModel }
