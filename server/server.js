require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const router = require('./router/auth-router');
const connectDb = require('./utils/db')

constcorsOptions = {
    origin: "http://localhost:5174",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials:true,
}


app.use(cors());

app.use(express.json());

app.use("/api/auth",router);

const PORT = 5000;




connectDb().then(()=>{
    app.listen(PORT, () => {
        console.log(`server is runnin at port : ${PORT}`);
    
    });
})
