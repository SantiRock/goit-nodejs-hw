const jwt = require("jsonwebtoken");
const { User } = require("../../models");
const { getUserByEmail } = require("../../service/index");
require("dotenv").config();
const secret = process.env.SECRET


const loginCtrl = async (req, res) => {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);

    if(!user || !user.validPassword(password)) {
        return res.status(400).json({
            status: "error",
            code: 400,
            message: "Incorrect login or password",
            data: "Bad request",
        });
    }
    
    const payload = {
        id: user.id,
        username: user.username,
    };

    const token = jwt.sign(payload, secret);
    await User.findByIdAndUpdate(user._id, {token});
    res.json({
        status: "success",
        code: 200,
        data: {
            token,
            email,
            subscription: user.subscription,
        },
    });
};

module.exports = loginCtrl;