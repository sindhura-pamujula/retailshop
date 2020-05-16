import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';
import sequelize from '../config/database';
class ProductType extends Model {
  public id!: number;
  public producttype!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ProductType.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  producttype: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  }
}, {
  sequelize,
  tableName: 'producttype',
});

export default ProductType;