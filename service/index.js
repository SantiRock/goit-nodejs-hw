const {Contact} = require("./schemas/contact");
const User = require("./schemas/users");

const getAllContacts = async () => {
    return await Contact.find();
};

const getContactById = async (id) => {
    return await Contact.findOne({ _id: id });
};

const createContact = async ({name, email, phone, favorite}) => {
    if (!name || !email || !phone) return null;
    return await Contact.create({ name, email, phone, favorite });
};

const updateContact = async (id, fields) => {
    return await Contact.findByIdAndUpdate({_id: id}, fields, {new: true});
};

const removeContact = async (id) => {
    return await Contact.findByIdAndRemove({_id: id});
};

const patchFavorite = async (id, {favorite}) => {
    console.log('f: ', favorite);
    if(favorite === undefined) return null;
    return await Contact.findByIdAndUpdate({_id: id}, {favorite}, {new: true});
}

const getUserByEmail = async (email) => {
    return await User.findOne({email});
};

module.exports = {
    getAllContacts,
    getContactById,
    createContact,
    updateContact,
    removeContact,
    patchFavorite,
    getUserByEmail
}

