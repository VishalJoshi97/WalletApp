//1st layer of cleansing code 
import express from 'express'
import { sql } from '../config/db.js'; // Adjust the path as necessary
import {
  getTransactionsByUserId,
  postTransactionsByBaseUrl,
  deleteTransactionsById,
  getSummaryByUserId
} from "../controllers/transactionsController.js";



const router = express.Router()

router.get("/:userId",  getTransactionsByUserId)

 
//basic flow logic of the database insert
router.post("/", postTransactionsByBaseUrl )
    
    

router.delete("/:id", deleteTransactionsById);

    
router.get("/summary/:userId", getSummaryByUserId);

export default router