const AdminModel = require('../Models/Admin');
const SuperAdmin = require('../Models/SuperAdmin')
const reminderSchema = require('../Models/reminderSchema')
const NormalAdmin = async (req, res, next) => {
   try {
      if (!req.user) {
         return res.status(401).json({
            message: "Unauthorized"
         });
      }
      
      const useremail = req.user.email;
      const superAdmin = await SuperAdmin.findOne({
         email: useremail
      })

      const admin = await AdminModel.findOne({
         email: useremail 
      })
      
      if (admin || superAdmin) {
         const allNotifications = await reminderSchema.find();
         // console.log(allNotifications)
         return res.status(200).json({
            success: true,
            message: "Admin Data",
            notifications: allNotifications
         });        
      } else {
         return res.status(403).json({
            success: false,
            message: "You are not admin.",
         })
         next();
      }

   } catch (err) {

      return res.status(500).json({
         message: err.message
      });

   }
};

module.exports = NormalAdmin;