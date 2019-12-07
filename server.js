const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const app = express();

//bodyParser middleware
app.use(bodyParser.json());

//DB config
const db = process.env.MONGODB_URL;


//DB Connection
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
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

require('./routers')(app);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});
