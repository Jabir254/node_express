/* eslint-disable no-console */
/* eslint-disable import/extensions */
const express = require("express");
const expressHandlebars = require("express-handlebars");
const handlers = require("./lib/handlers.js");
const bodyParser = require("body-parser");
const multiparty = require("multiparty");
const { credentials } = require("./config.js");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const cors = require('cors')
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

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(`${__dirname}/public`));
app.use(cookieParser(credentials.cookieSecret));

//session middleware
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: credentials.cookieSecret,
  })
);

app.get("/", handlers.home);
app.get("/about", handlers.about);

//signup routes
app.get("/newsletter-signup", handlers.newsletterSignup);
app.post("/newsletter-signup/process", handlers.newsletterSignupProcess);
app.get("/newsletter-signup/thank-you", handlers.newsletterSignupThankYou);

//endpoint for newsletter
app.get("/newsletter", handlers.newsletter);
app.post("/api/newsletter-signup", handlers.api.newsletterSignup);

//fileupload
app.post("/contest/vacation_photo/:year/:month", (req, res) => {
  const form = new multiparty.Form();
  form.parse(req, (err, fields, files) => {
    if (err) return res.status(500).send({ error: err.message });
  });
  handlers.vacationPhotoContestProcess(req, res, fields, files);
});

//API
app.get("/api/vacations", handlers.getVacationsApi);
app.get("/api/vacation/:sku", handlers.getVacationBySkuApi);
app.post(
  "/api/vacation/:sku/notify-when-in-season",
  handlers.addVacationInSeasonListenerApi
);
app.delete("/api/vacation/:sku", handlers.requestDeleteVacationApi);

//handling error
app.use(handlers.notFound);
app.use(handlers.serverError);

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Express started on port ${port}`);
    console.log(`${app.get("env")}`);
  });
} else {
  module.exports = app;
}
