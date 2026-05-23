const AdminModel = require('../Models/Admin')
const SuperAdmin = require('../Models/SuperAdmin')

const fetchAllAdmin = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized Access" });
        }

            const allAdmins = await AdminModel.find();
            return res.status(200).json(allAdmins)
    } catch (err) {
        //console.error("FETCH ADMIN ERROR:", err)
        return res.status(500).json({ message: "Server error" });
    }   
}

module.exports = fetchAllAdmin
