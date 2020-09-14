let User = require("./model/user");

// Signin API
app.get("/sigin", (req, res) => {
  res.send("Hello World!");
});

// Registration API
app.get("/register", (req, res) => {
  res.send("Hello World!");
});

// Services API
app.get("/services", (req, res) => {
  res.send("Hello World!");
});

app.get("/services/id", (req, res) => {
  res.send("Hello World!");
});

// Shop API
app.get("/shop", (req, res) => {
  res.send("Hello World!");
});

app.get("/shop/id", (req, res) => {
  res.send("Hello World!");
});
