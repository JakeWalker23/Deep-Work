// find the DOM elements 
const app = document.getElementById('root');
const container = document.createElement('div');

// append the container to the root div.
container.setAttribute("class", "container");
app.appendChild(container);

// new clientside XMLHttpRequest
let request = new XMLHttpRequest();

// set the paramaters for the request. METHOD, URL, True
request.open("GET", "https://ghibliapi.herokuapp.com/films", true);

// onLoad, forEach all this data into the DOM
request.onload = function() {
    console.log("script is working");
    var data = JSON.parse(this.response);

        data.forEach(data => {
            // make a card for each data element from the API
            const card = document.createElement('div');
            card.setAttribute('class', 'card');
            
            // append each card into the container
            container.appendChild(card);
            const h1 = document.createElement('h1')
            h1.textContent = data.title;
            
            const p = document.createElement('p');
            p.textContent = data.description;           
            
            card.appendChild(h1);
            card.appendChild(p);




        })
}

// send request to the server
request.send()