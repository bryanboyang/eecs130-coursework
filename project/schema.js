const mongoose = require('mongoose');

var dishSchema = new mongoose.Schema({
    title: String,
    cuisine: String
})

var Dish = mongoose.model('User', dishSchema);
module.exports = Dish;