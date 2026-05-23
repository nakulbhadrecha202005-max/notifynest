const reminderModel = require('../Models/reminderSchema')

const SetReminder = async (req, res) => {
  try {
    const { name, email, message, priority } = req.body
    //console.log(req.body);
    if(!req.user){
      return res.status(401).json({
        message: "User not found"
      })
    }
    
      const reminder = await reminderModel.create({
            name,
            email,
            message,
            priority,
      })

      return res.status(201).json({
        message: "Data inserted successfully",
        data: reminder,
      });
      
  } catch (err) {
    res.status(500).json({
      message: err.message,
      success: false
    })
  }
}

module.exports = SetReminder
