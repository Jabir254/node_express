const express = require("express");
const expressHandlebars = require("express-handlebars");

const app = express();

// configure Handlebars view engine
app.engine('handlebars', expressHandlebars.engine({
 defaultLayout: 'main',
}))

app.set('view engine', 'handlebars')

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'))


app.get("/", (req, res) => res.render('home'));

app.get('/about', (req, res) => res.render('about'))

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
