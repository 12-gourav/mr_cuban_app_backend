import express from "express";
import { config } from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { Database } from "./config/Database.js";
import UserRoutes from "./routes/user_routes.js";
import DistanceRoutes from "./routes/distance_route.js";
import LeadRoutes from "./routes/lead_route.js";
import OrderRoutes from "./routes/order_routes.js";

config({path:"./config/.env"});
const app  = express();


app.use(cors("*"));
app.use(express.json());
app.use(morgan("dev"));

Database();


app.use("/api/v1",UserRoutes);
app.use("/api/v1",DistanceRoutes);
app.use("/api/v1",OrderRoutes);
app.use("/api/v1",LeadRoutes);


app.get("/",(req,res)=>{
   res.status(200).json({msg:"ok"})
})



app.listen(process.env.PORT,()=>{
    console.log(`Server is runnin on PORT no ${process.env.PORT}`)
})