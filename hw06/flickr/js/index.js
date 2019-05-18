const search = (ev) => {
    console.log(document.querySelector('input').value);
    let term = document.querySelector('input').value;
    let url = 'https://www.apitutor.org/flickr/simple/?tags=' + term;
    fetch(url)
        .then(response => response.json())
        .then(displayResults);
};

const displayResults = (data) => {
    console.log(data);
    let template = ""
    for (dat of data) {
        template += "<div class = card>";
        src = (dat['img_url']);
        console.log(src);
        template += "<img src =" + src + " class = picture>";
        template += '<h2>' + dat['title'] +'</h2>'
        template += '</div>'
    }
    document.querySelector('#output').innerHTML = template;
    //JSON.stringify(data, null, 4);
};

document.querySelector('#search').onclick = search;