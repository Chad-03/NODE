const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var bcrypt = require("bcryptjs");

const app = express();


var corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;
const Goods = db.goods;
const User = db.user;

db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  initial();
});

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });

  Goods.create({
    goods_name:"wallet",
    goods_desc:"Gucci Classic Men's Wallet",
    img_url:"wallet.jpg",
    amount:1,
    price:10000.0,
    owner_id: 2
  });

  Goods.create({
    goods_name:"watch",
    goods_desc:"Rolex classic male water ghost",
    img_url:"watch.jpg",
    amount:1,
    price:20000.0,
    owner_id: 2
  });

  Goods.create({
    goods_name:"Longines watch",
    goods_desc:"Longines Classic Men's Watch",
    img_url:"watch1.jpg",
    amount:1,
    price:21000.0,
    owner_id: 2
  });

  Goods.create({
    goods_name:"handbag",
    goods_desc:"Gucci classic female water handbag11111",
    img_url:"handbag.jpg",
    amount:1,
    price:15000.0,
    owner_id: 2
  });

  Goods.create({
    goods_name:"pocket_watch",
    goods_desc:"Old pocket watch set in gold",
    img_url:"pocket_watch.jpg",
    amount:1,
    price:32000.0,
    owner_id: 1
  });

  Goods.create({
    goods_name:"vase",
    goods_desc:"Enamel vase",
    img_url:"vase.jpg",
    amount:1,
    price:31000.0,
    owner_id: 1
  });

  User.create({
    username:'test1',
    email:"123456789@email.com",
    password: bcrypt.hashSync('test123', 8),
    coins:200000
  });

  User.create({
    username:'test2',
    email:"123456789@email.com",
    password: bcrypt.hashSync('test123', 8),
    coins:200000
  });
}

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/goods.routes')(app);


// set port, listen for requests

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});