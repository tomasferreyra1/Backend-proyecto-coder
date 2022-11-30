//Container
import { options } from "./options"
import knex from "knex"
const connectionMySql = knex(options.mysql)
const connectionSqlite3 = knex(options.sqlite3)

export const mysqlFunc = () => {
    connectionMySql.schema.hasTable('productos').then((exists) => {
        if (!exists) {
            connectionMySql.schema.createTable('productos', (table) => {
                table.increments('id').primary
                table.string('title', 50).notNullable()
                table.float('price')
                table.string('thumbnail', 200)
            }).then(() => console.log('Tabla creada con exito'))
                .catch((error) => console.log(error));
        }
    });
}

export const sqlite3Func = () => {
    connectionSqlite3.schema.hasTable('mensajes').then((exists) => {
        if (!exists) {
            connectionSqlite3.schema.createTable('mensajes', (table) => {
                table.increments('id').primary
                table.string('email', 40).notNullable()
                table.string('message', 200).notNullable()
                table.string('date', 100).notNullable()
            }).then(() => console.log('Tabla creada con exito'))
                .catch((error) => console.log(error));
        }
    });
}