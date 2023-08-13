const jwt = require("jsonwebtoken");
//const passport = require("passport");
const User = require("../service/schemas/users");
const { getUserByEmail } = require("../service/index");
require("dotenv").config();
const secret = process.env.SECRET

const signupCtrl = async (req, res, next) => {
    const { username, email, password } = req.body;
    console.log(username);
    const user = await getUserByEmail(email);

    if (user) {
        return res.status(409).json({
            status: "error",
            code: 409,
            massage: "Email is already in use",
            data: "Conflict",
        });
    }

    try {
        const newUser = new User({ username, email });
        newUser.setPassword(password);
        await newUser.save();

        res.status(201).json({
            status:"success",
            code: 201,
            data: {
                message: "Registration successful",
            },
        });
    } catch (e) {
        next(e);
    }
};

const loginCtrl = async (req, res, next) => {
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

const currentCtrl = async (req, res, next) => {
    const { username, email, subscription } = req.user;
    res.json({
        status: "success",
        code: 200,
        data: {
            message: `Authorization was successfull: ${username}`,
            email,
            subscription
        },
    });
};


module.exports = {
    signupCtrl,
    loginCtrl,
    currentCtrl
}

