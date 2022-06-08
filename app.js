//global constants
const API_KEY = 'nOjzgnRK5wSxGHruvjd3HVSux7Zxk46H'
const rating = 'PG'
const limit = 10
const startingUrl = 'http://api.giphy.com/v1/gifs/'
const results = document.querySelector('.gif-results')
const form = document.querySelector('.search-form')
const searchInput = document.querySelector('#search-input')
const showMoreBtn = document.querySelector('#show-more-btn')

//event listender
form.addEventListener('submit', getGiphy)
showMoreBtn.addEventListener('click', showMoreResults)

//global variable
var currentSearchTerm = ''
var offset = limit
async function getGiphy(e) {
    //setting up the api url
    var searchTerm = searchInput.value
    currentSearchTerm = searchTerm
    searchInput.innerHTML = 'Enter a search term'
    let apiUrl = startingUrl + `search?q=${searchTerm}&api_key=${API_KEY}&limit=${limit}&rating=${rating}`
    console.log(apiUrl)
    e.preventDefault()

    // getting the results
    let response = await fetch(apiUrl)
    let responseData = await response.json()
    console.log('responseData is:', responseData)
    displayResults(responseData, 0)

    // reset the form
    form.reset()
}

async function loadTrendingGifs(){
    //setting up trending api url
    let apiUrl = startingUrl + `trending?&api_key=${API_KEY}&limit=${limit}&rating=${rating}`

    // getting the results
    let response = await fetch(apiUrl)
    let responseData = await response.json()
    console.log('responseData is:', responseData)
    displayResults(responseData, 0)
    console.log(apiUrl)
}

async function showMoreResults(){
    //setting up trending api url

    let apiUrl = currentSearchTerm === '' ? startingUrl + `trending?&api_key=${API_KEY}&limit=${limit}&rating=${rating}&offset=${offset}` : startingUrl + `search?q=${currentSearchTerm}&api_key=${API_KEY}&limit=${limit}&rating=${rating}&offset=${offset}`
    offset += limit

    // getting the results
    let response = await fetch(apiUrl)
    let responseData = await response.json()
    console.log('responseData is:', responseData)
    displayResults(responseData, 1)
    console.log(apiUrl)
}

function displayResults(responseData, showMore){
    if (!showMore){
        results.innerHTML = ``
    }
    for (let i = 0; i < limit; i++) {
        results.innerHTML += `
        <div class="gif-card"> 
            <img src='${responseData.data[i].images.downsized.url}'/>
            <div class="overlay">
                <h2>${responseData.data[i].title}</h2>
            </div>
        </div>
        `
    }
}

window.onload = function () {
    loadTrendingGifs()
}