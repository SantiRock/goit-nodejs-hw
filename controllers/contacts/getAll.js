const {getAllContacts} = require("../../service/index");

const getAll = async (_, res, next) => {
    try {
      const contacts = await getAllContacts();
 
      res.json({
        status: "success",
        code: 200,
        data: {
          contacts: contacts,
        },
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
};

module.exports = getAll;