import ratelimit from "../config/upstash.js";//type:module

const rateLimiter = async (req, res, next) => {
    
    try {
        //here we just kept it simple
        const { success } = await ratelimit.limit("my-rate-limit")//userId,ipAddress-resl world
        
        if (!success) {
            return res.status(429).json({message:"Too many requests.Please try again later"})
        }
        //if it is a success
        next()

    } catch (error) {
        console.log("Rate limit error",error);
        next(error)
    }
}

export default rateLimiter