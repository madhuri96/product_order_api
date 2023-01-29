const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

//Create/Register the User in db by using name,phone and password
module.exports.register = async function(req, res){

    //Check if all field enter
    if(req.body.phone==undefined || req.body.name==undefined || req.body.password==undefined){
        return res.status(206).json({
            message: 'Incomplete data provided'
        });
    }
    
    //Check if the User is already registered in db
    let Phone = req.body.phone;
    let userExists = await User.findOne({phone: Phone});
    if(userExists){
        userExists = await userExists.toObject();
        
        delete userExists.password;
        return res.status(405).json({
            data:{
                user: userExists
                
            },
            message: 'User already registered'
        });
    }
            
    try{
        let createdUser = await (await User.create(req.body)).toObject();
        
        if(createdUser){
            delete createdUser.password;
            return res.status(200).json({
                data: {
                    user:createdUser
                },
                message: 'Successfully registered'
            });
        }
        else{
            return res.status(500).json({
                message: 'OOPS!! Error'
            });
        }
    }
    catch(err){
        return res.status(500).json({
            message: 'OOPS!! Error'
        });
    }
}

//Login for User using phone and password, generate JWT token for doc
module.exports.login = async function(req, res){
    
    if(req.body.phone==undefined || req.body.password==undefined){
        return res.status(206).json({
            message: 'Incomplete data provided'
            });
        }

    try{
        let user = await User.findOne({phone:req.body.phone});
        if(user){
            let pass = req.body.password;
            let pwdDb = user.password;
            if(pass==pwdDb){
                return res.status(200).json({
                    data:{
                        token: jwt.sign(user.toJSON(), 'productapi', {expiresIn: 10000000})
                    }
                })
            }
        }
        return res.status(401).json({
            message:'Invalid phone/Password'
        });
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            message: 'OOPS!! Error'
        });
    }
}