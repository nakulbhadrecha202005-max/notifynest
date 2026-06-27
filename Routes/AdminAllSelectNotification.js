const  Routes = require('express').Router()
const AuthUsers = require('../Middlewares/Authproduct')
const reminderSchema = require('../Models/reminderSchema')
const Authproduct = require('../Middlewares/Authproduct')
const AdminModel = require('../Models/Admin')
const NormalAdmin = require('../Middlewares/NormalAdmin')
// const cache = require('../Middlewares/cache')
const ProtectCashingWare = require("../Middlewares/ProtectCashingWare")
// const redisClient = require("../config/redis");
Routes.get('/fetchNotificationsByAdmin' , Authproduct , NormalAdmin , async (req, res) => {
    try { 
        // Normal user can access only their notifications
        const userNotifications = await reminderSchema.find({
            email: req.user.email
        });
        console.log(userNotifications)
        const responseData = {
            success: true,
            message:"User Data",
            notifications: userNotifications
        };

        return res.status(200).json(responseData);
        
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
})

Routes.get('/GeneralUsers' , Authproduct , async (req, res) => {
    try { 
        // Normal user can access only their notifications
        if (!req.user || !req.user.email) {
            return res.status(401).json({ 
                success: false, 
                message: "Unauthorized: User payload missing from request." 
            });
        } 
        // console.log(req.user)
        const userNotifications = await reminderSchema.findOne({
            email: req.user.email
        }); 

        // console.log(userNotifications)

        const responseData = {
            success: true,
            message: "User Data",
            notifications: userNotifications
        };


        return res.status(200).json(responseData);
        
    } catch (err) {
        // console.log("Error", err);
        return res.status(500).json({message: err.message})
    }
})

// Backend Route - Added missing response
Routes.delete('/delete/:id', Authproduct, async (req, res) => {
    try {
   
        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized Access to delete."
            });
        }

        const notification = await reminderSchema.findById(req.params.id);

        if (!notification) {
            return res.status(404).json({
                message: "Notification not found."
            });
        }

        const deletedNotification = await reminderSchema.findByIdAndDelete(req.params.id);

        const responseData = {
            message: "Notification deleted successfully.",
            notifications: deletedNotification
        };
        return res.status(200).json(responseData);

    } catch (err) {
        console.error("DELETE ERROR:", err);
        return res.status(500).json({
            message: err.message || "Internal Server Error during deletion."
        });
    }
});

Routes.patch('/:id', Authproduct, async (req, res) => {
    //console.log('---update notification details---', req.user)
    try {
        // console.log(req.user.email);
        // console.log(req.user);
        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized Access"
            });
        }

        // if (req.user.email !== "nakul@gmail.com") {
        //     return res.status(403).json({
        //         message: "Access Denied"
        //     });
        // }

        const notificationId = req.params.id;
        // const { message, priority, isActive } = req.body;
        // const updateFields = {};
        // if (message !== undefined) updateFields.message = message;
        // if (priority !== undefined) updateFields.priority = priority;
        
        // // Explicitly handle the boolean evaluation of your toggle
        // if (isActive !== undefined) {
        //     updateFields.isActive = isActive === true || isActive === 'true';
        // }
        const updatedNotification =
            await reminderSchema.findByIdAndUpdate(
                notificationId,
                req.body,
                {
                    new: true,
                    runValidators: true
                }
            );
        
        console.log(updatedNotification);

        if (!updatedNotification) {
            return res.status(404).json({
                message: "Notification Not Found"
            });
        }

        res.status(200).json({
            message: "Notification Updated Successfully",
            updatedNotification
        });

    } catch (err) {

        //console.log(err);

        res.status(500).json({
            message: "Server Error"
        });
    }
});

module.exports = Routes;

