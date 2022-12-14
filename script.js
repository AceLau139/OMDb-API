const searchBar = document.querySelector("#search-bar")
const result = document.querySelector(".result")
const moviesResult = document.querySelector("#movies-result")
const tvResult = document.querySelector("#tv-result")

//Send request to the API & Get data from API
async function getData(keyword, type) {
  const url = `http://www.omdbapi.com/?apikey=bf9d768b&type=${type}&s=${keyword}`

  const res = await fetch(url)
  const data = await res.json()

  if (data.Response === "True") {
    resultDisplay(data.Search, type)
  }
}

//Bolding
function bolding(film, userInput) {
  const keywordRegExp = new RegExp(userInput, "gi")
  return film.replace(keywordRegExp, `<b>${userInput}</b>`)
}

//Display results
function resultDisplay(film, type) {
  const userInput = searchBar.value.trim()
  const resultList = film.slice(0, 3)
  console.log(resultList)

  const movieTitle = resultList
    .map((movie) => {
      const boldWord = bolding(movie.Title, userInput)
      return `<li class="block hover:bg-gray-200 rounded px-2 py-1">${boldWord}</li>`
    })
    .join("")

  if (type === "movie") {
    moviesResult.innerHTML = ""
    moviesResult.insertAdjacentHTML("beforeend", movieTitle)
  } else if (type === "series") {
    tvResult.innerHTML = ""
    tvResult.insertAdjacentHTML("beforeend", movieTitle)
  }
}

// Search function
function search() {
  const userInput = searchBar.value.trim()

  getData(userInput, "movie")
  getData(userInput, "series")

  if (userInput.length !== 0) {
    result.classList.remove("hidden")
    moviesResult.classList.remove("hidden")
    tvResult.classList.remove("hidden")
  } else {
    result.classList.add("hidden")
    moviesResult.classList.add("hidden")
    tvResult.classList.add("hidden")
  }
}

searchBar.addEventListener("input", search)
