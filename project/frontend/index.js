const displayDishes = (data) => {
    document.querySelector('#output').innerHTML = JSON.stringify(data, null, 4);
}

fetch('http://localhost:8888/api/dishes')
    .then(response => response.json())
    .then(displayDishes);

