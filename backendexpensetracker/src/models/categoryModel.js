export default (sequelize, DataTypes) => {
  const Category = sequelize.define("category", {
    category_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
     user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    month:{
       type:DataTypes.STRING,
       allowNull:false,
    },
    budget: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  });
  return Category;
};
