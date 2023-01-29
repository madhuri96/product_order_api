const mongoose=require('mongoose'); 
//Order Schema      
const orderSchema=new mongoose.Schema({
    userid:{                                      
        type:String,
        required:true,
        unique:true
    },
    subtotal:{                                  
        type:Number,
        required:true
    },
    phone:{                                   
        type:Number,
        required:true
    },
    reports:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'report',
    }]
},
{
    timestamps:true                             //store timestamps
});

// exports user
const Order=mongoose.model('Order',orderSchema);
module.exports=Order;