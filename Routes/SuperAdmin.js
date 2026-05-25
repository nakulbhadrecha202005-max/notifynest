const router = require('express').Router()
const Authproduct = require('../Middlewares/Authproduct')
const AdminMiddleWare = require('../Middlewares/Adminmiddleware')
const { addAdmin } = require('../Controllers/AdminController')
const fetchAllAdmin = require('../Controllers/fetchAllAdmin')
const DeleteAdmin = require('../Controllers/DeleteAdmin')
const loginLimiter = require('../validationratelimit/loginLimiter')
const UpdateAdminEmail = require('../Controllers/UpdateAdminEmail')
// Only admin can add admin
router.post('/add-admin', Authproduct, AdminMiddleWare , addAdmin)
router.get('/allAdminListfetch', Authproduct, AdminMiddleWare, fetchAllAdmin)
router.delete('/deleteAdmin/:id', Authproduct, AdminMiddleWare, DeleteAdmin)
router.patch('/updateAdmin/:id', Authproduct, AdminMiddleWare, UpdateAdminEmail)
module.exports = router
