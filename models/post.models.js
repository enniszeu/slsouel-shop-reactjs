var mongoose = require('mongoose');


var postSchema = new mongoose.Schema({
	products : String,
	imgeFile: String,
	price: String,
	species:String,
	kho:String,
	describe:String,
	describe:String,
	date:String,
	color1:String,
	color2:String,
	color3:String,
	color4:String,
	color5:String,
	image1:String,
	image2:String,
	image3:String,
	image4:String,
});

var Post = mongoose.model('Post', postSchema, 'post');

module.exports = Post;