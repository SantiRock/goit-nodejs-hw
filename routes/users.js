const express = require("express");

const {authToken, validateBody, ctrlWrapper} = require("../middlewares");
const {users} = require("../controllers");
const {joiSignupSchema, joiLoginSchema} = require("../models/users");

const router = express.Router();

router.post("/signup", validateBody(joiSignupSchema), ctrlWrapper(users.signupCtrl));

router.post("/login", validateBody(joiLoginSchema), ctrlWrapper(users.loginCtrl));

router.get("/logout", authToken, ctrlWrapper(users.logoutCtrl));

router.get("/current", authToken, ctrlWrapper(users.currentCtrl));

module.exports = router;
