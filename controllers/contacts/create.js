const {createContact} = require("../../service/index");

const create = async (req, res, next) => {
    const { name, email, phone, favorite} = req.body;
    const { _id } = req.user;
    console.log("user", req.user);
    
    try {
      const newContact = await createContact({ name, email, phone, favorite, owner: _id });
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

module.exports = create;

/*
const {Contact} = require("../../models");

const create = async (req, res) => {
    const {_id} = req.user;
    const result = await Contact.create({...req.body, owner: _id});
    res.status(201).json({
        status: "success",
        code: 201,
        data: {
            result
        }
    })
}

module.exports = create;*/