import sqlite3 from 'sqlite3';

export const db = new sqlite3.Database('./luawave.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the chat database.');
});

db.run(`
    CREATE TABLE
        IF NOT EXISTS
        clients(
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            dni TEXT NOT NULL,
            phone TEXT NOT NULL,
            address TEXT NOT NULL,
            cp TEXT NOT NULL
        )
`);

db.run(`
    CREATE TABLE
        IF NOT EXISTS
        articles (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            description TEXT NOT NULL,
            stock VALUE NOT NULL,
            photo TEXT NOT NULL,
            price VALUE NOT NULL
        )
`);

