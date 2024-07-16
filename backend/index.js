const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dishesRoute = require('./routes/dishes');
const allDishesRoute = require('./routes/allDishes');


const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/restaurantDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('MongoDB connected successfully');
});

console.log("31");

app.use('/dishes', dishesRoute);
console.log("35");
app.use('/allDishes', allDishesRoute);


server.listen(PORT, () => {
  console.log(`Server connected successfully at PORT: ${PORT}`);
});
