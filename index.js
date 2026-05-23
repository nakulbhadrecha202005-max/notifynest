const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

// require('dotenv').config()
require('./Models/db')

const AuthRouter = require('./Routes/AuthRouter')
const ProductRouter = require('./Routes/ProductRouter')
const AdminAllUsersRoutes = require('./Routes/AdminAllUsersRoutes')
const AddReminderMain = require('./Routes/ReminderRoutes')
const AllNotification = require('./Routes/AdminAllSelectNotification')
const PORT = 5000

app.use(bodyParser.json()) // required for fetching req.body email pass from frontend
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
})) // server allowind different port
app.use(express.json())
app.use('/auth', AuthRouter)
app.use('/products', ProductRouter)

app.use('/adminall_users', AdminAllUsersRoutes)
app.use('/AllNotification', AllNotification)

app.use('/AddReminderMain', AddReminderMain)

// super admin add admins
const SuperAdminRoutes = require('./Routes/SuperAdmin')
app.use('/superadmin', SuperAdminRoutes)

// Cron job start karva mate aa line jaruri che
require('./cronJobs/reminderJob')

app.get('/', (req, res) => {
  res.send('Server started')
})

app.listen(PORT, () => {
  console.log('http://localhost:5000/')
})
