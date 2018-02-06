const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const router = require('./routes/users')

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use(router)

app.listen(4000, () => {
  console.log("server successfully runing on port 4000");
});
