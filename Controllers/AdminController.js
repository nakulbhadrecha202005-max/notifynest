const AdminModel = require("../Models/Admin");

// Add New Admin
const addAdmin = async (req, res) => {
   try {
      // console.log('addAdmin controller called')
   
      const { email } = req.body;

      if (!email) {
         return res.status(400).json({
            message: "Email is required"
         });
      }
      //console.log(email)
      // check already exists
      const existingAdmin = await AdminModel.findOne({ email });

      if (existingAdmin) {
         return res.status(400).json({
            message: "Admin already exists"
         });
      }

      // create admin
      const newAdmin = await AdminModel.create({
         email
      });

      return res.status(201).json({
         message: "Admin added successfully",
         admin: newAdmin
      });

   } catch (err) {

      return res.status(500).json({
         message: "Server Error",
         error: err.message
      });

   }

};

module.exports = {
   addAdmin
};