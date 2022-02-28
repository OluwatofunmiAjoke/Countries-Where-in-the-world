let eachCountry = document.querySelectorAll('.countryContainer');
let flagImage  = document.querySelector('.flagContainer');
let countryName  = document.querySelector('countryName');
let countryFacts  = document.querySelector('countryFacts');
let showCountries = document.querySelector('.showCountries');



const url = "https://restcountries.com/v2/all";

//event listeners

//event listeners for all countries displayed to show details
eachCountry.forEach(elem => elem.addEventListener('click', showDetails));

//function to get countries from API, called on page load
window.onload = function getCountries(){
    fetch(url)
    .then(res => res.json())
    .then(function(data){
        //loop through array of objects and get flag image, country name, population, region and capital and assign to respective HTML elements
        data.forEach(function(country){
            let sectionCountry = document.createElement('section');
            sectionCountry.classList.add('countryContainer');
            showCountries.appendChild(sectionCountry);

            let flag = document.createElement('img');
            flag.classList.add('flagContainer');
            flag.src = country.flags.svg;
            sectionCountry.appendChild(flag);

            let countryDetails = document.createElement('div');
            countryDetails.classList.add('countryDetails');
            sectionCountry.appendChild(countryDetails);

            let countryName = document.createElement('h2');
            countryName.classList.add('countryName')
            countryName.innerHTML = country.name;
            countryDetails.appendChild(countryName);

            let countryFacts = document.createElement('ul');
            countryFacts.classList.add('countryFacts');
            countryDetails.appendChild(countryFacts);
            
            let population = document.createElement('li');
            population.appendChild(document.createTextNode(`Population: ${country.population}`));
            countryFacts.appendChild(population);
            let region = document.createElement('li');
            region.appendChild(document.createTextNode(`Region: ${country.region}`))
            countryFacts.appendChild(region);
            let capital = document.createElement('li');
            capital.appendChild(document.createTextNode(`Capital: ${country.capital}`))
            countryFacts.appendChild(capital);
        }
        );
    })
}


function showDetails(){
    console.log('hi there!');
}





//fetch and display all countries from API and their respective details

// work on search, show results while searching

//work on filter selection
