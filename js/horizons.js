// JavaScript to load header.html and replace the content of the div with id="header"
fetch('shared/header.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('header').innerHTML = html;
    })
    .catch(error => {
        console.warn('Error loading header.html:', error);
    });

// JavaScript to load footer.html and replace the content of the div with id="footer"
fetch('shared/footer.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('footer').innerHTML = html;
    })
    .catch(error => {
    console.warn('Error loading footer.html:', error);
    });

// JavaScript to load home.html and replace the content of the div with id="content"
fetch('content/home.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('content').innerHTML = html;
    })
    .catch(error => {
        console.warn('Error loading home.html:', error);
    });