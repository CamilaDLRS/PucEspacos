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
        host:"localhost",
        port:  3306,
        user: "root",
        database:  "pucEspacos"
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
      const result = await this.connection!.query(sql);
      return result[0];
    } catch (error: any) {
      console.error("Error executing SQL query:", error.message);
      throw error;
    }
  }

  async executeWithParams(sql: string, bindParams: any, options: any): Promise<any> {
    try {
      const result = await this.connection!.execute(sql, bindParams);
      return result[0];
    } catch (error: any) {
      console.error("Error executing SQL query with params:", error.message);
      throw error;
    }
  }
}

export default MysqlDbServices;
