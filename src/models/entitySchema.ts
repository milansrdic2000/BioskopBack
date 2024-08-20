export interface EntitySchema<T> {
  tableName: string;
  tableAlias?: string;
  primaryKey: string | string[];
  autoIncrement?: string;

  columns: ColumnSchema<T>[];
  filter?: Partial<T>;
  payload?: Partial<T>;

  insertQuery?: string;
  updateQuery?: string;

  // acceptance join; other tables will use this key when joining with this table
  joinKeys?: string[];
  joinType?: string; // INNER, LEFT, RIGHT, FULL

  // join with other tables
  joinMeta?: JoinMeta[];

  parseDbRow?: (rows: T[] | T) => T[] | T;
}

export interface JoinMeta {
  joinKeys: string[];
  joinType?: string;
  subJoin?: EntitySchema<any>;
}
export interface ColumnSchema<T> {
  name: keyof T;
  getter?: string;
  alias?: string;
  operator?: string;
  rightValue?: string;
  hide?: boolean;
  type?: string;
  required?: boolean;
  primaryKey?: boolean;
  autoIncrement?: boolean;
  foreignKey?: boolean;
}
