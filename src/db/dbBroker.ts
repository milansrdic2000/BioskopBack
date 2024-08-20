import sql, {
  ConnectionPool,
  IResult,
  ISOLATION_LEVEL,
  Transaction,
} from "mssql";
import {
  ColumnSchema,
  EntitySchema,
  JoinMeta,
} from "../models/entitySchema.js";
import { formatDate, formatDateTime } from "../utils/date-helper.js";
import createHttpError from "http-errors";
import { getDbColumn, getDbColumnName } from "../models/helper.js";
const config = {
  user: "sa",
  password: "MyPass@word",
  server: "127.0.0.1",
  database: "Bioskop",
  options: {
    encrypt: true,
    connectionisolationLevel: 0,
    trustServerCertificate: true, // Only use on local or self-signed certificates
  },
};
export interface DbResponse {
  recordset: any[];
  rowsAffected: [number];
  output: Record<string, any>;
}
export const hello = "hi mom!";
export class DBBroker {
  private static _instance: DBBroker = null;
  private connectionPool: ConnectionPool;
  public transaction: Transaction;
  private constructor() {}

  public static getInstance(): DBBroker {
    try {
      if (this._instance === null) {
        this._instance = new DBBroker();
      }
      return this._instance;
    } catch (err) {
      console.error(err);
    }
  }
  public async openConnection() {
    try {
      this.connectionPool = await sql.connect(config);
    } catch (err) {
      console.error(err);
    }
  }
  public async closeConnection() {
    try {
      await this.connectionPool.close();
    } catch (err) {
      return err;
    }
  }
  public async beginTransaction() {
    this.transaction = new sql.Transaction(this.connectionPool);
    await this.transaction.begin(sql.ISOLATION_LEVEL.READ_COMMITTED);
  }
  public async commit() {
    if (!this.transaction) return;
    await this.transaction.commit();
    this.transaction = null;
  }
  public async rollback() {
    if (!this.transaction) return;
    await this.transaction.rollback();
    this.transaction = null;
  }
  private getFieldsForSchema(entitySchema: EntitySchema<any>): string {
    let sql = "";
    entitySchema.columns.forEach((item, index) => {
      if (item.hide) return;
      sql += ` ${entitySchema.tableAlias}.${
        item.getter ? item.getter : String(item.name)
      } `;
      sql += ` as "${item.alias ? item.alias : String(item.name)}" `;

      if (index < entitySchema.columns.length - 1) {
        sql += " , ";
      }
    });
    return sql;
  }
  private getWhereQuery(
    entitySchema: EntitySchema<any>,
    forJoin: boolean = false
  ): string {
    let sql = "";
    const criteria = entitySchema.filter;
    sql += forJoin ? " AND " : " WHERE ";
    Object.keys(criteria).forEach((key, index) => {
      const databaseColumn: ColumnSchema<any> = getDbColumn(key, entitySchema);
      const databaseColumnName = getDbColumnName(key, entitySchema);
      sql += `${entitySchema.tableAlias}.${databaseColumnName} `;
      sql += ` ${databaseColumn.operator || "="} `;
      if (databaseColumn.rightValue) {
        sql += ` ${databaseColumn.rightValue} `;
      } else if (typeof criteria[key] === "string") {
        sql += `'${criteria[key]}'`;
      } else if (criteria[key] instanceof Date) {
        sql += `'${formatDateTime(criteria[key])}'`;
      } else {
        sql += criteria[key];
      }
      if (index < Object.keys(criteria).length - 1) {
        sql += " AND ";
      }
    });
    return sql;
  }
  private getJoinRecursive(mainSchema: EntitySchema<any>): string {
    let sql = "";
    const joinMeta = mainSchema.joinMeta;
    if (joinMeta?.length > 0) {
      joinMeta.forEach((join, index) => {
        const subSchema = join.subJoin;
        // looping through all join metas (table which we are joining with)
        sql += ` ${join.joinType || "INNER"} JOIN ${subSchema.tableName} ${
          subSchema.tableAlias
        } ON `;
        join.joinKeys.forEach((key, j) => {
          // we match these two tables with join keys provided in joinMeta
          sql += `${mainSchema.tableAlias}.${join.joinKeys[j]} = ${subSchema.tableAlias}.${subSchema.joinKeys[j]} `;
          if (j < join.joinKeys.length - 1) sql += " AND ";
        });
        if (subSchema.filter) sql += this.getWhereQuery(subSchema, true) + " ";
        if (subSchema.joinMeta) {
          sql += this.getJoinRecursive(subSchema);
        }
      });
    }
    return sql;
  }
  private getFieldsRecursive(mainSchema: EntitySchema<any>): string {
    let sql = "";
    sql += this.getFieldsForSchema(mainSchema);
    const joinMeta = mainSchema.joinMeta;
    joinMeta?.forEach((join) => {
      sql += "," + this.getFieldsRecursive(join.subJoin);
    });
    return sql;
  }
  public async select<model>(
    mainSchema: EntitySchema<model>
  ): Promise<model[]> {
    let sql = "SELECT " + this.getFieldsRecursive(mainSchema);

    sql += ` FROM ${mainSchema.tableName} ${mainSchema.tableAlias}`;
    // JOINS
    sql += this.getJoinRecursive(mainSchema);
    if (mainSchema.filter) {
      sql += this.getWhereQuery(mainSchema);
    }
    const response = await this.executeQuery(sql);
    return response.recordset;
  }
  public async delete<model>(
    entitySchema: EntitySchema<model>
  ): Promise<IResult<any>> {
    let command = `DELETE ${entitySchema.tableAlias} FROM ${entitySchema.tableName} AS ${entitySchema.tableAlias} `;
    if (!entitySchema.filter) throw new Error("No filter specified");

    command += this.getWhereQuery(entitySchema);
    const response = await this.executeQuery(command);
    return response;
  }
  public async insert<model>(
    entitySchema: EntitySchema<model>,
    manageTransaction: boolean = true
  ): Promise<IResult<any>> {
    let command = `INSERT INTO ${entitySchema.tableName} ${entitySchema.insertQuery} `;
    let output = {};
    if (entitySchema.autoIncrement) {
      command += `RETURNING ${entitySchema.autoIncrement} INTO :id `;
      // output = { id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER } };
    }
    // const result = await this.connectionPool.query(command);
    const request = new sql.Request(this.transaction);
    const result = request.query(command);
    // if (manageTransaction) await this.connection.commit();

    return result;
  }
  public async insertGeneric<model>(
    entitySchema: EntitySchema<model>
  ): Promise<IResult<any>> {
    let command = `INSERT INTO ${entitySchema.tableName} (`;
    // columns
    entitySchema.columns.forEach((column) => {
      if (column.autoIncrement) return;
      command += `${column.getter || column.name.toString()}, `;
    });
    command = command.slice(0, -2);
    command += ") ";
    if (entitySchema.autoIncrement) {
      command += ` OUTPUT Inserted.${entitySchema.autoIncrement}`;
      // output = { id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER } };
    }
    command += " VALUES ( ";
    // values
    entitySchema.columns.forEach((column) => {
      if (column.autoIncrement) return;
      let columnValue = entitySchema.payload[column.name] || null;
      let queryValue = "";
      switch (typeof columnValue) {
        case "string":
          queryValue = `'${columnValue}'`;
          break;
        case "number":
          queryValue = columnValue.toString();
          break;
        default:
          queryValue = "null";
      }
      if (columnValue instanceof Date)
        queryValue = `'${formatDateTime(columnValue)}'`;
      command += `${queryValue}, `;
    });
    command = command.slice(0, -2);
    command += " )";

    const response = await this.executeQuery(command);
    return response;
  }
  public async update<model>(
    entitySchema: EntitySchema<model>
  ): Promise<IResult<any>> {
    let command = `UPDATE ${entitySchema.tableName} ${entitySchema.tableAlias} ${entitySchema.updateQuery}`;

    command += this.getWhereQuery(entitySchema);
    const response = await this.executeQuery(command);

    return response;
  }
  public async patch<model>(
    entitySchema: EntitySchema<model>
  ): Promise<IResult<any>> {
    let command = `UPDATE ${entitySchema.tableAlias} SET `;
    Object.keys(entitySchema.payload).forEach((key, index) => {
      // get getter if columns has it
      const databaseColumn = getDbColumnName(key, entitySchema);
      if (!databaseColumn) return;
      if (key === entitySchema.primaryKey) return;
      const prop = entitySchema.payload[key];
      if (prop === undefined) return;
      // only map through primitive objects (objects are ommited)
      if (typeof prop === "object" && !(prop instanceof Date)) {
        return;
      }
      command += `${databaseColumn} = `;

      if (prop && prop instanceof Date) {
        command += `'${formatDate(prop)}'`;
      } else if (typeof prop === "string") {
        command += `'${prop}'`;
      } else if (typeof prop === "boolean") {
        command += prop ? 1 : 0;
      } else if (typeof prop !== "object") {
        command += prop;
      }
      // append ',' if its not last prop

      command += " , ";
    });
    command = command.slice(0, -2);

    command += ` FROM ${entitySchema.tableName} AS ${entitySchema.tableAlias} `;
    command += this.getWhereQuery(entitySchema);
    const response = await this.executeQuery(command);
    // await this.connection.commit();
    if (response.rowsAffected === 0)
      throw createHttpError(404, "Patch Resource Not found hehe");
    return response;
  }
  public executeQuery(sqlCommand: string, binds: any[] = []): Promise<any> {
    console.log(sqlCommand);
    if (this.transaction) {
      return this.transaction.request().query(sqlCommand);
    } else {
      return this.connectionPool.request().query(sqlCommand);
    }
  }
}
