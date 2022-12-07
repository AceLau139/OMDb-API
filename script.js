const Url = 'http://www.omdbapi.com/?apikey=bf9d768b'
const searchBar = document.querySelector('#search-bar');
const result = document.querySelector('.result');
const moviesSection = document.querySelector('#movies-section');
const tvSection = document.querySelector('#tv-section');
const userInput = searchBar.value.trim();

//Send request to the API & Get data from API
async function getData(keyword, type) {
  const url = `http://www.omdbapi.com/?apikey=bf9d768b&type=${type}&s=${keyword}`
  console.log(url);
  
  const res = await fetch(url);
  const data = await res.json();

  console.log(`type: ${type}`);
  console.log(data);

  if (data.Response == 'True') {
    resultDisplay(data.Search, type);  
  }
}

//Display results
function resultDisplay(film, type) {
  resultList = film.slice(0, 3);
  console.log(resultList);

  //
  const filmTitle = resultList.map(film => {
    const filmName = boldString(film.Title, userInput);
    console.log(filmName);

    for(i=0; i<resultList.length; i++) {
      `<div class="block hover:bg-gray-200 rounded px-2 py-1">${filmName}</div>`;
    };
  })

  if (type == 'movie'){
    moviesSection.insertAdjacentHTML('beforeend', filmTitle);
  }
  else if (type == 'series'){
    tvSection.insertAdjacentHTML('beforeend', filmTitle);
  }

  console.log(resultItem);
  result.insertAdjacentElement('beforeend', resultItem);

}

// Search function and sending request to the API
function search() {
  const userInput = searchBar.value.trim();
  console.log(userInput);

  getData(userInput, 'movie');
  getData(userInput, 'tv');

  if (userInput.length > 0) {
    moviesSection.classList.remove('hidden');
    tvSection.classList.remove('hidden');
  }else {
    moviesSection.classList.add('hidden');
    tvSection.classList.add('hidden');
  }
}

searchBar.addEventListener('input', search);
