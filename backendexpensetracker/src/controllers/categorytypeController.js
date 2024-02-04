import { category_type } from "../models/index.js";
import { Sequelize, DataTypes, col } from "sequelize";

const categorytypes=category_type;

const createCategory=async(req,res)=>{
  try{
      const {name}=req.body;
      const existingCategory=await categorytypes.findOne({where:{name}});
      if(existingCategory)
      {
        return res.status(409).json({ message: `Category Already Exist` });
      }
      const category=await categorytypes.create({
        name:req.body.name,
      });
      return res.status(201).json({ message: "Created Expense Category Successfully", category });
    }catch(error){
     console.error("Error:", error);
     return res.status(500).json({ error: "Server error" });
    }
};

const getAllCategory=async(req,res)=>{
    try{
        const differentCategories=await categorytypes.findAll({
            where:{deletedAt:null,},
            attributes: ["id", "name"],
        });
        res.status(200).send(differentCategories);
    }catch(error)
    {
     console.error("Error:", error);
     return res.status(500).json({ error: "Server error" }); 
    }
};

export {createCategory,getAllCategory};