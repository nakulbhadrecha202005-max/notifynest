const Authproduct = require('../Middlewares/Authproduct')
const User = require('../Models/Users')
const Router = require('express').Router()
const AdminModel = require('../Models/Admin')
const AdminMiddleware = require('../Middlewares/Adminmiddleware')

Router.get('/', Authproduct , async (req, res) => {
    //console.log('----login users details----', req.user)
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized Access" });
        }
        //console.log(req.user.email)
        const admin = await AdminModel.findOne({
                 email: req.user.email
        })
        //console.log("admin : ",admin)
        if (admin) {
            const users = await User.find();
            //console.log(users)
            return res.status(200).json(users)
        }
        
        const userEmail = await User.findOne({ email: req.user.email });    
        if (userEmail) {
             return res.status(200).json(userEmail)
        }
        else {
            return res.status(403).json({ message: "Access Denied, not admin." });
        }           
    } 
    catch (err)
    {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
  }
})

Router.get('/userSeeProfile', Authproduct, async (req, res) => {
    //console.log('----login users details----', req.user)
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized Access" });
        }
        // console.log(req.user.email)
        // const admin = await AdminModel.findOne({
        //          email: req.user.email
        // })
        // if (admin) {
        //     const users = await User.find();
        //     return res.status(200).json(users)
        // }
        const userEmail = await User.findOne({ email: req.user.email });    
        if (userEmail) {
             return res.status(200).json(userEmail)
        }
        else {
            return res.status(403).json({ message: "Access Denied, not admin." });
        }           
    } 
    catch (err)
    {
        //console.error(err);
        return res.status(500).json({ message: "Server error" });
  }
})

Router.delete('/:id', Authproduct, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({message:"User Not Found / UnAuthorised Access."})
        }
         if (!req.user) {
            return res.status(401).json({ message: "Unauthorized Access" });
        }
        //console.log(req.user.email)
        const admin = await AdminModel.findOne({
                 email: req.user.email
        })
        if (admin) {
            const userId = req.params.id;
            const deleteByid_users = await User.findByIdAndDelete(userId);

            if (!deleteByid_users) {
                return res.status(404).json({ message: "User Not Found / Existed." })
            }
        }

        return res.status(200).json({message:"User Deleted Successfully.", deletedUser: deleteByid_users })
    } catch (err) {
        return res.status(500).json({ message: "Server error" });
    }
})

Router.patch('/userprofileUpdate/:id', Authproduct, async (req, res) => {

    try {
        if (!req.user) {
            return res.status(401).json({message:"User Not Found / UnAuthorised Access."})
        }
        const userId = req.params.id;
        const { name } = req.body;
        //console.log("Userid",userId)
        //console.log("Name",name)
         if (!req.user) {
            return res.status(401).json({ message: "Unauthorized Access" });
        }
        //console.log(req.user.email)
        const admin = await AdminModel.findOne({
                 email: req.user.email
        })
        if (admin) {
            const updateByid_usersAdmin = await User.findByIdAndUpdate(
                userId,
                { name },
                { returnDocument: 'after' }
            );
            if (!updateByid_usersAdmin) {
                return res.status(404).json({message:"User Not Found / Existed."})
            }
        }
        const updateByid_users = await User.findByIdAndUpdate(
            userId,
            { name },
            { returnDocument: 'after' }
        );
        if (!updateByid_users) {
            return res.status(404).json({message:"User Not Found / Existed."})
        }
        return res.status(200).json({message:"User Updated Successfully.", updatedUser: updateByid_users })
    } catch (err) {
        return res.status(500).json({ message: "Server error" });
    }
})
 
module.exports = Router
