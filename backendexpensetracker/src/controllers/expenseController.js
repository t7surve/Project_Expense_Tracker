import { expense, categories,category_type,users } from "../models/index.js";
import { Sequelize, DataTypes, fn, col, Op } from "sequelize";
import  moment  from "moment";

const expenses = expense;
const category = categories;
const categorytypes=category_type;
const user=users;

//Performing Expense (POST API)

const createExpense = async (req, res) => {
  try {
    const { date, amount, description, category_id,uid } = req.body;
    const id = req.user;
    if (!id) {
      return res.status(404).json({ error: `Invalid token` });
    }
    const {month}=await category.findOne({
      where:{id:category_id},
    });
    const getmonth=moment(new Date(date)).format('MMMM');

    
    if(month!=getmonth)
    {
      return res.status(400).json({error:`Provided Date is invalid please set expense budget for the provided date first`});
    }

     const {budget}=await category.findOne({
      where: { id:category_id ,month:getmonth},
    });

    if(amount && amount>budget)
    {
      return res.status(400).json({error:`Budget exceeded please provide valid amount`});
    }
 
    const existingExpense = await expenses.findOne({
      where: { date, amount, category_id },
    });
    if (existingExpense) {
      return res.status(409).json({ error: ` Existing Expense found ` });
    }
    const expense = await expenses.create({
      date: moment(new Date(date)).format('MM/DD/YYYY'),
      amount: req.body.amount,
      description: description,
      category_id: req.body.category_id,
      uid: req.body.uid,
    });
    return res.status(201).json({ message: "Created Expense Successfully", expense });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

//delete Expense (DELETE API)
const deleteExpense = async (req, res) => {
  let id = req.params.id;
  try {
    const existingExpense = await expenses.findByPk(id);
    if (!existingExpense) {
      return res.status(404).json({ error: `Existing Expense not found ` });
    }
    await expenses.update(
      {
        deletedAt: new Date(),
      },
      { where: { id: id } },
    );

    res.status(200).send("User Expense is deleted !");
  } catch (error) {
    res.status(404).json({
      status: "Error",
      message: error.message,
    });
  }
};

//update Expense
const updateExpense = async (req, res) => {
  let id = req.params.id;
  try {
    const existingExpense = await expenses.findByPk(id);

    if (!existingExpense) {
      return res.status(404).json({ error: `Expense not found ` });
    }

    const getmonth=moment(new Date(req.body.date)).format('MMMM');

     const {budget}=await category.findOne({
      where: { id:req.body.category_id ,month:getmonth},
    });

    if(req.body.amount && req.body.amount>budget)
    {
      return res.status(400).json({error:`Budget exceeded please provide valid amount`});
    }
   
    const info = {
      date: req.body.date,
      amount: req.body.amount,
      description: req.body.description,
      category_id: req.body.category_id,
    };

    await expenses.update(info, {
      where: { id: existingExpense.id },
      return: true,
    });

    res.status(200).send({ message: "Updated Succefully", attributes: [info] });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: error.message,
    });
  }
};

//calculating total expense summary
const calculateExpenseSummaryForUser = async (req,res) => {
  try {
    const id = req.user;
    if (!id) {
      return res.status(404).json({ error: `Invalid token` });
    }
    const uid=req.params.id;

    const colName="date";
    const{startDate,endDate}=req.query;
    
    // Calculating total Expense amount
    const totalsummary = await expenses.findAll({
      attributes: [[fn("sum", col("amount")), "totalExpense"]],
      where: {
        uid:uid,
        deletedAt: null,
        [colName]: { [Op.between]: [startDate, endDate] },
      },
      raw: true,
    });
    return res.status(200).json({ message: "Total Summary Of Monthly Expense", totalsummary });
  } catch (error) {
    console.error("Error:", error);
  }
};

//get All Expense by user id
const getAllExpense=async(req,res)=>{
  const id = req.params.id;
    try{
        const differentExpenses=await expenses.findAll({
            where:{ uid:id, deletedAt:null,},
            attributes: ["id","date","amount","description","category_id","uid"],
            include:[
              {
                model:category,
                as:"category",
                attributes:{
                exclude:["id","deletedAt","createdAt","updatedAt"],
                },
                include:[
                  {
                    model:categorytypes,
                    attributes:{
                      exclude:["id","deletedAt","createdAt","updatedAt"],
                    },
                  },
                  {
                       model:user,
                       as:"users",
                       attributes:["name"],
                  },
                ],
              },
            ],
        });
        differentExpenses.forEach((differentExpenses)=>{
          console.log(differentExpenses.category.name);
        });
        res.status(200).send(differentExpenses);
    }catch(error)
    {
     console.error("Error:", error);
     return res.status(500).json({ error: "Server error" }); 
    }
};

//get Expense by its id
const getExpenseById=async(req,res)=>{
  const id = req.params.eid;
    try{
        const differentExpenses=await expenses.findOne({
            where:{ id:id, deletedAt:null,},
            attributes: ["id","date","amount","description","category_id"],
        });
        res.status(200).send(differentExpenses);
    }catch(error)
    {
     console.error("Error:", error);
     return res.status(500).json({ error: "Server error" }); 
    }
};


export { createExpense, deleteExpense, updateExpense, calculateExpenseSummaryForUser,getAllExpense,getExpenseById, };
