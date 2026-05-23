const AdminModel = require('../Models/Admin')
const SuperAdmin = require('../Models/SuperAdmin')

const DeleteAdmin = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized Access" });
        }
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                message: 'Admin ID is required'
            })
        }

        const deletedAdmin = await AdminModel.findOneAndDelete(id);

        if (!deletedAdmin) {
        return res.status(404).json({
            message: 'Admin not found'
        })
        }

        return res.status(200).json({
            message: 'Admin deleted successfully',
            deletedAdmin
        })

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }   
}

module.exports = DeleteAdmin
