const express=require('express');
const router=express.Router();
const passport=require('passport');
const order_controller=require('../../../controllers/api/v1/order_controller');

router.post('/register',passport.authenticate('jwt',{session:false}),order_controller.register);
router.post('/:id/create_report',passport.authenticate('jwt',{session:false}),order_controller.createReport);
router.get('/:id/all_reports',order_controller.allReports);

module.exports=router;