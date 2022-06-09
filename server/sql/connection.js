import dotenv from "dotenv";
dotenv.config();
import { createPool } from "mysql";

class Connection {
  constructor() {
    if (!this.pool) {
      console.log("creating mysql connection...");
      this.pool = createPool({
        connectionLimit: 100,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        multipleStatements: true,
      });

      return this.pool;
    }

    return this.pool;
  }
}

const instance = new Connection();

export default instance;
