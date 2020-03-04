
const express = require("express");
const app = express();
var port = process.env.PORT || 4000;
const mongoose = require('mongoose');
const Post = require('./models/post.models');
const bodyParser = require('body-parser');
require('dotenv').config();
var cors = require('cors');

const uri = process.env.MONGO_URL
mongoose.connect("mongodb+srv://enniszeu:01695419337@cluster0-amfrk.mongodb.net/enniszeu?retryWrites=true&w=majority" ,{useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });




app.use(express.static('puclic'));
app.use(cors())

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

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
app.get('/manager', async function(req, res){
    Post.find()
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json('Err :' + err))
})


//create


app.post('/create', function(req, res){
    
    

    const products = req.body.products;
    const imgeFile = req.body.imgeFile;
    const price = req.body.price;
    const species = req.body.species;
    const describe = req.body.describe;
    const date = req.body.date;

    const newUser = new Post({products,species,imgeFile,price,describe,date})
    console.log(newUser)
    newUser.save()
        .then(() => res.json('User add'))
        .catch(err => res.status(400).json('Err: ' + err));

    })




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