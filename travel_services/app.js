const express = require("express");
const expressHandlebars = require("express-handlebars");
const fortune = require("./fortune.js");
const handlers = require("./lib/handlers.js");

const app = express();

// configure Handlebars view engine
app.engine(
  "handlebars",
  expressHandlebars.engine({
    defaultLayout: "main",
  })
);

app.set("view engine", "handlebars");

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));

app.get("/", handlers.home);
app.get("/about", handlers.about);
app.use(handlers.notFound);
app.use(handles.serverError);

app.listen(port, () => console.log(`started on port ${port}`));
