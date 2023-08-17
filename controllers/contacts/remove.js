const {removeContact} = require("../../service/index");

const remove = async (req, res, next) => {
    const { id } = req.params;
    try {
      const result = await removeContact(id);
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

module.exports = remove;