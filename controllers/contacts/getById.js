const {getContactById} = require("../../service/index");

const getById = async (req, res, next) => {
    const { id } = req.params;
    try {
      const contact = await getContactById(id);
        res.json({
          status: "success",
          code: 200,
          data: {
            contact: contact,
          },
        });
    } catch (error) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Contact not found by id ${id}`,
        data: "Not found",
      });
      console.error(error);
      next(error);
    }
  };

  module.exports = getById;

