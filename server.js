const express = require("express");
const app = express();
var port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const Post = require('./models/post.models');
const bodyParser = require('body-parser');
require('dotenv').config();
var cors = require('cors');
const multer = require("multer");
const pug = require("pug");

const uri = process.env.MONGO_URL
mongoose.connect("mongodb+srv://enniszeu:01695419337@cluster0-amfrk.mongodb.net/enniszeu?retryWrites=true&w=majority" ,{useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });


app.use(express.static('puclic'));
app.use(cors());

// app.set('view engine', 'pug');
// app.set('views', './views');

var upload = multer({ dest: 'puclic/uploads/' });

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get("/api/ping", (req, res) => {
  res.send({
    msg: "Hello, World"
  });
});

// app.get('/create', function(req, res){
//      res.render('create')
// })

app.get('/', function(req, res){
    var page = parseInt(req.query.page) || 1;
    var perPage = 3;

    var start = (page - 1) * perPage;
    var end = page * perPage;
    
    Post.find()
        .then(posts => res.json(posts.slice(start, end)))
        .catch(err => res.status(400).json('Err :' + err))
})



//home post
app.get('/manager', function(req, res){
    Post.find()
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json('Err :' + err))
})


//create


app.post('/create',upload.single('imgeFile'), function(req, res){

    var split = '\\';
    var imgName = req.file.path.split(split);

    if(imgName[0] == 'undefined'){
        split = '/';
        imgName = req.file.path.split(split);
    }

    req.body.imgeFile = imgName.slice(1).join(split);
    
    const products = req.body.products;
    const imgeFile = req.body.imgeFile;
    const price = req.body.price;
    const species = req.body.species;
    const describe = req.body.describe;
    const date = req.body.date;


    console.log('products: ' + products)
    console.log('imgeFile: ' + imgeFile)
    console.log('price: ' + price)
    console.log('species: ' + species)
    console.log('describe: ' + describe)
    console.log('date: ' + date)
    //muốn log cái này khi gửi request thì làm sao
    //res undefind

 

    const newUser = new Post({products,species,imgeFile,price,describe,date})

    newUser.save()
        .then(() => res.json('User add'))
        .catch(err => res.status(400).json('Err: ' + err));

});

app.get('/post/:id', function(req, res){
    Post.findById(req.params.id)
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json('Err :' + err))
})
//delete
app.get('/delete/:id', function(req, res){
    Post.findByIdAndDelete(req.params.id)
        .then(posts => res.json("delete id"))
        .catch(err => res.status(400).json('Err :' + err))
})
//upload lollllllllllllllllllllllllll
app.post('/upload/:id', function(req, res){
    Post.findById(req.params.id)
        .then(posts => {
            posts.name = req.body.name;
            posts.conten = req.body.conten;

            posts.save()
                .then(() => res.json('User upload'))
                .catch(err => res.status(400).json('Err: ' + err));
        })
        .catch(err => res.status(400).json('Err: ' + err));
})






app.listen(port, function(){
    console.log("hey,babe tuan" + port)
});