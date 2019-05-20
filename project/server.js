const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const app = express();
const unirest = require('unirest');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});
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


console.log(`Listening on port ${process.env.PORT || 8888}`);
app.listen(process.env.PORT || 8888);