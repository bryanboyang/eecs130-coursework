dishes = [];
const displayDishes = (data) => {
    dishes = data;
    let template = ""
    document.querySelector('#output').innerHTML = template;
    let i = 0;
    for (dat of data) {
        let template = `
            <div class="card" data-index=${i}>
            <img src =https://spoonacular.com/recipeImages/${dat.image} class = picture>
            <ul>
            <li><h2> ${dat.title} </h2></li>
            <li><button class="save" onclick=saveDish(${i})>Save</button></li>
            <ul>
            </div>`;
        // src = (dat['image']);
        // Save(${dat.title},${dat.image}) 
        // template += ''
        // template += '<li>' + dat['display_address'] +'</li>'
        // template += '<li class = caption>' + "Cuisine: " + dat['cuisine'] +'</li>'
        // template += '<li class = caption>' + "Review count: " + dat['review_count'] +'</li>'
        // template += ''
        // template += ''
        i += 1;
        document.querySelector('#output').innerHTML += template;
    }
    // JSON.stringify(data, null, 4);
}

const displaySaved = (data) => {
    dishes = data;
    let template = ""
    document.querySelector('#output').innerHTML = template;
    let i = 0;
    for (dat of data) {
        let template = `
            <div class="card" data-index=${i}>
            <img src =https://spoonacular.com/recipeImages/${dat.image} class = picture>
            <ul>
            <li><h2> ${dat.title} </h2></li>
            <ul>
            </div>`;
        i += 1;
        document.querySelector('#output').innerHTML += template;
    }
    // JSON.stringify(data, null, 4);
}

const search = (ev) => {
    let query = document.querySelector('.query').value;
    let cuisine = document.querySelector('.cuisine').value;
    let type = document.querySelector('.type').value;
    let url = 'http://localhost:8888/api/search/'+cuisine+'/'+type+'/'+query;
    fetch(url)
        .then(response => response.json())
        .then(displayDishes);
};

const viewSaved = (ev) => {
    fetch('http://localhost:8888/api/dishes')
        .then(response => response.json())
        .then(displaySaved);
};

const saveDish = (i) => {
    console.log('mounted');
    console.log(dishes[i]);
    data = {title: dishes[i].title, image: dishes[i].image};
    console.log(data);
    fetch('http://localhost:8888/api/save', {
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(data)
    })
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
        
};


// for (item of document.querySelectorAll('.save')) {
//     item.onclick = saveDish;
// }
document.querySelector('#search').onclick = search;
document.querySelector('#viewsaved').onclick = viewSaved;