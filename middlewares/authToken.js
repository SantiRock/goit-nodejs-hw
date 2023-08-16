const jwt = require("jsonwebtoken");
const  {User} = require("../models");
const {SECRET} = process.env;

const authToken = async(req, res, next) => {
    const {authorization = ""} = req.headers;
    const [bearer, token] = authorization.split(" ");

    console.log("token: ", token);

    try{
        if(bearer !== "Bearer"){
            return res.status(401).json({
                status: "error",
                code: 401,
                message: "Unauthorizeddd: Invalid token",
                data: "Unauthorized"
            });
        }
        const {id} = jwt.verify(token, SECRET);
        const user = await User.findById(id);

        if(!user || !user.token){
            return res.status(401).json({
                status: "error",
                code: 401,
                message: "Unauthorized: Invalid token",
                data: "Unauthorized"
            });
        }
        
        req.user = user;
        next();
    } catch (error) {
        if(error.message === "Invalid signature"){
            error.status = 401;
        }
        next(error);
    }
}

module.exports = authToken;


