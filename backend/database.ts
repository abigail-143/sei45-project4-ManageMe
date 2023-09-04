import { Pool } from "pg";

export const pool = new Pool({
    user: 'db_user',
    password: 'example',
    host: "localhost",
    port: 5432,
    database: 'manageme'
})
