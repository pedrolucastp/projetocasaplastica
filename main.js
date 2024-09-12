document.addEventListener('DOMContentLoaded', () => {
    // Carregar header e footer
    loadHTML('header', 'header.html');
    loadHTML('footer', 'footer.html');

    // Initialize page content
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            loadPageContent(page);
        });
    });

    //loadPageContent('home');

    // Hide the splash screen after it fades out
    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        if (splash) {
            splash.style.display = 'none';
        }
    }, 3000); // corresponds to the duration of the fade out animation
});

// function loadPageContent(pageKey) {
//     document.querySelectorAll('main section').forEach(section => {
//         section.classList.add('hidden');
//     });

//     const selectedSection = document.getElementById(pageKey);
//     if (selectedSection) {
//         selectedSection.classList.remove('hidden');
//     } else {
//         console.error(`No content found for page: ${pageKey}`);
//     }
// }

// Função para carregar header e footer
function loadHTML(elementID, filePath) {
    const element = document.getElementById(elementID);
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            element.innerHTML = data;
        })
        .catch(error => console.error('Erro ao carregar o arquivo:', error));
}
