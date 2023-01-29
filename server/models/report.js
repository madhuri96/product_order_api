const mongoose=require('mongoose');   
//Reports Schema      
const reportSchema=new mongoose.Schema({
    user:{                                  
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    order:{                                      
        type:mongoose.Schema.Types.ObjectId,
        ref:'Order',
        required:true
    },
    status:{                                   
        type:String,
        required:true,
    }
},
{
    timestamps:true                            
});

// exports user
const Report=mongoose.model('Report',reportSchema);
module.exports=Report;