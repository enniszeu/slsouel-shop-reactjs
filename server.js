const express = require("express");
const app = express();
var port = process.env.PORT || 3000;
var admin = require("firebase-admin");
var bodyParser = require('body-parser');
const cors = require("cors");
var multer  = require('multer')

//conect firebase
var serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://slsouel.firebaseio.com",
  storageBucket: "https://slsouel.firebaseio.com"
});
var db = admin.database();


var upload = multer({ dest: 'puclic/uploads/' });

// app.set("view engine", "pug");
// app.set("views", "./views")


app.use(cors());

app.get("/api/ping", (req, res) => {
  res.send({
    msg: "Hello, World"
  });
});

//body [parse]
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 



app.post("/create", upload.single('imgeFile'), (req, res)=>{

	req.body.imgeFile = "uploads/" + req.file.path.split('puclic\\uploads\\').slice(1).join('/');


	var post = {
		products : req.body.products,
		price: req.body.price,
	    species : req.body.species,
	    describe : req.body.describe,
	    date : req.body.date,
	    image: req.body.imgeFile
	    // url : req.body.url
	}

	db.ref('slsouel/').push(post)
		.then(() => res.json('User add'))
        .catch(err => res.status(400).json('Err: ' + err));
	
})
// app.get('/create', (req, res) =>{
// 	res.render('create');
// })


app.get("/manager", (req, res)=>{
	const products = []
	db.ref('slsouel/').once('value', function(snapshot) {
	  snapshot.forEach(function(childSnapshot) {

	    var data ={
	    	_id : childSnapshot.key,
	    	post : childSnapshot.val()
	    }
	    products.push(data)
	  });
	})
	.then(() => res.json(products))
    .catch(err => res.status(400).json('Err: ' + err));;

	
})

app.get("/product", (req, res)=>{
	const products = []
	db.ref('slsouel/').once('value', function(snapshot) {
	  snapshot.forEach(function(childSnapshot) {

	    var data ={
	    	_id : childSnapshot.key,
	    	data : childSnapshot.val()
	    }
	    products.push(data)
	  });
	})
	.then(() =>  res.json(products))
    .catch(err => res.status(400).json('Err: ' + err));


	
})



app.get('/product/:id', (req, res) =>{
	var id = req.params.id;
	db.ref('slsouel/').child(id).once('value')
		.then(function(snap){
			res.json(data)
		})
		.catch(err => res.status(400).json('Err: ' + err));
	})


app.get('/delete/:id', (req, res) =>{
	var id = req.params.id;
	db.ref('slsouel/').child(id).remove()
	.then(() => res.send("delete acess"))
    .catch(err => res.status(400).json('Err: ' + err));
	
})


app.listen(port, ()=>{
	console.log(`helo tuan ${port}`)
})