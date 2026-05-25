const AdminModel = require('../Models/Admin');
const reminderSchema = require('../Models/reminderSchema')
const NormalAdmin = async (req, res, next) => {
   try {

      if (!req.user) {
         return res.status(401).json({
            message: "Unauthorized"
         });
      }
      // console.log("Email : ", req.user.email)
      const useremail = req.user.email;
      const admin = await AdminModel.findOne({
         email: useremail 
      })
      
      // console.log("admin : ", admin);
      if(admin){
        const allNotifications = await reminderSchema.find();
            return res.status(200).json({
               success: true,
               notifications: allNotifications
            });          
      }        
      next();

   } catch (err) {

      //console.error("FETCH ADMIN ERROR:", err);

      return res.status(500).json({
         message: "Server Error"
      });

   }
};

module.exports = NormalAdmin;