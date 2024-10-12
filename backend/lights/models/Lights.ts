import { DataTypes, Model } from 'sequelize';
import sequelize from '../src/utils/db';

class Lights extends Model {
    public id!: number;
    public user_id!: number;
    public Lights_name!: number;
    public Lights_unit_usage!: number;
    public Lights_count!: number;
    created_at?: Date;
    updated_at?: Date;
}

Lights.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Lights_name: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Lights_unit_usage: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Lights_count: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // Set default value to current timestamp
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // Set default value to current timestamp
    },
  },
  {
    sequelize,
    tableName: 'Lights',
    timestamps: true,
  }
);

export default Lights;
