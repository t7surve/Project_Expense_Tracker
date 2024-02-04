export default (sequelize, DataTypes) => {
  const Category_Type = sequelize.define("category_type", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  });
  return Category_Type;
};
