const expviews = require('express-react-views');
const express = require('express');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load()
}
const bodyParser = require('body-parser');

const app = express();

// Configuration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/static')); // Serve static css and js files
app.set('views', __dirname + '/views'); // Set views directory

app.set('view engine', 'jsx'); // Use React
app.engine('jsx', expviews.createEngine()); // -:-

const PORT = process.env.PORT || 4000; // Use port 4000 if none is specified

// Start listen server on PORT.
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}.`);
});

// Set up mongoose connection
const mongoose = require('mongoose');

const database = process.env.DB_URL.replace("{db-name}", "inventory") + "?retryWrites=true";
mongoose.connect(database, {
  useNewUrlParser: true,
  auth: {
    user: process.env.DB_USER,
    password: process.env.DB_PSW
  }
});

mongoose.connection.on('error', console.error.bind(console, 'MongoDB conection error: '));
mongoose.set('useCreateIndex', true)

const IndexRouter = require(__dirname + '/routes/index');
const ObjectsRouter = require(__dirname + '/routes/objects');
app.use('/', IndexRouter);
app.use('/Users/', ObjectsRouter);
