import Dexie from 'dexie'

const db = new Dexie('db')
db.version(1).stores({
  profiles: '++id, [name+email+title+address+avatar]',
})

export default db
