import Dexie from 'dexie';

const db = new Dexie('db-naskahku');
db.version(1).stores({
  naskah: '++id, judul, produksi, penulis, content, createdAt, updatedAt, lock',
});

db.open()

export default db;