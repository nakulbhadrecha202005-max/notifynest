const Adminmiddleware = async (req, res, next) => {
   try {

      if (!req.user) {
         return res.status(401).json({
            message: "Unauthorized"
         });
      }

      const AdminModel = require('../Models/Admin');

      const admin = await AdminModel.findOne({
         email: req.user.email
      });

      // FIRST check admin exists
      if (!admin) {
         return res.status(403).json({
            message: "Access Denied, Only Admin can access this route."
         });
      }

      // console.log("--Admin user", admin.email);

      const SuperAdminEmail = require('../Models/SuperAdmin');

      const SuperAdmin = await SuperAdminEmail.findOne({
         email: req.user.email
      });

      // FIRST check SuperAdmin exists
      if (!SuperAdmin) {
         return res.status(403).json({
            message: "Access Denied, Only Super Admin can access this route."
         });
      }

      //console.log("--Super Admin", SuperAdmin.email);

      if (SuperAdmin.email !== admin.email) {
         return res.status(403).json({
            message: "Access Denied, Only Super Admin can access this route."
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

module.exports = Adminmiddleware;