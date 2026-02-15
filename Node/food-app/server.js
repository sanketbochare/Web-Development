const express=require('express');
const app=express();
const colors=require("colors");
const cors=require("cors");
const morgan=require("morgan");
const dotenv=require("dotenv");
const connectDb = require('./config/db');

dotenv.config();

connectDb();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//test route
//URL->http://localhost:8080/api/v1/test-user
app.use('/api/v1/',require('./routes/testRoutes'));

app.use('/api/v1/auth',require('./routes/authRoutes'));

app.use("/api/v1/user",require('./routes/userRoutes'));

app.get('/',(req,res)=>{
    return res.status(200).send(`<h1>Welcome to food server</h1>`);
});

const PORT=process.env.PORT || 8080;

const server = app.listen(PORT, '127.0.0.1', () => {
  console.log(`server running on ${PORT}`);
});

server.on('error', (err) => {
  console.error('SERVER LISTEN ERROR:', err);
});
