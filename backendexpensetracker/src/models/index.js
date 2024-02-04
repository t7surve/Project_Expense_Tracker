import { config } from "../config/dbConfig.js";
import createUserModel from "./userModel.js";
import createExpenseModel from "./ExpenseModel.js";
import createCategoryModel from "./categoryModel.js";
import createCategoryTypeModel from "./categorytypeModel.js";

import { Sequelize, DataTypes } from "sequelize";

const { DB, USER, PASSWORD, HOST, dialect, pool } = config;
const sequelize = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  dialect,
  operatorsAliases: false,

  pool: {
    max: pool.max,
    min: pool.min,
    acquire: pool.acquire,
    idle: pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("connected..");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = createUserModel(sequelize, DataTypes);
db.expense = createExpenseModel(sequelize, DataTypes);
db.categories = createCategoryModel(sequelize, DataTypes);
db.category_type=createCategoryTypeModel(sequelize,DataTypes);

db.sequelize.sync({ force: false });

//Expense Association
//One user has many expenses
db.users.hasMany(db.expense, { foreignKey: "uid" });
db.expense.belongsTo(db.users, {
  as: "uexpid",
  sourceKey: "id",
  foreignKey: "uid",
});


//One user has many expense category
db.users.hasMany(db.categories, { foreignKey: "user_id" });
db.categories.belongsTo(db.users, {
  as: "users",
  sourceKey: "id",
  foreignKey: "user_id",
});

//Each Category belongs to a category type
db.category_type.hasMany(db.categories,{foreignKey:"category_type_id"});
db.categories.belongsTo(db.category_type,{
  sourceKey:"id",
  foreignKey:"category_type_id",
});


//Category Association
//One category has many expenses
db.categories.hasMany(db.expense, { foreignKey: "category_id" });
db.expense.belongsTo(db.categories, {
  as: "category",
  sourceKey: "id",
  foreignKey: "category_id",
});

export let { users, expense, categories,category_type } = db;
export { sequelize };
