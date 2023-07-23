const fs = require('fs/promises');

const { nanoid } = require("nanoid");

const listContacts = async () => {
  const contactsList = await fs.readFile("models/contacts.json");
  return JSON.parse(contactsList);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find(item => item.id === contactId);
  return contact || null;
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  if (!name || !email || !phone) return null;

  const contacts = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  contacts.push(newContact);

  await fs.writeFile("models/contacts.json", JSON.stringify(contacts, null, 2));
  return newContact
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === contactId);
  if (index === -1) return null;

  const newContacts = contacts.splice(index, 1);
  await fs.writeFile("models/contacts.json", JSON.stringify(contacts, null, 2));

  return newContacts; 
}

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  if (!name & !email & !phone) return "no body";
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex(item => item.id === contactId);
  if (contactIndex === -1) return null;
  const currentContact = contacts[contactIndex];

  if (name) {
    currentContact.name = name;
  }
  if (email) {
    currentContact.email = email;
  }
  if (phone) {
    currentContact.phone = phone
  }

  await fs.writeFile("models/contacts.json", JSON.stringify(contacts, null, 2));

  return currentContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
