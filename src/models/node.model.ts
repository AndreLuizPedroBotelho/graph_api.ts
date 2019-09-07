import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { database } from "../config/database";
import { Link } from "./link.model";

export class Node extends Model {
  public id!: number;
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export interface NodeInterface {
    name: string;
}

Node.init(
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: new DataTypes.STRING(128),
        allowNull: false
      }
    },
    {
      tableName: "nodes",
      sequelize: database
    }
);

Node.hasMany(Link, {
  sourceKey: "id",
  foreignKey: "fromId",
  as: "previousLinks"
});

Node.hasMany(Link, {
  sourceKey: "id",
  foreignKey: "toId",
  as: "nextLinks"
});
Node.sync().then(() => console.log("Tabela Node criada"));