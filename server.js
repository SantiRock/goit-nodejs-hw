const app = require('./app')
const connection = require("./db/connection");
//require("dotenv").config();

const PORT = process.env.PORT || 3000;

connection
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Database connection successful on port ${PORT}`);
    })
  })
  .catch(err => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  });




