import { IdbServices } from "../../shared/infra/db/Idb.services";
import MysqlDbServices from "../../shared/infra/db/mysql/mysqlDB.services";
import { Facility } from "../entities/facility.entity";

export class FacilitiesRepository {

  private static readonly CONNECTION: IdbServices = new MysqlDbServices();

  public static async getAll(): Promise<Facility[]> {

    const sql = `SELECT * FROM tb_espacos;`;
    await this.CONNECTION.connect();
    const rows = await this.CONNECTION.execute(sql);
    await this.CONNECTION.disconnect();

    if (rows && rows.length > 0) {
      const facilities: Facility[] = rows.map((row: any) => {
        return Facility.fromDataRow(row);
      })
      return facilities;
    }
    else {
      return [];
    }
  }

  public static async getById(id: string): Promise<Facility | null> {

    const sql = `SELECT * FROM tb_espacos WHERE espaco_id = ?;`;
    const bindParams = [id];

    await this.CONNECTION.connect();
    const rows = await this.CONNECTION.executeWithParams(sql, bindParams);
    await this.CONNECTION.disconnect();

    if (rows[0]) {
      return Facility.fromDataRow(rows[0]);
    }
    else {
      return null;
    }
  }

  public static async create(facility: Facility): Promise<void> {
    const sql = `INSERT INTO tb_espacos (
                  espaco_id, 
                  bloco_id, 
                  tipo_espaco_id, 
                  esta_ativo, 
                  nome_espaco, 
                  capacidade, 
                  observacao, 
                  data_hora_alteracao, 
                  data_hora_criacao)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    const bindParams = [
      facility.facilityId,
      facility.buildingId,
      facility.facilityTypeId,
      facility.isActive,
      facility.facilityName,
      facility.capacity,
      facility.note,
      facility.updatedDate,
      facility.createdDate
    ];

    await this.CONNECTION.connect();
    await this.CONNECTION.executeWithParams(sql, bindParams);
    await this.CONNECTION.disconnect();
  }

  public static async update(facility: Facility): Promise<void> {
    const sql = `UPDATE tb_espacos SET  
                  bloco_id = ?,
                  tipo_espaco = ?, 
                  esta_ativo = ?,
                  nome_espaco = ?,
                  capacidade = ?,
                  observacao = ?,
                  data_hora_alteracao = ?,
                 WHERE escola_id = ?;`;

    const bindParams = [
      facility.buildingId,
      facility.facilityTypeId,
      facility.isActive,
      facility.facilityName,
      facility.capacity,
      facility.note,
      new Date(),
      facility.facilityId
    ];

    await this.CONNECTION.connect();
    await this.CONNECTION.executeWithParams(sql, bindParams);
    await this.CONNECTION.disconnect();
  }
}
