const Url = 'http://www.omdbapi.com/?apikey=bf9d768b'
const searchBar = document.querySelector('#search-bar');
const result = document.querySelector('.result');
const moviesSection = document.querySelector('#movies-section');
const tvSection = document.querySelector('#tv-section');
const moviesResult = document.querySelector('#movies-result');
const tvResult = document.querySelector('#tv-result');

//Send request to the API & Get data from API
async function getData(keyword, type) {
  const url = `http://www.omdbapi.com/?apikey=bf9d768b&type=${type}&s=${keyword}`
  //console.log(url);
  
  const res = await fetch(url);
  const data = await res.json();

  console.log(`type: ${type}`);
  //console.log(data);

  if (data.Response == 'True') {
    resultDisplay(data.Search, type);  
  }
}

//Bolding
function bolding(film, userInput) {
  const keywordRegExp = new RegExp(userInput, 'gi');
  return film.replace(keywordRegExp, `<b>${userInput}</b>`);
}

//Display results
function resultDisplay(film, type) {
  const userInput = searchBar.value.trim();
  const resultList = film.slice(0, 3);
  console.log('resultList');
  console.log(resultList);

  const movieTitle = resultList.map((movie)=>{
    const boldWord = bolding(movie.Title, userInput);
    console.log(boldWord);
    return `<li class="block hover:bg-gray-200 rounded px-2 py-1">${boldWord}</li>`;
  });
  resultList.join('');

  if (type == 'movie'){
    moviesResult.innerHTML = '';
    moviesResult.insertAdjacentHTML('beforeend', movieTitle);

    //moviesResult.innerHTML = `<li class="block hover:bg-gray-200 rounded px-2 py-1">${resultList[0].Title}</div>`;
    //moviesResult.innerHTML += `<li class="block hover:bg-gray-200 rounded px-2 py-1">${resultList[1].Title}</li>`;
    //moviesResult.innerHTML += `<li class="block hover:bg-gray-200 rounded px-2 py-1">${resultList[2].Title}</div>`;
  }
  else if (type == 'series'){
    tvResult.innerHTML = '';
    tvResult.insertAdjacentHTML('beforeend', movieTitle);

    //tvResult.innerHTML = `<li class="block hover:bg-gray-200 rounded px-2 py-1">${resultList[0].Title}</div>`;
    //tvResult.innerHTML += `<li class="block hover:bg-gray-200 rounded px-2 py-1">${resultList[1].Title}</li>`;
    //tvResult.innerHTML += `<li class="block hover:bg-gray-200 rounded px-2 py-1">${resultList[2].Title}</div>`;
  }
}

// Search function
function search() {
  const userInput = searchBar.value.trim();
  console.log(userInput);

  getData(userInput, 'movie');
  getData(userInput, 'series');

  if (userInput.length !== 0) {
    moviesSection.classList.remove('hidden');
    tvSection.classList.remove('hidden');
    moviesResult.classList.remove('hidden');
    tvResult.classList.remove('hidden');
  }else {
    moviesSection.classList.add('hidden');
    tvSection.classList.add('hidden');
    moviesResult.classList.add('hidden');
    tvResult.classList.add('hidden');
  }
}

searchBar.addEventListener('input', search);
