document.addEventListener('DOMContentLoaded', () => {
    // Initially load the home page content
    loadContent('home');

    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor behavior
            const page = this.getAttribute('data-page'); // Get the page to load
            loadContent(page);
        });
    });
});

function loadContent(page) {
    const content = {
        home: `<h2>Welcome to Casa Plastica</h2>
               <p>Desafie a poluição plástica conosco.</p>`,
        sobre: `<h2>Sobre Nós</h2>
                <p>Somos a Casa Plastica, uma empresa empenhada...</p>`,
        servicos: `<h2>Nossos Serviços</h2>
                   <p>Oferecemos soluções inovadoras...</p>`,
        contato: `<h2>Contato</h2>
                  <p>Entre em contato conosco...</p>`
    };

    // Update the content section with the content of the clicked page
    document.getElementById('content').innerHTML = content[page];
}
