import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { database } from "../config/database";

export class User extends Model {
  public id!: number;
  public nome!: string;
  public username!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export interface UserInterface {
    username: string;
    nome: string;
    password: string;
}

User.init(
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
      },
      nome: {
        type: new DataTypes.STRING(128),
        allowNull: false
      },
      username: {
        type: new DataTypes.STRING(128),
        allowNull: false,
        unique: true
      },
      password: {
        type: new DataTypes.STRING(128),
        allowNull: false
      }
    },
    {
      tableName: "users",
      sequelize: database
    }
);


User.sync().then(() => console.log("Tabela User criada"));