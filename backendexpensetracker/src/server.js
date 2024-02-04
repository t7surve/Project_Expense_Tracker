import express, { json, urlencoded } from "express";
import cors from "cors";
import authRouter from "./routes/authRouter.js";
import categoryRouter from "./routes/categoryRouter.js";
import categorytypeRouter from "./routes/categorytypeRouter.js";
import expenseRouter from "./routes/expenseRouter.js";
import dotenv from "dotenv";

const app = express();

dotenv.config();

app.use(cors());
//it parses incoming json data from HTTP request
app.use(json());
//app.use("/uploads", express.static("uploads"));
app.use(urlencoded({ extended: true }));
// routers
app.use("/api/auth", authRouter);
app.use("/api/category",categoryRouter);
app.use("/api/categorytype",categorytypeRouter);
app.use("/api/expense",expenseRouter);
//port
const PORT = process.env.PORT;

//server
app.listen(PORT, () => {
  console.log(`server is running on port  http://localhost:${PORT}`);
});
