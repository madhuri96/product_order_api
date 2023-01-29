const Order = require('../../../models/order');
const Report = require('../../../models/report');
let User = require('../../../models/user');
const Status = require('../../../config/status');

//Add a order using user_id, sub_total, phone_number
module.exports.register = async function(req, res){

    if(req.body.userid==undefined || req.body.subtotal==undefined || req.body.phone==undefined){
        return res.status(206).json({
            message: 'Incomplete data provided'
        });
    }

    let phone = req.body.phone;
   
    let orderExists = await Order.findOne({phone: phone});
    if(orderExists){
        return res.status(405).json({
            data:{
                order:orderExists
            },
            message: 'orderExists'
        })
    }

    try{
       
        let createdOrder = await Order.create(req.body);
        if(createdOrder){
            return res.status(200).json({
                data: {
                    order:createdOrder,
                    
                },
                message: 'Order Added Successfully'
            });
        }
        else{
            return res.status(500).json({
                message: 'OOPS!! error'
            });
        }
    }
    catch(err){
        return res.status(500).json({
            message: 'OOPS!! error'
        });
    }
}

//Create a Report for the order using userId
module.exports.createReport = async function(req, res){

    let orderId = req.params.id;
    let userId = req.body.user;

    if(orderId==undefined || userId==undefined){
        return res.status(206).json({
            message: 'Incomplete data provided'
        });
    }

    
    let st = req.body.status;
    req.body.status = Status[st];
    try{
        let order = await Order.findById(req.params.id);
        let user = await User.findById(req.body.user);

        
        //then report created
        if(order && user){
            req.body.order = orderId;
            let report = await Report.create(req.body);
            if(report){
                //pushing the new report in the patients report array
                await order.reports.push(report);
                await order.save();
            }
           
            return res.status(200).json({
                data:{
                    report:{
                        order: order.userid,
                        status: report.status,
                        user: user.name,
                        date: report.createdAt
                    }
                },
                message: 'Report successfully Created'
            })
        }
        else{
            return res.status(401).json({
                message: 'Order is not Added/User is not Registered'
            });
        }
    }
    catch(err){
        return res.status(500).json({
            message: 'Oops!! Eror'
        });
    }
}

//fetchall reports of a order
module.exports.allReports = async function(req, res){
    
    try{
        let report=await Report.find({ order:req.params.id }).sort("createdAt").populate('user').populate('order');
        
        return res.status(200).json({
            data:{
                    report
            },
            message:'All reports of the Order',
          //details:report
        })
      }
      catch(err){
          return res.status(500).json({
          message:'OOPS!! Error Occured!'
        })
      }
    };