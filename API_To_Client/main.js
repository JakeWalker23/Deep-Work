// find the DOM elements 
const app = document.getElementById('root');
const apiContainer = document.createElement('div');

// make a class for the container
apiContainer.setAttribute("class", "apiContainer");

// put the container in the app
app.appendChild(apiContainer);

// new clientside XMLHttpRequest call
let apiRequest = new XMLHttpRequest();

// open the request with the paramaters METHOD, URL, (True)
apiRequest.open("GET", "https://ghibliapi.herokuapp.com/films", true);
apiRequest.onload = function() {

var apiData = JSON.parse(this.response);
    apiData.forEach(data => {

// make a card for each data element from the API
    const apiCard = document.createElement('div');
          apiCard.setAttribute('class', 'apiCard');
    
// append each card into the container
          apiContainer.appendChild(apiCard);
    const apiHeader = document.createElement('h1')
          apiHeader.textContent = data.title;
    
// card text from api
    const apiText = document.createElement('p');
          apiText.textContent = data.description;           
    
//append data to card
    apiCard.appendChild(apiHeader);
    apiCard.appendChild(apiText);
    })
}

// GO.
apiRequest.send()
