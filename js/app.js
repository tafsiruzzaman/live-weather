const API_KEY = `46ad7457603b9b0104e633e78cd60e16`;

const searchBtn = document.getElementById('search-btn');
const inputF = document.getElementById('city-name');

inputF.addEventListener("keypress", function(event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        searchBtn.click();
    }
});

const startSearching = instruction => {
    if(instruction == 'dhaka') {
        fetchUrl(instruction);
    }
    else {
        searchTemperature();
    };
};

const searchTemperature = () => {
    toggleSpinner('block')
    const inputField = document.getElementById('city-name');
    if (inputField.value == '') {
        displayErrorMessage('please type something');
        toggleSpinner('none');
    }
    else {
        displayErrorMessage('');
        const city = inputField.value;
        fetchUrl(city);
    };
    inputField.value = '';
};

const toggleSpinner = style => {
    document.getElementById('spinner').style.display = style;
};

const displayErrorMessage = message => {
    document.getElementById('error-message').innerText = message;
};

const fetchUrl = city => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    try {
        fetch(url)
        .then(res => res.json())
        .then(data => cheakTemperatureData(data));
    }
    catch (error) {
        console.error();
        displayErrorMessage('no city found*')
    };
};

startSearching('dhaka');

const cheakTemperatureData = data => {
    if (data.cod == 200) {
        displayTemperature(data);
    }
    else {
        displayErrorMessage('no city found*');
        toggleSpinner('none');
    };
};

const setInnerText = (id, text) => {
    document.getElementById(id).innerText = text;
};

const displayTemperature = temperature => {
    setInnerText('city', temperature.name);
    setInnerText('temperature', temperature.main.temp);
    setInnerText('condition', temperature.weather[0].main);
    // set weather icon
    const url = `http://openweathermap.org/img/wn/${temperature.weather[0].icon}@2x.png`;
    const imgIcon = document.getElementById('weather-icon');
    imgIcon.setAttribute('src', url);
    toggleSpinner('none');
};