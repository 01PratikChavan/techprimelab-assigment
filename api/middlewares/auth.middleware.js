import JWT from 'jsonwebtoken'
// import userModel from '../models/user.model.js';

//protect route 

export const requireSignIn = async (req, res, next) => {

    try {

        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).send({
                success: false,
                message: 'Authorization token is required'
            })
        }

        const decodedToekn = JWT.verify(token, process.env.JWT_SECRET);

        // console.log(decodedToekn);
        req.user = decodedToekn;
        next();

    } catch (err) {
        console.log(err);
        res.status(401).send({
            success: false,
            message: 'Invalid or expired Token'
        })

    }


}


export default { requireSignIn };