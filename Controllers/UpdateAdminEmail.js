const AdminModel = require('../Models/Admin')
const UpdateAdminEmail = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized Access" });
        }
        // console.log("SESSION USER : ",req.user.email)
        const id = req.params.id;
        const { email } = req.body;
        // console.log('---update admin email details---', email)
        // console.log('---admin id---', id)

        const updatedAdmin = await AdminModel.findOneAndUpdate(
            {_id: id},
            { email: email },
            { returnDocument: 'after' }
        );
        // console.log('---updated admin details---', updatedAdmin)
        if (!updatedAdmin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        return res.status(200).json({ message: "Admin email updated successfully", admin: updatedAdmin });
    } catch (error) {
        console.error("Error updating admin email:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = UpdateAdminEmail;