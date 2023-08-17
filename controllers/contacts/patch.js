const {patchFavorite} = require("../../service/index");

const patch = async (req, res, next) => {
    const { id } = req.params;
    const { favorite } = req.body;
  
    try {
      const result = await service.patchFavorite(id, { favorite });
      console.log('r ',result);
      if (!result) {
        return res.status(400).json({
          status: "failed",
          code: 400,
          message: "missing field favorite",
        })
      }
      res.status(200).json({
        status: "success",
        code: 200,
        data: { contact: result },
      });
    } catch (error) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Contact not found by id ${id}`,
        data: "Not found",
      });
      console.error(error);
      next();
    }
  };

  module.exports = patch;