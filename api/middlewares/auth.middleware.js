import JWT from 'jsonwebtoken'
// import userModel from '../models/user.model.js';

//protect route 

export const requireSignIn = async (req, res, next) => {

    try {

    const token = req.headers.authorization;

    if(!token){
        return res.status(401).send({
            success:false,
            message:'Authorization token is required'
        })
    }
    
        const decodedToekn=  JWT.verify(token , process.env.JWT_SECRET);
    
        // console.log(decodedToekn);
        req.user=decodedToekn ;
       next();

    }catch(err){
        console.log(err);
        res.status(401).send({
            success:false,
            message:'Invalid or expired Token'
        })

    }


}

//admin middleware
// export const isAdmin = async(req,res,next)=>{

//     try{
//         const user = await userModel.findById(req.user._id);
//         console.log(user);
//         if(!user){
//             return res.status(404).send({
//                 success:false,
//                 message:'User not found'
//             })
//         }


//         if(user.role!==1){
//             return res.status(403).send({
//                 success:false,
//                 message:'Access denied, admin resources'
//             }) ;
//         }
//         next();

//     }catch(err){
//         console.log(err);
//         res.status(500).send({
//             success:false,
//             message:'Server error'
//         })
//     }
     
 
     
// }

export default {requireSignIn};