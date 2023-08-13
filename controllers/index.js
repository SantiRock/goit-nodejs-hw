const service = require("../service/index");

const get = async (_, res, next) => {
    try {
      const contacts = await service.getAllContacts();
 
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
  
  const getById = async (req, res, next) => {
    const { id } = req.params;
    try {
      const contact = await service.getContactById(id);
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
  
  const create = async (req, res, next) => {
    const { name, email, phone, favorite } = req.body;
    try {
      const newContact = await service.createContact({ name, email, phone, favorite });
      if (!newContact) {
        return res.status(400).json({
          status: "failed",
          code: 400,
          message: "missing required field",
        })
      }
      res.status(201).json({
        status: "success",
        code: 201,
        data: { contact: newContact },
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
  
  const update = async (req, res, next) => {
    const { id } = req.params;
    const { name, email, phone, favorite } = req.body;
  
    try {
      const result = await service.updateContact(id, { name, email, phone, favorite });
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
  
  const remove = async (req, res, next) => {
    const { id } = req.params;
    try {
      const result = await service.removeContact(id);
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


  
  module.exports = {
    get,
    getById,
    patch,
    create,
    update,
    remove,
  };
  
