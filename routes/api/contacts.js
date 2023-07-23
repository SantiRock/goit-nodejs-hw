const express = require('express');
const { listContacts, getContactById, addContact, removeContact, updateContact } = require('../../models/contacts');
const router = express.Router()
const { validateBody } = require("../../middlewares/validateBody")
const { validationContact } = require("../../schemas/contacts");

router.get('/', async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
});

router.get('/:contactId', async (req, res, next) => {
  const contact = await getContactById(req.params.contactId);
  if (!contact) {
    return res.status(404).json({
      message: "Not found",
    })
  }
  return res.status(200).json(contact)
})

router.post('/', validateBody(validationContact), async (req, res, next) => {
  const newContact = await addContact(req.body);
  if (!newContact) {
    return res.status(400).json({
      message: "missing required field"
    })
  }
  validateBody(validationContact);
  return res.status(201).json(newContact);
})

router.delete('/:contactId', async (req, res, next) => {
  const newContacts = await removeContact(req.params.contactId);
  if (!newContacts) {
    return res.status(404).json({
      message: "Not found"
    })
  }
  return res.status(200).json({mensaje: "contacto eliminado"});
})

router.put('/:contactId', validateBody(validationContact), async (req, res, next) => {
  const contact = await updateContact(req.params.contactId, req.body);
  if (contact === "no body") {
    return res.status(400).json({message: "missing fields"})
  } else if (!contact) {
    return res.status(404).json({message: "Not found"})
  } else {
    return res.status(200).json(contact);
  }
})

module.exports = router
