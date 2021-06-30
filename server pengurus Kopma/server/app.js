//tempat untuk menjalankan program  
//connect ke mongodb dan firebase

const express = require('express'); //mendefinisikan expressjs
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./route/route');
app.use(cors())
app.use(bodyParser.json())
app.use(router)
const mongoose = require("mongoose");

app.get('/', (req, res) => {
  res.send('Server CRUD Pengurus KOPMA');
})

//connect to mongodb
mongoose.connect(
  "mongodb+srv://testdatabase:test123@cluster0.mzdrw.mongodb.net/dbPengurus?retryWrites=true&w=majority", //url database mongo
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("Db connected")
)

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
})