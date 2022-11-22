var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var Auth = require("./authentication");

var bodyParser = require("body-parser");
var cors = require('cors');
var fileupload = require("express-fileupload");


if(process.env.BOILER == 'true'){
  async function run() {
    console.log("Running boilerplate");
    boilerplate = require("./boilerplate");
    await boilerplate.runNathan();
    console.log("Boilerplate complete");
  }
  run();  
}
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user.routes');
var moduleRouter = require('./routes/module.routes');
var courseRouter = require('./routes/course.routes');
var attendanceRouter = require('./routes/attendanceRecord.routes');
var sessionRouter = require('./routes/session.routes');
var authRouter = require('./routes/authentication.routes');
var fileuploadRouter = require('./routes/fileupload.routes');
var reportingRouter = require('./routes/reporting.routes');

function Authenticate(req, res, next){
  if (req.path.toLowerCase() == '/login') {
    next();
    return;
  }
  var result = Auth.verifyToken(req);
  if (result.Status == 200)
  {
    next();
  }
  else{
    res.status(result.Status).send({ message: result.Message });
  }
}

var app = express();

app.use(cors());
app.use(fileupload());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(Authenticate);
app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/', moduleRouter);
app.use('/', courseRouter);
app.use('/', attendanceRouter);
app.use('/', sessionRouter);
app.use('/', authRouter);
app.use('/', fileuploadRouter);
app.use('/', reportingRouter);

//Database connection code
const db = require("./models");
db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to the database!");
}).catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  //res.render('error');
});

module.exports = app;
