import { db } from "../models/db.mjs";

export function findIt (table, value, value2, callback ) {
    db.get(`
        SELECT id
        FROM ${table}
        WHERE ${value} = "${value2}"
        `,
        callback
    )
}

export function insertIt ( object, table, callback ) {
    const newLabels = Object.keys(object);
    const newValues = Object.values(object);
    const labels = newLabels.join(", ") ;
    let values = "";
    newValues.forEach(item=>values += JSON.stringify(item));
    
    const sql = `
        INSERT INTO ${table} (${labels})
        VALUES ("${values}");
    `;
    db.run(sql,callback);
}

export function getIt (keys, table, callback ) {
    db.all(`SELECT ${keys} FROM ${table}`, callback);
}   

export function deleteClient (value, value2 , table){
    db.run(`DELETE FROM ${table} 
    WHERE ${value} = "${value2}"`
    )
}
