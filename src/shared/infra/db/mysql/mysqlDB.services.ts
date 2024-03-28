import { Connection, createConnection } from "mysql2/promise";
import { IdbServices } from "../Idb.services";

class MysqlDbServices implements IdbServices {
  private connection: Connection | null;

  constructor() {
    this.connection = null;
  }

  async connect(): Promise<void> {
    try {
      this.connection = await createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "puc_espacos",
      });
      console.log("Connected to MySQL database");
    } catch (error: any) {
      console.error("Error connecting to MySQL database:", error.message);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    if (this.connection) {
      try {
        await this.connection.end();
        console.log("Disconnected from MySQL database");
      } catch (error: any) {
        console.error(
          "Error disconnecting from MySQL database:",
          error.message
        );
        throw error;
      }
    }
  }

  async execute(sql: string): Promise<any> {
    try {
      const rows = await this.connection!.query(sql);
      return rows;
    } catch (error: any) {
      console.error("Error executing SQL query:", error.message);
      throw error;
    }
  }

  async executeWithParams(
    sql: string,
    bindParams: any,
    options: any
  ): Promise<any> {
    try {
      const rows = await this.connection!.execute(sql, bindParams);
      return rows;
    } catch (error: any) {
      console.error("Error executing SQL query with params:", error.message);
      throw error;
    }
  }
}

export default MysqlDbServices;
