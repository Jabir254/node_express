/* eslint-disable no-console */
/* eslint-disable import/extensions */
const express = require("express");
const expressHandlebars = require("express-handlebars");
const fortune = require("./lib/fortune.js");
const handlers = require("./lib/handlers.js");
const bodyParser = require("body-parser");
const app = express();

// configure Handlebars view engine
app.engine(
  "handlebars",
  expressHandlebars.engine({
    extname: ".hbs",
    defaultLayout: "main.handlebars",
  })
);

app.set("view engine", "handlebars");

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(`${__dirname}/public`));

app.get("/", handlers.home);
app.get("/about", handlers.about);

//signup routes
app.get("/newsletter-signup", handlers.newsletterSignup);
app.post("/newsletter-signup/process", handlers.newsletterSignupProcess);
app.get("/newsletter-signup/thank-you", handlers.newsletterSignupThankYou);

//endpoint for newsletter
app.get("/newsletter", handlers.newsletter);
app.post("/api/newsletter-signup", handlers.api.newsletterSignup);
app.use(handlers.notFound);
app.use(handlers.serverError);

if (require.main === module) {
  app.listen(port, () => console.log(`started on port ${port}`));
} else {
  module.exports = app;
}
