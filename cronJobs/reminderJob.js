const Reminder = require("../Models/reminderSchema")
const Cron = require("node-cron")

const sendEmailLogic = require("../Utiles/sendEmail");

Cron.schedule("* * * * *", async (req,res,next) => {
    // console.log("Checking reminders...")
    try {
        const reminder_fromDB = await Reminder.find({ isActive: true })  
        const now = new Date();
        const currentHours = now.getHours()

        const currrentMinutes = now.getMinutes()

        let shouldSend = false
        let subjectReminderMessage_toUsers = ""
        if (currrentMinutes !== 0) return 0;

        for (let r of reminder_fromDB) {    

            if (r.priority === 'urgent') {
                if (currentHours === 10 || currentHours === 15 || currentHours === 21) {
                    shouldSend = true;
                    subjectReminderMessage_toUsers = r.message;   
                }
            }

            else if (r.priority === "important") {
                if (
                    currentHour === 10 || // morning
                    currentHour === 18    // evening
                ) {
                    shouldSend = true;
                    subjectReminderMessage_toUsers = r.message;
                }
            }
                
            else if (r.priority === "normal") {
                if (currentHour === 10) {
                    shouldSend = true;
                    subjectReminderMessage_toUsers = r.message
                }
            }

            if (shouldSend) {
                await sendEmailLogic(r.email, subjectReminderMessage_toUsers, r.message)
                r.sentCount += 1;
                await r.save();
                // console.log(`Email sent to ${r.email}`)
            }

        } 
    } catch (err) {
        // console.log("Cron Error : ", err.message)
        return res.status(500).json({
            message: "Server Error"
        })
    }
});



// const Reminder = require("../Models/reminderSchema")
// const Cron = require("node-cron")

// const sendEmailLogic = require("../Utiles/sendEmail")

// Cron.schedule("* * * * *", async () => {

//     try {

//         const reminders = await Reminder.find({
//             isActive: true
//         })

//         const now = new Date()

//         const currentHour = now.getHours()
//         const currentMinute = now.getMinutes()

//         // only exact minute
//         if (currentMinute !== 0) return

//         for (let r of reminders) {

//             let shouldSend = false
//             let subject = ""

//             // 🚨 URGENT
//             if (r.priority === "urgent") {

//                 if (
//                     currentHour === 10 || // morning
//                     currentHour === 15 || // afternoon
//                     currentHour === 21    // night
//                 ) {

//                     shouldSend = true
//                     subject = "🚨 URGENT Reminder"

//                 }
//             }

//             // ⚠️ IMPORTANT
//             else if (r.priority === "important") {

//                 if (
//                     currentHour === 10 || // morning
//                     currentHour === 18    // evening
//                 ) {

//                     shouldSend = true
//                     subject = "⚠️ Important Reminder"

//                 }
//             }

//             // 📌 NORMAL
//             else if (r.priority === "normal") {

//                 if (currentHour === 10) {

//                     shouldSend = true
//                     subject = "📌 Normal Reminder"

//                 }
//             }

//             // ✅ SEND EMAIL
//             if (shouldSend) {

//                 await sendEmailLogic(
//                     r.email,
//                     subject,
//                     r.message
//                 )

//                 r.sentCount += 1

//                 await r.save()

//                 console.log(`✅ Email sent to ${r.email}`)

//             }
//         }

//     } catch (err) {

//         console.log("Cron Error:", err.message)

//     }

// })