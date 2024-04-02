const express = require("express");
const expressHandlebars = require("express-handlebars");

const app = express();
const port = process.env.PORT || 3000;

app.engine(
  "handlebars",
  expressHandlebars({
    defaultLayout: "main",
  })
);
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  res.type("text/plain");
  res.send("Hello World!");
});
app.get("/about", (req, res) => {
  res.type("text/plain");
  res.send("About Travels");
});
app.use((req, res) => {
  res.type("text/plain");
  res.status(404);
  res.send("404 - Not found");
});

// custom 500 page
app.use((err, req, res, next) => {
  console.error(err.message);
  res.type("text/plain");
  res.status(500);
  res.send("500 - Server Error");
});

app.listen(port, () => console.log(`started on cort ${port}`));
