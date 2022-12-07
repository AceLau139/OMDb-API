//http://www.omdbapi.com/?apikey=bf9d768b&s={keyword}
//apikey=bf9d768b
const Url = 'http://www.omdbapi.com/?apikey=bf9d768b'
const searchBar = document.querySelector('#search-bar');
const result = document.querySelector('.result');
const moviesSection = document.querySelector('#movies-section');

async function getData(url) {
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);

  result.innerHTML = '<h3 id="movies-section" class="sub-heading">Movies</h3>';

  if (data.Response == 'True') {
    console.log(data.Search);

    const resultItem = document.createElement('div'); 
    resultItem.innerHTML = '<div class="resultItem">'+ data.Search[0].Title +'</div>';
    resultItem.innerHTML += '<div class="resultItem">'+ data.Search[1].Title +'</div>';
    resultItem.innerHTML += '<div class="resultItem">'+ data.Search[2].Title +'</div>';

    console.log(resultItem);
    result.insertAdjacentElement('beforeend', resultItem);
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


