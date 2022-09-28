import { openDB } from 'idb';

const initdb = async () =>
  openDB('JATE', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('JATE')) {
        console.log('JATE database already exists');
        return;
      }
      db.createObjectStore('JATE', { keyPath: 'id', autoIncrement: true });
      console.log('JATE database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to database');
  const jateDb = await openDB('JATE', 1);
  const transaction = jateDb.transaction('JATE', 'readwrite');
  const store = transaction.objectStore('JATE');
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log("Data saved to database");
  console.log("Result", result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET all from database');
  const jateDb = await openDB('JATE', 1);
  const transaction = jateDb.transaction('JATE', 'readonly');
  const store = transaction.objectStore('JATE');
  const request = store.getAll();
  const result = await request;
  console.log('Data taken from database')
  console.log('Result', result)
  return result;
}

initdb();