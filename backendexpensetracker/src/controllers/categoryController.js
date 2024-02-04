import { categories,category_type,users } from "../models/index.js";
import { Sequelize, DataTypes, col } from "sequelize";

const Budget = categories;
const categorytypes=category_type
const user=users;

//Creating Category (POST API)
const categoryBudget = async (req, res) => {
  try {
    const { category_type_id,user_id,month, budget } = req.body;
    const id = req.user;
    if (!id) {
      return res.status(404).json({ error: `Invalid token` });
    }
    const [category,created]=await Budget.findOrCreate({
      where:{category_type_id,user_id,month},
      defaults:{budget},
    });

    if(!created){
      return res.status(409).json({ message: `Category Already Exist` });
      //await category.update({budget});
    }
    return res.status(201).json({
      message: "Added Different Category & Budget Set Successfully ",
      category,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

const getAllBudget=async(req,res)=>{
    try{
        const id = req.user;
         if (!id) {
          return res.status(404).json({ error: `Invalid token` });
        } 
        const differentBudget=await Budget.findAll({
            where:{ deletedAt:null,},
            attributes: ["id","category_type_id","month","budget"],
            include:[
              {
                model:categorytypes,
                attributes:["name"],
              },
              {
                model:user,
                as:"users",
                attributes:["name"],
              },
            ]
        });
        res.status(200).send(differentBudget);
    }catch(error)
    {
     console.error("Error:", error);
     return res.status(500).json({ error: "Server error" }); 
    }
};
const getBudgetById = async (req, res) => {
  const id = req.params.id;
  try {
    const existingbudgetcategory = await Budget.findByPk(id);

    if (!existingbudgetcategory || existingbudgetcategory.deletedAt !== null) {
      return res.status(404).json({ error: `Budget not found with id ${id}` });
    }

    const getbyidbudget = await Budget.findAll({
      where: { user_id:id,deletedAt:null },
      attributes: ["id","user_id","category_type_id","month","budget"],
            include:[
              {
                model:categorytypes,
                attributes:["name"],
              },
              {
                model:user,
                as:"users",
                attributes:["name"],
              },
            ]
    });
    res.status(200).send(getbyidbudget);
  } catch (error) {
    res.status(404).json({
      status: "Error",
      message: error.message,
    });
  }
};

export { categoryBudget,getAllBudget,getBudgetById };
