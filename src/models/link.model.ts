import { Model, DataTypes } from "sequelize";
import { database } from "../config/database";
import { Node } from "./node.model";

export class Link extends Model {
  public id!: number;
  public fromId!: number;
  public toId!: number;
  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export interface LinkInterface {
  name: string;
  fromId: number;
  toId: number;
}

Link.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    fromId: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    toId: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  },
  {
    tableName: "links",
    sequelize: database
  }
);

Link.sync().then(() => console.log("Tabela Link criada"));