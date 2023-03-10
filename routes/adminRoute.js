const express = require('express')
const admin_route = express();
require('dotenv').config()
const adminController = require('../controllers/adminController')
const session = require('../config/session')
const hbs = require('express-handlebars')
const auth = require('../middleware/auth')
const upload = require('../middleware/multer')
const Coupon = require('../models/couponModel')
const cron = require('node-cron');
const adminModel = require('../models/adminModel');

admin_route.set('views','./views/admin')

admin_route.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout:'adminLayout',
    layoutsDir: __dirname + '../../views/layouts/',
    partialsDir: __dirname + '../../views/partials'
  }))

  admin_route.use(session.checkSession)

  cron.schedule("0 0 0 * * *", async () => {
    const expiredCoupons = await Coupon.find({ expire: { $lt: new Date() } });
    console.log(expiredCoupons);
    await Coupon.updateMany({ _id: { $in: expiredCoupons.map((c) => c._id) } }, { $set: { is_valid: false } });
});

admin_route.get('/login',adminController.loadLogin)
admin_route.post('/login',adminController.verifyLogin)
admin_route.get('/',adminController.loadLogin)
admin_route.post('/',adminController.verifyLogin)
admin_route.get('/dashboard',auth.isAdminLogin,adminController.loadDashboard)
admin_route.get('/logout',adminController.logout)
admin_route.get('/inventory',auth.isAdminLogin,adminController.loadInventory)
admin_route.get('/users',auth.isAdminLogin,adminController.loadUsers)
admin_route.get('/category',auth.isAdminLogin,adminController.loadCategory)
admin_route.post('/category',auth.isAdminLogin,adminController.deleteCategory)
admin_route.put('/blockUser',auth.isAdminLogin,adminController.blockUser)
admin_route.put('/unblockUser',auth.isAdminLogin,adminController.unblockUser)
admin_route.get('/addProduct',auth.isAdminLogin,adminController.addProduct)
admin_route.post('/addProduct',upload.array('image',5),auth.isAdminLogin,adminController.insertProduct)
admin_route.get('/addCategory',auth.isAdminLogin,adminController.addCategory)
admin_route.post('/addCategory',upload.single('image'),auth.isAdminLogin,adminController.insertCategory)
admin_route.delete("/deleteCategory",auth.isAdminLogin,adminController.deleteCategory)
admin_route.delete("/deleteProduct",auth.isAdminLogin,adminController.deleteProduct)
admin_route.get("/editProduct",auth.isAdminLogin,adminController.loadEditProduct)
admin_route.post("/editProduct",upload.array('image',5) ,auth.isAdminLogin,adminController.editProduct)
admin_route.get('/order',auth.isAdminLogin,adminController.loadOrders)
admin_route.put('/rejectOrder',auth.isAdminLogin,adminController.rejectOrder)
admin_route.get('/viewOrder',auth.isAdminLogin,adminController.viewOrder)
admin_route.put('/changeStatus',auth.isAdminLogin,adminController.changeStatus)
admin_route.get('/coupons',auth.isAdminLogin,adminController.loadCoupon)
admin_route.get('/addCoupon',auth.isAdminLogin,adminController.loadAddCoupon)
admin_route.post('/addCoupon',auth.isAdminLogin,adminController.insertCoupon)
admin_route.put('/blockCoupon',auth.isAdminLogin,adminController.blockCoupon)
admin_route.delete('/removeProductImage',auth.isAdminLogin,adminController.removeProductImage)
admin_route.get('/sales',auth.isAdminLogin,adminController.salesData)
admin_route.post('/timeSearch',auth.isAdminLogin,adminController.timeSearch)
admin_route.get('/salesreport',auth.isAdminLogin,adminController.loadSalesReport)
admin_route.get('/periodSales',auth.isAdminLogin,adminController.loadSearchSalesReport)

module.exports = admin_route











// admin_route.get('/returnProd',auth.isAdminLogin,adminController.productReturn)
// admin_route.post('/acceptReturn',auth.isAdminLogin,adminController.acceptReturn)
// admin_route.post('/rejectReturn',auth.isAdminLogin,adminController.rejectReturn)