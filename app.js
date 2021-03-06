require('dotenv').config();
require("./config/mongodb");

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const session      = require("express-session");
const MongoStore   = require('connect-mongo')(session);
const flash        = require("connect-flash");
const app_name     = require('./package.json').name;
const debug        = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);
const app          = express();
const axios        = require('axios').default;
// const ethUtil      = require('ethereumjs-util');
// const Eth          = require('ethjs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
hbs.registerPartials(path.join(__dirname, "views/partials"));

hbs.registerHelper('ifUndefined', (value, options) => {
  if (arguments.length < 2)
      throw new Error("Handlebars Helper ifUndefined needs 1 parameter");
  if (typeof value !== undefined ) {
      return options.inverse(this);
  } else {
      return options.fn(this);
  }
});
  
app.locals.title = 'Contacth';

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore( { mongooseConnection: mongoose.connection })
}))
app.use(flash());
require('./passport')(app);


// expose login status to the hbs templates
app.use(require("./middlewares/exposeLoginStatus"));

// use web3 functions to connect Metamask & sign messages
// app.use(require("./middlewares/connectMetamask"));
// app.use(require("./middlewares/signMessage"));

app.use("/", require("./routes"));
app.use('/', require('./routes/index'));
app.use('/', require('./routes/contact'));
app.use('/auth', require('./routes/auth'));
// app.use('/metamask', require("./routes/metamask"))
app.use('/', require('./routes/profile'));      

module.exports = app;
