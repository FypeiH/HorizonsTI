function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function fetchAndInsert(url, targetId) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            const target = document.getElementById(targetId);
            if (target) {
                target.innerHTML = html;
            }
        })
        .catch(error => console.warn(`Error loading ${url}:`, error));
}

function loadContentBasedOnHash() {
    const hash = window.location.hash || '#';
    const content = document.getElementById('content');

    const navItems = {
        navHome: document.getElementById('navHome'),
        navDestinos: document.getElementById('navDestinos'),
        navBlog: document.getElementById('navBlog'),
        navWeather: document.getElementById('navWeather'),
        navContacto: document.getElementById('navContacto')
    };

    const setActiveNav = (activeItemId) => {
        Object.entries(navItems).forEach(([key, element]) => {
            if (element) {
                element.classList.toggle('active', key === activeItemId);
            }
        });
    };

    const contentMapping = {
        '#paris': { url: 'content/parisDetails.html', nav: 'navDestinos' },
        '#tokyo': { url: 'content/tokyoDetails.html', nav: 'navDestinos' },
        '#machuPicchu': { url: 'content/machuPicchuDetails.html', nav: 'navDestinos' },
        '#perfectTrip': { url: 'content/perfectTripDetails.html', nav: 'navBlog' },
        '#europeTrip': { url: 'content/europeTripDetails.html', nav: 'navBlog' },
        '#asiaTrip': { url: 'content/asiaTripDetails.html', nav: 'navBlog' },
        '#weather': { url: 'content/weatherCast.html', nav: 'navWeather' },
        '#contacto': { url: 'content/contact.html', nav: 'navContacto' },
        '#': { url: 'content/home.html', nav: 'navHome' }
    };

    const { url, nav } = contentMapping[hash] || contentMapping['#'];

    fetch(url)
        .then(response => response.text())
        .then(html => {
            if (content) {
                content.innerHTML = html;
                scrollToTop();
            }
        })
        .then(() => setActiveNav(nav))
        .then(() => {
            if (hash === '#weather') {
                loadWeather();
            }
        })       
        .catch(error => console.warn(`Error loading ${url}:`, error));
}

// Load shared header and footer
fetchAndInsert('shared/header.html', 'header');
fetchAndInsert('shared/footer.html', 'footer');
setTimeout(() => {
    loadContentBasedOnHash();
}, 100);

document.addEventListener('click', function (event) {
    const actions = {
        logoHome: { hash: '', scrollTo: null },
        navHome: { hash: '', scrollTo: null },
        navDestinos: { hash: '#destinos', scrollTo: 'destinos' },
        navBlog: { hash: '#blog', scrollTo: 'blog' },
        btnParis: { hash: '#paris', scrollTo: null },
        btnTokyo: { hash: '#tokyo', scrollTo: null },
        btnMachuPicchu: { hash: '#machuPicchu', scrollTo: null },
        btnPerfectTrip: { hash: '#perfectTrip', scrollTo: null },
        btnEuropeTrip: { hash: '#europeTrip', scrollTo: null },
        btnAsiaTrip: { hash: '#asiaTrip', scrollTo: null },
        navWeather: { hash: '#weather', scrollTo: null },
        navContacto: { hash: '#contacto', scrollTo: null }
    };

    const action = actions[event.target.id];
    if (action) {
        if (action.hash !== undefined) {
            window.location.hash = action.hash;
            loadContentBasedOnHash();
        }

        if (action.scrollTo) {
            setTimeout(() => {
                const section = document.getElementById(action.scrollTo);
                if (section) {
                    section.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }, 100);
        }
    }
});

// Load content based on the current hash on page load
window.addEventListener('DOMContentLoaded', loadContentBasedOnHash);



/* OpenWeatherAPI request logic */

const destinations = {
    paris: { name: "Paris", lat: 48.8566, lon: 2.3522 },
    tokyo: { name: "Tokyo", lat: 35.6895, lon: 139.6917 },
    machuPicchu: { name: "Machu Picchu", lat: -13.1631, lon: -72.5450 },
    newYork: { name: "New York", lat: 40.7128, lon: -74.0060 },
    london: { name: "London", lat: 51.5074, lon: -0.1278 },
    sydney: { name: "Sydney", lat: -33.8688, lon: 151.2093 },
    rome: { name: "Rome", lat: 41.9028, lon: 12.4964 },
    capeTown: { name: "Cape Town", lat: -33.9249, lon: 18.4241 },
    bangkok: { name: "Bangkok", lat: 13.7563, lon: 100.5018 }
};
const apiKey = 'API_KEY';
const weatherContainer = document.getElementById('weatherContainer');

// Function to fetch weather data
async function fetchWeather({ name, lat, lon }) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt`;
    try {
        const response = await fetch(apiUrl);
        if (response.ok) {
            const data = await response.json();
            const { main, weather } = data;
            const { temp } = main;
            const { description, icon } = weather[0];
            return { name, temp, desc: description, icon: `https://openweathermap.org/img/w/${icon}.png` };
        } else {
            console.warn(`Error fetching weather: ${response.status}`);
        }
    } catch (error) {
        console.warn('Error fetching weather data:', error);
    }
}

// Function to render a weather card
function renderWeatherCard({ name, temp, desc, icon }) {
    const weatherContainer = document.getElementById('weatherContainer'); // Dynamically fetch
    if (!weatherContainer) {
        console.error("weatherContainer not found in the DOM.");
        return;
    }

    const card = document.createElement('div');
    card.className = 'col-md-4';
    card.innerHTML = `
         <div class="weather-card mb-4">
            <h3>${name}</h3>
            <img src="${icon}" alt="${desc}" />
            <p><strong>${temp}°C</strong></p>
            <p class="text-capitalize">${desc}</p>
        </div>
    `;
    weatherContainer.appendChild(card);
}

async function loadWeather() {
    const weatherContainer = document.getElementById('weatherContainer');
    if (!weatherContainer) {
        console.error("Weather container not found in the DOM.");
        return;
    }

    const destinationEntries = Object.values(destinations);
    for (const destination of destinationEntries) {
        const weatherData = await fetchWeather(destination);
        if (weatherData) renderWeatherCard(weatherData);
    }
}
