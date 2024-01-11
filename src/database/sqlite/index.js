import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default async function sqliteConnection() {
  const database = await open({
    filename: path.resolve(__dirname, '..', 'database.db'),
    driver: sqlite3.Database,
  });

  return database;
}
