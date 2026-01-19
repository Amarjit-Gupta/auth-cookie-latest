import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDb from './config/db.js';
import authRoute from './route/authRoute.js';
import cookieParser  from 'cookie-parser';

const port = process.env.PORT || 4000;

connectDb();

const app = express();

app.use(express.json());

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));


app.use(cookieParser());


app.get("/test",(req,res)=>{
    return res.status(200).json({message:"API Working"});
});

app.use("/auth",authRoute);

app.listen(port,()=>{
    console.log(`server is runnig on port ${port}`);
});