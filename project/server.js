const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const app = express();
const unirest = require('unirest');
const Dish = require('./schema');
const mongoose = require('mongoose');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', router);

router.get('/search/:query/:cuisine/:type', (req, res) => {
    console.log('searching dish');
    console.log(req.params.query);
    console.log(req.params.cuisine);
    console.log(req.params.type);
    let url = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?cuisine=" + req.params.cuisine + "&number=10&offset=0&type=" + req.params.type + "&query=" + req.params.query;
    unirest.get(url)
    .header("X-RapidAPI-Host", "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com")
    .header("X-RapidAPI-Key", process.env.API_KEY)
    .end(function (result) {
        console.log(result.status, result.headers, result.body);
        res.send(result.body.results);
    })
})

router.post('/save', (req, res) => {
    console.log('saving something');
    console.log(req.body);
    var newDish = new Dish(req.body);
    console.log(newDish);
    newDish.save()
    .then(item => {
        res.send('item saved to DB');
    })
    .catch(err => {
        res.status(400).send({message: err.message});
    })
})

router.get('/dishes', (req, res) => {
    Dish.find({})
        .exec((err, dishes) => {
            if(err) {
                res.status(400).send({message: err.message});
            } else {
                // let dishMap = {};
                // dishes.forEach((dish) => {
                //     dishMap[dish._id] = dish;
                // })
                res.send(dishes);
            }
        })
})

mongoose.connect('mongodb://localhost/eecs130', function(err){
    console.log(`Listening on port ${process.env.PORT || 8888}`);
    app.listen(process.env.PORT || 8888);
});