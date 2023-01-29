const express=require('express');
const router=express.Router();

router.use('/users',require('./users'));
router.use('/orders',require('./orders'));
router.use('/reports',require('./reports'));

module.exports=router;