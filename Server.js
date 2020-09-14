const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

let routes = require("./routes/routes.js");

app.get("/signin", (req, res) => {
  routes.signIn(res);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
