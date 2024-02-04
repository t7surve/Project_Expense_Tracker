export default (sequelize, DataTypes) => {
  const Expense = sequelize.define("expense", {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    uid:{
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  });
  return Expense;
};
