//2nd layer of cleansing code
import { sql } from "../config/db.js"

export async function getTransactionsByUserId(req,res) {
        try {
            const { userId } = req.params
            // console.log(userId);
           const transaction= await sql`
            SELECT * FROM transactions WHERE user_id=${userId}
            ORDER BY created_at DESC`;
    
            res.status(200).json(transaction);
            
        } catch (error) {
            console.log("Error grtting the transactions",error);
            res.status(500).json({ message: "Internal server error" });
        }
}
    

export async function postTransactionsByBaseUrl(req,res) {
            //title,amount,catagory,user_id
            try {
                //destructuring
                const { title, amount, category, user_id } = req.body;
                // console.log("req.body:", req.body);
    
                if (!title || !user_id || !category || amount === undefined) {
                    return res.status(400).json({ message: "All field are required" })
                }
    
                const transaction = await sql`
            INSERT INTO transactions(user_id,title,amount,category)
            VALUES (${user_id},${title},${amount},${category})
            RETURNING *
            `
                console.log(transaction);//it is an array
                
                res.status(201).json(transaction[0])
            } catch (error) {
                console.log("Error creating the transaction", error);
                res.status(500).json({ message: "Internal server error" })
            }
}

export async function deleteTransactionsById(req,res) {
            try {
                const { id } = req.params
    
                // console.log(typeof id);//string always
                //passing string in the url
                if (isNaN(parseInt(id))) {
                    return res.status(400).json({message:"Invalid transaction id"})
                }
    
                const result = await sql`
                DELETE FROM transactions WHERE id=${id}
                RETURNING *
                `
                if (result.length === 0) {
                    return res.status(404).json({message:"Transaction not found"})
                }
                res.status(200).json({message:"Transaction deleted successfully"})
    
            } catch (error) {
                console.log("Error deleting the transactions",error);
                res.status(500).json({message:"Internal server error"})
            }
    
}

export async function getSummaryByUserId(req,res) {
        try {
            const { userId } = req.params
            
            const balanceResult = await sql`
            SELECT COALESCE(SUM(amount),0) as balance
            FROM transactions WHERE user_id=${userId}` 
    
            const incomeResult = await sql`
            SELECT  COALESCE(SUM(amount),0) as income
            FROM transactions WHERE user_id=${userId} AND amount>0
            `
            const expensesResult = await sql`
            SELECT  COALESCE(SUM(amount),0) as expenses
            FROM transactions WHERE user_id=${userId} AND amount<0
            `
            res.status(200).json({
                Balance: balanceResult[0].balance,
                Income: incomeResult[0].income,
                Expenses:expensesResult[0].expenses
            })
    
            } catch (error) {
              console.log("Error getting the summary", error);
              res.status(500).json({ message: "Internal server error" });
            }
}