// const redisClient = require('../config/redis.js')
// const cache = async (req, res, next) => {

//     try {
//          if (!redisClient.isReady) {
//             console.log("Redis not ready, skipping cache");
//             return next();
//         }


//         const cleanEmail = req.user.email.trim().replace(/^["']|["']$/g, '');
//         const cleanUrl = req.originalUrl.replace(/\/+$/, "");
//         const key = `${cleanEmail}-${cleanUrl}`;
//         const cachedData = await redisClient.get(key);
//                 // console.log(cleanEmail)
//         if (cachedData) {
//             console.log("CACHE HIT FROM REDIS");
//             return res.json(JSON.parse(cachedData));
//         }
//         console.log("NOT HIT FROM REDIS");
//         next();
//     } catch (err) {
//         console.log(err);
//         next();
//     }
// };

// module.exports = cache;