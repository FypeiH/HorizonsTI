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
