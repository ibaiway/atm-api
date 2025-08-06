import sqlite3 from "sqlite3"
import { open, Database } from "sqlite"

sqlite3.verbose()

let db: Database

export async function initDB() {
  db = await open({
    filename: "./dev.db",
    driver: sqlite3.Database,
  })

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    );
  `)

  await db.exec(`
    CREATE TABLE IF NOT EXISTS accounts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL REFERENCES users(id),
      name TEXT NOT NULL,
      balance INTEGER NOT NULL
    );
  `)

  await db.exec(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      account_id INTEGER NOT NULL REFERENCES accounts(id),
      amount INTEGER NOT NULL,
      type TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
  `)

  await db.exec(`
    CREATE TABLE IF NOT EXISTS cards (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      account_id INTEGER NOT NULL REFERENCES accounts(id),
      name TEXT NOT NULL,
      number TEXT NOT NULL,
      enabled_at TEXT,
      pin TEXT NOT NULL
    );
  `)

  return db
}

export function getDB(): Database {
  if (!db) throw new Error("Database not initialized. Call initDB() first.")
  return db
}
