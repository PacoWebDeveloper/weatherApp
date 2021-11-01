/* API */
const apikey = 'b981bc48ba4fa3086e42bbd91490e114';
let cityName, countryCode = '';

async function getWeather(cityName, countryCode) {
    const URI = `https://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryCode}&appid=${apikey}&units=metric`;

    const response = await fetch(URI);
    const data = await response.json();
    
    return data;
}

/* DOM */
let message = document.querySelector('#message');

const container = document.querySelector('.container');

const form = document.querySelector('form');
const submitBtn = document.querySelector('#submitBtn');

let lblLocation = document.querySelector('#location');
let lblDescription = document.querySelector('#description');
let lblTemperature = document.querySelector('#temperature');
let lblIcon = document.querySelector('#icon');
let image = document.querySelector('#image');
let lblHumidity = document.querySelector('#humidity');
let lblWind = document.querySelector('#wind');

/* Events */
submitBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    let cityInput = document.querySelector('#city');
    let countryCodeInput = document.querySelector('#countryCode');

    cityInput = cityInput.value.trim();
    countryCodeInput = countryCodeInput.value.trim();

    const weatherData = await getWeather(cityInput, countryCodeInput);

    form.reset();

    if(weatherData.cod == '404') {
        setErrorMessage(true);
        clearData();        
    } 
    else {
        setErrorMessage(false);
        
        setWeatherData(weatherData);
    }
    
});

/* functions */
function setErrorMessage(error) {
    if(error) {
        message.style.display = 'block';        
        message.textContent = 'City not found';
    } else {
        message.style.display = 'none';
    }
}

function setWeatherData(weatherData) {
    const location = weatherData.name + '/' + weatherData.sys.country;
    const description = weatherData.weather[0].description;

    setIconAndBackground(description);

    const temperature = weatherData.main.temp + '°C';
    const humidity = 'Humidity: ' + weatherData.main.humidity + '%';
    const wind = 'Wind: ' + weatherData.wind.deg + '/' + weatherData.wind.speed;

    lblLocation.textContent = location;
    lblDescription.textContent = description;
    lblTemperature.textContent = temperature;
    lblHumidity.textContent = humidity;
    lblWind.textContent = wind;
}

function clearData() {
    lblLocation.textContent = 'Location';
    lblDescription.textContent = 'Description';
    lblTemperature.textContent = 'Temperature';
    lblHumidity.textContent = 'Humidity';
    lblWind.textContent = 'Wind';
}

function setIconAndBackground(description) {
    const weather = {
        'clear sky': [
            'sun', 
            'linear-gradient(rgb(0, 119, 255), rgb(95, 210, 255))'
        ],
        'scattered clouds': [
            'cloudy',
            'linear-gradient(rgb(0, 119, 255), rgb(121, 133, 138))'
        ],
        'few clouds': [
            'cloudy',
            'linear-gradient(rgb(0, 119, 255), rgb(121, 133, 138))'
        ],
        'broken clouds': [
            'partly_cloudy',
            'linear-gradient(rgb(0, 119, 255), rgb(121, 133, 138))'
        ],
        'moderate rain': [
            'rain',
            'linear-gradientrgb(130, 226, 255), rgb(117, 123, 126))'
        ],
        'light rain': [
            'rain',
            'linear-gradient(rgb(0, 119, 255), rgb(121, 133, 138))'
        ],
        'overcast clouds': [
            'cloud',
            'linear-gradient(rgb(0, 119, 255), rgb(121, 133, 138))'
        ]
    }

    const settings = weather[description];

    image.src = './img/' + settings[0] + '.png';

    container.style.background = settings[1];
        
}

function setFocus() {
    let input = document.querySelector('#city');
    input.focus();
}