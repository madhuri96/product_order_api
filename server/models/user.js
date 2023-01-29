//require mongoose
const mongoose=require('mongoose');  
//user Schema       
const docSchema=new mongoose.Schema({
    name:{                                      
        type:String,
        required:true
    },
    phone:{                                   
        type:Number,
        required:true,
        unique:true    
    },
    password:{                                  
        type:String,
        required:true
    } 
},
{
    timestamps:true                             
});

// exports user
const User=mongoose.model('User',docSchema);
module.exports=User;