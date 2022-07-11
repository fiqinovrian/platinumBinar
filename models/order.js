'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init({
    userId: DataTypes.INTEGER,
    itemId: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
    priceTotal: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order',
  });
  Order.associate = function(models) {
    Order.belongsTo(models.User, { foreignKey: 'userId'})
    Order.belongsTo(models.Item, { foreignKey: 'itemId'})
  }
  return Order;
};