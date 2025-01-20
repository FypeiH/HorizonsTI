function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Smooth scrolling effect
    });
}

// Load header.html
fetch('shared/header.html')
    .then(response => response.text())
    .then(html => {
        const header = document.getElementById('header');
        if (header) {
            header.innerHTML = html;
        }
    })
    .catch(error => {
        console.warn('Error loading header.html:', error);
    });

// Load footer.html
fetch('shared/footer.html')
    .then(response => response.text())
    .then(html => {
        const footer = document.getElementById('footer');
        if (footer) {
            footer.innerHTML = html;
        }
    })
    .catch(error => {
        console.warn('Error loading footer.html:', error);
    });

// Load default home.html into content
fetch('content/home.html')
    .then(response => response.text())
    .then(html => {
        const content = document.getElementById('content');
        if (content) {
            content.innerHTML = html;
        }
    })
    .catch(error => {
        console.warn('Error loading home.html:', error);
    });

// Handle dynamic loading of destinos.html
document.addEventListener('click', function (event) {
    if (event.target && event.target.id === 'home') {
        fetch('content/home.html')
            .then(response => response.text())
            .then(html => {
                const content = document.getElementById('content');
                if (content) {
                    content.innerHTML = html;
                    scrollToTop();
                }
            })
            .catch(error => {
                console.warn('Error loading home.html:', error);
            });
    }
    if (event.target && event.target.id === 'btnParis') {
        fetch('content/parisDetails.html')
            .then(response => response.text())
            .then(html => {
                const content = document.getElementById('content');
                if (content) {
                    content.innerHTML = html;
                    scrollToTop();
                }
            })
            .catch(error => {
                console.warn('Error loading parisDetails.html:', error);
            });
    }
    if (event.target && event.target.id === 'btnTokyo') {
        fetch('content/tokyoDetails.html')
            .then(response => response.text())
            .then(html => {
                const content = document.getElementById('content');
                if (content) {
                    content.innerHTML = html;
                    scrollToTop();
                }
            })
            .catch(error => {
                console.warn('Error loading tokyoDetails.html:', error);
            });
    }
    if (event.target && event.target.id === 'btnMachuPicchu') {
        fetch('content/machuPicchuDetails.html')
            .then(response => response.text())
            .then(html => {
                const content = document.getElementById('content');
                if (content) {
                    content.innerHTML = html;
                    scrollToTop();
                }
            })
            .catch(error => {
                console.warn('Error loading machuPicchuDetails.html:', error);
            });
    }
});
