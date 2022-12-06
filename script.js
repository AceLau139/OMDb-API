//http://www.omdbapi.com/?apikey=bf9d768b&s={keyword}
//apikey=bf9d768b
var Url = 'http://www.omdbapi.com/?apikey=bf9d768b'
var searchBar = document.querySelector('#search-bar');
var result = document.querySelector('.result');

async function getData(url) {
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  if (data.Response == 'True') {
    console.log(data.Search);
    const resultItem = document.createElement('li');
    //resultItem.className = 'resultItem';
    resultItem.innerHTML = '<li class="resultItem">'+ data.Search.Title +'</li>';
    console.log(resultItem);
    result.insertAdjacentHTML('beforeend', resultItem);
  }
}

function search() {
  var userInput = searchBar.value.trim();
  console.log(userInput);

  const movieUrl = Url + '&type=movie&s=' + userInput;
  const tvUrl = Url + '&type=series&s=' + userInput;

  getData(movieUrl)
  getData(tvUrl)
}

searchBar.addEventListener('input', search);


// Create elements li + append


// F.Render results
//result.innerHTML


