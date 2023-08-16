const express = require("express");

const {authToken, validateBody, ctrlWrapper} = require("../middlewares");
const {validationContact} = require("../models/contact");
const {contacts} = require("../controllers")

const router = express.Router();

router.get("/", authToken, ctrlWrapper(contacts.getAll));

router.get("/:id", ctrlWrapper(contacts.getById));

router.post("/", authToken, validateBody(validationContact), ctrlWrapper(contacts.create));

router.put("/:id", validateBody(validationContact), ctrlWrapper(contacts.update));

router.delete("/:id", ctrlWrapper(contacts.remove));

router.patch("/:id/favorite", ctrlWrapper(contacts.patch));

module.exports = router;
