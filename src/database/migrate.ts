import { SQLiteDatabase } from "expo-sqlite";
export async function migrate(db: SQLiteDatabase) {
await db.execAsync(`
        PRAGMA foreign_keys = ON;

        CREATE TABLE IF NOT EXISTS metas (
        id         INTEGER PRIMARY KEY AUTOINCREMENT,
        name       TEXT  NOT NULL,
        target     FLOAT NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS transactions (
        id         INTEGER PRIMARY KEY AUTOINCREMENT,
        meta_id    INTEGER NOT NULL,
        title      TEXT    NOT NULL,
        value      FLOAT   NOT NULL,
        type       TEXT    NOT NULL CHECK(type IN ('input', 'output')),
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_meta_transaction
            FOREIGN KEY (meta_id)
            REFERENCES metas(id)
            ON DELETE CASCADE
        );
        
    `);
}