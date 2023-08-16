const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require("dotenv").config();

const contactsRouter = require('./routes/contacts');
const usersRouter = require('./routes/users');

const app = express();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
app.use(logger(formatsLogger));
app.use(express.json());
app.use(cors());

require("./config/config-passport");

app.use('/api/contacts', contactsRouter);
app.use('/api/users', usersRouter);

app.use((_, res) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: `Use api on routes:
    /api/signup - registration user {username, email, password}
    /api/login - login {email, password}
    /api/list - get message if user is authenticated
    /api/contacts - contacts`,
    data: "Not found" 
    })
})

app.use((err, _, res) => {
  res.status(500).json({
    status: "fail",
    code: 500, 
    message: err.message,
    data: "Internal Server Error" 
  })
})


module.exports = app
