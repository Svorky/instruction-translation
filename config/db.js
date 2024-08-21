import knex from "knex";
import { configDotenv } from "dotenv";

configDotenv();
const { PGHOST, PGPORT, PGUSER, PGDATABASE, PGPASSWORD } = process.env;

export const db =
    knex( {
        client: "pg",
        connection: {
            host: PGHOST,
            port: Number(PGPORT),
            user: PGUSER,
            database: PGDATABASE,
            password: PGPASSWORD,
            ssl: { rejectUnauthorized: false },
        },
    } );
