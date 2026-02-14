const express=require('express');
const app=express();
const colors=require("colors");
const cors=require("cors");
const morgan=require("morgan");
const dotenv=require("dotenv");

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use('/api/v1/',require('./routes/testRoutes'));

app.get('/',(req,res)=>{
    return res.status(200).send(`<h1>Welcome to food server</h1>`);
});

const PORT=process.env.PORTc|| 8080;

app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`.bgCyan);
});