const {User} = require("../../models");

const currentCtrl = async (req, res) => {
    const { username, email, subscription } = req.user;
    res.json({
        status: "success",
        code: 200,
        data: {
            message: `Authorization was successfull: ${username}`,
            email,
            subscription
        },
    });
};

module.exports = currentCtrl;
