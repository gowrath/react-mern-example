let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');

require("dotenv").config()

const uri = "mongodb+srv://mern:database@cluster0.pt6ch.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const path = require("path")

// Express Route
const studentRoute = require('./routes/student.route');
const { MongoClient } = require('mongodb');

// Connecting mongoDB Database
mongoose.Promise = global.Promise;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Database successfully connected!')
},
  error => {
    console.log('Could not connect to database : ' + error)
  }
)
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());
app.use('/students', studentRoute)
app.use(express.static(path.join(__dirname, "build")))


// PORT
const port = process.env.PORT || 5000;

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});


app.listen(port, () => {
  console.log('Connected to port ' + port)
})


