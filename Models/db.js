const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://mongodblearning20_db_user:VuIlDHcuWTbwF14r@nakul.7aqwd0d.mongodb.net/db2')
    .then(() => console.log('DB MONGODB CONNECTED')).catch(err => console.log('MongoDB connection Error : ', err))
  
        