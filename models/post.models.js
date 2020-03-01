var mongoose = require('mongoose');


var postSchema = new mongoose.Schema({
	products : String,
	imageName: String,
	price: String,
	species:String,
	describe:String,
	describe:String,
	date:String
});

var Post = mongoose.model('Post', postSchema, 'post');

module.exports = Post;