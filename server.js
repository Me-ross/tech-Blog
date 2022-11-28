const path = require('path');
const express = require('express');
// reuiqre handlebar package for view of html pages
const exphbs = require('express-handlebars');
// importing packages for sessions and cookies and creating an instance of the sequelized store
const session = require('express-session');
const helpers = require('./utils/helpers');
// require routes setup in controllers folder
const routes = require('./controllers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// initialize app and create a port
const app = express();
const PORT = process.env.PORT || 3001;

// set handlebars as the default template egnine
const hbs = exphbs.create({ helpers });

// setup session
const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  }),
};

// mount session middleware
app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// setup body and url parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setup static middleware
app.use(express.static(path.join(__dirname, 'public')));

// setup route middleware
app.use(routes);

// sync with db then start server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}!`));
});