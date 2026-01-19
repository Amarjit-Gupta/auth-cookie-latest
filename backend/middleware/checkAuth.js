import Jwt from 'jsonwebtoken';
const checkAuth = (req, res, next) => {

    try {
        let token = req.cookies?.token;
        if(!token){
            return res.status(401).json({success:false,message:"Not authorized login again..."});
        }
        let decode = Jwt.verify(token,process.env.JWT_KEY);
        if(!decode.id){
            return res.status(401).json({success:false,message:"Invalid token..."});
        }
        // console.log(decode);
        req.user = decode.id
        next();
    }
    catch (err) {
        return res.status(401).json({success:false, message: "Not Authorized login again..." });
    }
}

export default checkAuth;