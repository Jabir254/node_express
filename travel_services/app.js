/* eslint-disable no-console */
/* eslint-disable import/extensions */
const express = require('express');
const expressHandlebars = require('express-handlebars');
const fortune = require('./lib/fortune.js');
const handlers = require('./lib/handlers.js');

const app = express();

// configure Handlebars view engine
app.engine(
  'handlebars',
  expressHandlebars.engine({
    extname: '.hbs',
    defaultLayout: 'main',
  }),
);

app.set('view engine', 'handlebars');

const port = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/public`));

app.get('/', handlers.home);
app.get('/about', handlers.about);
app.use(handlers.notFound);
app.use(handlers.serverError);

if (require.main === module) {
  app.listen(port, () => console.log(`started on port ${port}`));
} else {
  module.exports = app;
}
