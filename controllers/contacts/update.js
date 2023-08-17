const {updateContact} = require("../../service/index");

const update = async (req, res, next) => {
    const { id } = req.params;
    const { name, email, phone, favorite } = req.body;
  
    try {
      const result = await updateContact(id, { name, email, phone, favorite });
      if (result) {
        res.json({
          status: "success",
          code: 200,
          data: { contact: result },
        });
      } else {
        res.status(404).json({
          status: "error",
          code: 404,
          message: `Contact not found by id ${id}`,
          data: "Not found",
        });
      }
    } catch (error) {
      console.error(error);
      next();
    }
  };

  module.exports = update;
  