const express = require("express");
const router = express.Router();
const ctrlContact = require("../controllers");
const { validateBody } = require("../middlewares/validateBody");
const { validationContact } = require("../service/schemas/contact");

router.get("/", ctrlContact.get);

router.get("/:id", ctrlContact.getById);

router.post("/", validateBody(validationContact), ctrlContact.create);

router.put("/:id", validateBody(validationContact), ctrlContact.update);

router.delete("/:id", ctrlContact.remove);

router.patch("/:id/favorite", ctrlContact.patch);

// Export

module.exports = router;