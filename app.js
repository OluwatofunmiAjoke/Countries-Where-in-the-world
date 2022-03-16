//all querySelectors
let showCountries = document.querySelector('.showCountries');
let desktopFlex = document.querySelector('.desktopFlex');
let detail = document.querySelector('.detail');
let back = document.querySelector('.backBtn');
let modeToggle = document.querySelector('.darkModeToggle');
let body = document.querySelector('body');
let material_icon = document.querySelector('.material-icons-outlined');
let searchField = document.querySelector('.search');

let continentUl = document.querySelector('.filters');
let resultSearch = document.querySelector('.searchResults');



//variables declared
const url = "https://restcountries.com/v2/all";
let search_term ='';


//all event listeners
modeToggle.addEventListener('click', toggleMode);
continentUl.addEventListener('change', filterCountries);



//toggle between light or dark mode
function toggleMode(){
    if(!body.classList.contains('dark')){
        //change to dark mode
        body.classList.add('dark');
        modeToggle.innerText = "Light Mode";
        material_icon.innerHTML = 'light_mode';
        // modeToggle.appendChild(light_material);
    }
    else{
        //change to light mode
        body.classList.remove('dark');
        modeToggle.innerText = "Dark Mode"
        material_icon.innerHTML = "dark_mode"
    }
}

//index page actions

//search countries function
//could not get the search to display on its own
searchField.addEventListener('input', showList);


function showList(){
    search_term = searchField.value;
    let resultCountries = [];

    fetch(url)
        .then(res => res.json())
        .then(function(data){
            //get input and append to showCountries div
            data
            .filter((item) => {
                results = item.name.toLowerCase().includes(search_term);
                if(resultCountries.includes(item) === false){
                    resultCountries.push(item);
                }
            })
            resultCountries.forEach((searchCountry) => showCountry(searchCountry));
            })
};


//filter countries by region
function filterCountries(){
    let continentSelected = continentUl.options[continentUl.selectedIndex].value;
    //should be a better way to show all countries when all region is selected
    if(continentSelected === 'all'){
        location.replace('http://127.0.0.1:5501/index.html');
    }
    else{
        fetch(url)
        .then(res => res.json())
        .then(function(data){
            continentCountries = data.filter(country => country.region === continentSelected);
            if(continentCountries){
                showCountries.innerHTML = "";
                continentCountries.forEach(country => showCountry(country))
            }
            else{
                console.log("no countries found");
            }
        });
    }
}

//function to get countries from API, called on page load
if(location.href == 'http://127.0.0.1:5501/index.html'){
    window.onload = function getCountries(){
        fetch(url)
        .then(res => res.json())
        .then(function(data){
            //loop through array of objects and get flag image, country name, population, region and capital and assign to respective HTML elements
            data.forEach(function(country){
                showCountry(country);
        });
        //add details event listener after onload else it throws an error because code is executed before DOM is loaded
        showCountries.addEventListener('click', function(e) {
            if (e.target.className == 'flagContainer' || e.target.className == 'countryDetails') {
                let name = e.path[1].lastChild.firstChild.innerHTML;
                localStorage.setItem("name", name);
                location.replace('http://127.0.0.1:5501/details.html');
            }
        });
});
}
}

//function to show countries on the page, contains creation of html templates
function showCountry(country){
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


//back button on details html
if(location.href == 'http://127.0.0.1:5501/details.html'){
    back.addEventListener('click', goBack);
}

function goBack(){
    location.replace('http://127.0.0.1:5501/index.html');
}


//function to show details of selected country
function showDetails(){
    let name = localStorage.getItem("name");
    fetch(url)
    .then(res => res.json())
    .then(function(data){
        let currCountry = data.filter(country => country.name === name);
        
        detail.appendChild(desktopFlex);
        let flagContainer = document.createElement('div');
        flagContainer.classList.add('flexible');
        flagContainer.classList.add('detailFlagContainer');
        desktopFlex.appendChild(flagContainer);

        let flagDetailImg = document.createElement('img');
        flagDetailImg.classList.add('detailFlag');
        flagDetailImg.src = currCountry[0].flags.svg;
        flagContainer.appendChild(flagDetailImg);

        let detailsInfo = document.createElement('div');
        detailsInfo.classList.add('flexible');
        detailsInfo.classList.add('detailsInfo');
        desktopFlex.appendChild(detailsInfo);

        let detailCountryName = document.createElement('h2');
        detailCountryName.innerHTML = currCountry[0].name;
        detailCountryName.classList.add('detailCountryName')
        detailsInfo.appendChild(detailCountryName);

        let flexDiv = document.createElement('div');
        flexDiv.classList.add('flex');
        detailsInfo.appendChild(flexDiv);

        let detailFacts = document.createElement('ul');
        detailFacts.classList.add('detailFacts');
        flexDiv.appendChild(detailFacts);
        
        let nativeName = document.createElement('li');
        nativeName.appendChild(document.createTextNode(`Native Name: ${currCountry[0].nativeName}`));
        detailFacts.appendChild(nativeName);
        let population = document.createElement('li');
        population.appendChild(document.createTextNode(`Population: ${Intl.NumberFormat().format(currCountry[0].population)}`));
        detailFacts.appendChild(population);
        let region = document.createElement('li');
        region.appendChild(document.createTextNode(`Region: ${currCountry[0].region}`));
        detailFacts.appendChild(region);
        let subRegion = document.createElement('li');
        subRegion.appendChild(document.createTextNode(`Sub region: ${currCountry[0].subregion}`));
        detailFacts.appendChild(subRegion);
        let capital = document.createElement('li');
        capital.appendChild(document.createTextNode(`Capital: ${currCountry[0].capital}`));
        detailFacts.appendChild(capital);

        let detailFacts2 = document.createElement('ul');
        detailFacts2.classList.add('detailFacts');
        flexDiv.appendChild(detailFacts2);
        
        let topLevelDomain = document.createElement('li');
        topLevelDomain.appendChild(document.createTextNode(`Top Level Domain: ${currCountry[0].topLevelDomain[0]}`));
        detailFacts2.appendChild(topLevelDomain);
        let currencies = document.createElement('li');
        currencies.appendChild(document.createTextNode(`Currency: ${currCountry[0].currencies[0].name}`));
        detailFacts2.appendChild(currencies);

        let languageLi = document.createElement('li');
        //language is an array of possible languages, hence array needs to be filtered and converted to string
        let langArray = currCountry[0].languages.map(lang => lang.name);
        let language = langArray.toString();
        languageLi.appendChild(document.createTextNode(`Languages: ${language}`));
        detailFacts2.appendChild(languageLi);

        let detailBorders = document.createElement('div');
        detailBorders.classList.add('detailBorders');
        detailsInfo.appendChild(detailBorders);

        let borderName = document.createElement('h3');
        borderName.innerHTML = 'Border Countries:';
        detailBorders.appendChild(borderName);

        let borderContainer = document.createElement('div');
        borderContainer.classList.add('borderContainer');
        detailBorders.appendChild(borderContainer);
        
        // dynamically generate borders from api
        //get alpha3code and match to country name, then generate button with border name

        let borderCountryCode = currCountry.map(country => country.borders);
        //use array destructuring to remove external array
        let [borderCode] = borderCountryCode;

        //removing border container if country has no borders defined
        if(borderCountryCode.includes(undefined)){
            detailBorders.remove();
        }
        else{
            for (let i = 0; i<borderCode.length; i++){
                let borderCountry = data.filter(country => country.alpha3Code === borderCode[i]).map(countryName => countryName.name).toString();
                let borderBtn = document.createElement('button');
                borderBtn.innerHTML = borderCountry;
                borderBtn.classList.add('borderCountry');
                borderContainer.appendChild(borderBtn);  
                
            }
        }
    });
};

//event listener for border countries, calls on show details once clicked
document.addEventListener('click',function(e){
    if(e.target.className == 'borderCountry'){
          let clickedName = e.target.innerText;
          localStorage.setItem("name", clickedName);
          location.replace('http://127.0.0.1:5501/details.html');
     }
 }); 
