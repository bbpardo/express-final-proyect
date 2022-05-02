import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./chat.db', (err) => {
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

export function sqlCallback (error, data) {
    console.log("error:", error, "data:", data);
    if ( error ) throw error;
}

export function findClient (dni, callback ) {
    db.get(`
        SELECT id
        FROM clients
        WHERE dni = "${dni}"
        `,
        callback
    )
}

export function insertClient ( clientObject, callback ) {
    const { id, name, dni, phone, address, cp } = clientObject;
    const sql = `
        INSERT INTO clients (id, name, dni, phone, address, cp)
        values (${id}, "${name}", "${dni}", "${phone}", "${address}", "${cp}");
    `;
    db.run(sql,callback);
}

export function getClients ( callback ) {
    db.all("SELECT id, name, dni, phone, address, cp FROM clients", callback);
}

export function deleteClient (id){
    db.run(`DELETE FROM clients 
    WHERE id = "${id}"`
    )
}

export function updateClient(id, clientObject){
    const {name, dni, phone, address, cp } = clientObject;
    db.run(`UPDATE clients
        SET name = '${name}',
            phone = '${phone}',
            dni= '${dni}',
            address = '${address}',
            cp = '${cp}'
        WHERE id = ${id};`
        )
}

export function findArticle (id, callback ) {
    db.get(`
        SELECT id
        FROM articles
        WHERE id = "${id}"
        `,
        callback
    )
}

export function insertArticle ( clientObject, callback ) {
    const { id, name, description, stock, photo, price } = clientObject;
    const sql = `
        INSERT INTO articles (id, name, description, stock, photo, price)
        values (${id}, "${name}", "${description}", "${stock}", "${photo}", "${price}");
    `; 
    db.run(sql,callback);
}

export function getArticles ( callback ) {
    db.all("SELECT id, name, description, stock, photo, price FROM articles", callback);
}

export function deleteArticle (id){
    db.run(`DELETE FROM articles 
    WHERE id = "${id}"`
    )
}

export function updateArticle(id, articleObject){
    const {name, description, photo, stock, price } = articleObject;
    db.run(`UPDATE articles
        SET name = '${name}',
            description = '${description}',
            photo= '${photo}',
            stock = '${stock}',
            price = '${price}'
        WHERE id = ${id};`
        )
}

export default db;