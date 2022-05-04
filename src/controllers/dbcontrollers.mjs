import { db } from "../models/luawaveDB.mjs";

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
    let prop = "?";
    for (let idx= 1; idx < newValues.length; idx++){
        prop = prop +",?"
    }
    const sql = `
        INSERT INTO ${table} (${labels})
        VALUES (${prop});
    `;
    db.run(sql,newValues,callback);
}

export function getIt (keys, table, callback ) {
    db.all(`SELECT ${keys} FROM ${table}`, callback);
}   

export function deleteIt (table, value, value2 ){
    db.run(`DELETE FROM ${table} 
    WHERE ${value} = "${value2}"`
    )
}

export function updateIt(table, id, item){
    const newLabels = Object.keys(item);
    const newValues = Object.values(item);
    const updatedate = [];
    for (let idx= 0; idx < newLabels.length; idx++){
        updatedate[idx] = newLabels[idx]+" = "+ "?"
    }
    const prop = updatedate.join(",")
    const sql = `UPDATE ${table}
        SET ${prop}
        WHERE id = ${id};`;
    db.run(sql,newValues)
}

export function sqlCallback (error, data) {
    console.log("error:", error, "data:", data);
    if ( error ) throw error;
}