import { IdbServices } from "../../shared/infra/db/Idb.services";
import MysqlDbServices from "../../shared/infra/db/mysql/mysqlDB.services";
import { User } from "../entities/user.entity";

export class UsersRepository {

  private static readonly CONNECTION: IdbServices = new MysqlDbServices();

  public static async getAll(): Promise<User[]> {

    const sql = `SELECT * FROM tb_usuarios;`;
    await this.CONNECTION.connect();
    const rows = await this.CONNECTION.execute(sql);
    await this.CONNECTION.disconnect();

    if (rows && rows.length > 0) {
      const users: User[] = rows.map((row: any) => {
        return User.fromDataRow(row);
      });
      return users;
    }
    else {
      return [];
    }
  }

  public static async getById(id: string): Promise<User | null> {

    const sql = `SELECT * FROM tb_usuarios WHERE usuario_id = ?`;
    const bindParams = [id];

    await this.CONNECTION.connect();
    const rows = await this.CONNECTION.executeWithParams(sql, bindParams);
    await this.CONNECTION.disconnect();

    if (rows[0]) {
      return User.fromDataRow(rows[0]);
    }
    else {
      return null;
    }
  }
}