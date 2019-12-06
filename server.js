const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const passport = require('passport')

const app = express();

//bodyParser middleware
app.use(bodyParser.json());

//DB config
const db = process.env.MONGODB_URL;

console.log(process.env);
//DB Connection
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.log(error);
  });

const port = process.env.PORT || 8080;

//middlewares
app.use(cors());
app.use(express.json());

//passport init
// app.use(passport.initialize());
// require('./config/passport')(passport);

app.use(require('./routers/user'));

app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});
