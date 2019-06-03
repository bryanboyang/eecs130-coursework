const mongoose = require('mongoose');

var dishSchema = new mongoose.Schema({
    title: String,
    image: String
})

var Dish = mongoose.model('User', dishSchema);
module.exports = Dish;