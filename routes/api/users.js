const express = require("express");
const router = express.Router();
const ctrlUser = require("../../controllers/users/users"); // signupCtrl loginCtrl currentCtrl
const auth = require("../../middlewares/auth");

const invalidatedTokens = new Set();

const validToken = (req, res, next) => {
    const authHeader = req.headers.autorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (invalidatedTokens.has(token)) {
        return res.status(401).json({
            status: "error",
            code: 401,
            message: "Unathorized: Invalid token",
            data: "Unathorized"
        });
    }
    next();
}

// Routes ----

router.post("/signup", ctrlUser.signupCtrl);

router.post("/login", ctrlUser.loginCtrl);

router.post("/logout", validToken, auth, (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    invalidatedTokens.add(token);
    //console.log(Array.from(invalidatedTokens));

    res.status(204).json({
        status: "success",
        code: 204,
        message: "Successfully logout",
        data: "success"
    });
});

router.get("/current", validToken, auth, ctrlUser.currentCtrl);

module.exports = router;
