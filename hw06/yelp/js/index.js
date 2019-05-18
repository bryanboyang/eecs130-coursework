const search = (ev) => {
    console.log(document.querySelector('input').value);
    let term = document.querySelector('input').value;
    let url = 'https://www.apitutor.org/yelp/simple/v3/businesses/search?location=' + term;
    fetch(url)
        .then(response => response.json())
        .then(displayResults);
};

const displayResults = (data) => {
    console.log(data);
    let template = ""
    for (dat of data) {
        template += "<div class = card>";
        src = (dat['image_url']);
        template += "<img src =" + src + " class = picture>";
        template += '<ul>'
        template += '<li><h2>' + dat['name'] +'</h2></li>'
        template += '<li>' + dat['display_address'] +'</li>'
        template += '<li class = caption>' + "Price: " + dat['price'] +'</li>'
        template += '<li class = caption>' + "Review count: " + dat['review_count'] +'</li>'
        template += '<ul>'
        template += '</div>'
    }
    document.querySelector('#output').innerHTML = template;
};

document.querySelector('#search').onclick = search;