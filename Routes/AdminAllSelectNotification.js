const  Routes = require('express').Router()
const AuthUsers = require('../Middlewares/Authproduct')
const reminderSchema = require('../Models/reminderSchema')
const Authproduct = require('../Middlewares/Authproduct')
const AdminModel = require('../Models/Admin')
const NormalAdmin = require('../Middlewares/NormalAdmin')
Routes.get('/',  Authproduct , NormalAdmin , async (req, res) => {
    try {
        // Normal user can access only their notifications
        const userNotifications = await reminderSchema.find({
            email: req.user.email
        });

        return res.status(200).json({
            notifications: userNotifications,
            message:
                "You do not have Administrator permission to access all notifications. Showing only your notifications.",
        });
        
    } catch (err) {
        return res.status(500).json({message:"ServerDown or Error"})
    }
})

Routes.delete('/:id', Authproduct, async (req, res) => {
    try {

        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized Access to delete."
            })
        }

        // if (req.user.email !== "nakul@gmail.com") {
        //     return res.status(403).json({
        //         message: "Access Denied"
        //     })
        // }

        const NotificationUsersId = req.params.id

        const deletedNotification =
            await reminderSchema.findByIdAndDelete(NotificationUsersId)

        if (!deletedNotification) {
            return res.status(404).json({
                message: "Notification Not Found."
            })
        }

        return res.status(200).json({
            message: "Notification Deleted Successfully.",
            deletedNotification
        })

    } catch (err) {
        return res.status(500).json({
            message: "Server Down or Error"
        })
    }
})

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

