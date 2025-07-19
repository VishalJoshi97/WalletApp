// const express=require('express');
import express from 'express';
import dotenv from 'dotenv';
import { sql } from './config/db.js'; // Adjust the path as necessary
import rateLimiter from './middleware/rateLimiter.js';
import transactionsRoute from "./routes/transactionsRoute.js"
import initDB from "./config/db.js"

import job from "./config/cron.js"

dotenv.config()

 
const app = express();

if(process.env.NODE_ENV==="production") job.start()

//middleware-it is a fun that runs in the middle b/w the req and res
//Ex: if u send a req to ig,then res will be given if ur authorized user
app.use(express.json())
app.use(rateLimiter)

//custom simple middleware
// app.use((req, res, next) => {
//     console.log("Hey we hit a req,the method is",req.method);
//     next()
// })

// console.log("my Port",process.env.PORT);
const PORT = process.env.PORT || 5001;

application.get("/api/health", (req, res) => {
    res.status(200).json({status:"ok"})
})

// for HEALTH-CHECK-basics
// app.get("/", (req, res) => {
//   res.send("its working");
// });

//base url for transactions-"/" and itwill be directed to transactionsRoute file
app.use("/api/transactions", transactionsRoute);
// app.use("/api/products", productsRoute);

    
    initDB().then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    
   //need a clound service for backend ex:render  