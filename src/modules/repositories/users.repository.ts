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

  public static async getByEmail(email: string): Promise<User | null> {
    const sql = `SELECT * FROM tb_usuarios WHERE email = ?`;
    const bindParams = [email];

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

  public static async createUser(user : User): Promise<void> {
    const sql = `INSERT INTO TB_USUARIOS (usuario_id, escola_id, email, senha, nome_usuario, tipo_usuario, esta_ativo, data_hora_criacao, data_hora_alteracao)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const bindParams = [user.userId, user.schoolId, user.email, user.password, user.name, user.userType, user.isActive, user.createdDate, user.updatedDate];

    await this.CONNECTION.connect();
    await this.CONNECTION.executeWithParams(sql, bindParams);
    await this.CONNECTION.disconnect();
  }

  public static async updateUser(user : User): Promise<void> {
    const sql = `UPDATE TB_USUARIOS  
                 SET escola_id = ?, esta_ativo = ?, tipo_usuario = ? 
                 WHERE usuario_id = ?`;

    const bindParams = [user.schoolId, user.isActive, user.userType, user.userId];

    await this.CONNECTION.connect();
    await this.CONNECTION.executeWithParams(sql, bindParams);
    await this.CONNECTION.disconnect();
  }
}