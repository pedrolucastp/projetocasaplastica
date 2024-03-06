const pageTextContent = {
    home: {
        title: "Bem-vindo à Casa Plastica",
        body: [
            "Desafie a poluição plástica conosco."
            "Nós oferecemos soluções inovadoras e acessíveis para a reciclagem de plásticos, promovendo a sustentabilidade e a preservação do meio ambiente."
            "Explore nosso site para saber mais sobre nossos serviços, produtos e iniciativas."
        ]
    },
    sobre: {
        title: "Sobre Nós",
        body: [
            "Somos a Casa Plastica, uma empresa empenhada em combater a poluição plástica e promover a sustentabilidade."
            "Nosso projeto surgiu e segue com a ideia de construir uma casa feita inteiramente de plásticos retirados dos oceanos, mas evoluímos para muito mais.",
            "Desenvolvemos uma linha de máquinas e ferramentas para a reciclagem ser acessível a todos.",
            "Atualmente, desenvolvemos tecnologias e soluções para reciclagem em pequena escala, trabalhando em parceria com outras empresas, oferecendo consultorias, workshops e palestras sobre sustentabilidade e reciclagem de plásticos.",
            "Estamos comprometidos em tornar o mundo um lugar mais limpo e sustentável para as gerações futuras.",
        ]
    },
    servicos: {
        title: "Nossos Serviços",
        body: [
            "Oferecemos os seguintes serviços:",
            `<ul>
                <li>Construção de máquinas de reciclagem de plástico sob demanda: Desenvolvemos máquinas de reciclagem de plástico customizadas e trabalhamos no desenvolvimento da Nomad, que são projetadas para oferecer soluções práticas e acessíveis para o problema da poluição plástica.</li>
                <li>Palestras e apresentações sobre sustentabilidade e reciclagem de plásticos: Promovemos a conscientização ambiental oferecendo palestras e apresentações sobre sustentabilidade, reciclagem de plásticos e o uso de tecnologias inovadoras para lidar com esses desafios.</li>
            </ul>`
        ]
    },
    contato: {
        title: "Entre em Contato",
        body: [
            `Entre em contato pelo <a href="https://wa.me/5522997747785">WhatsApp</a>`,
            `Ou nos escreva um <a href="mailto:pedrolucasp@gmail.com">email</a>`,
            `E siga-nos no Instagram: <a href="https://www.instagram.com/projetocasaplastica" target="_blank">@projetocasaplastica</a>`
        ]
    }
};

function createTitleHTML(title) {
    return `<h2>${title}</h2>`;
}

function createContentHTML(bodyArray) {
    return bodyArray.map(paragraph => `<p>${paragraph}</p>`).join('');
}

function loadPageContent(pageKey) {
    const pageData = pageTextContent[pageKey];
    if (!pageData) {
        console.error(`No content found for page: ${pageKey}`);
        return `<p>Content not found.</p>`;
    }

    const titleHTML = createTitleHTML(pageData.title);
    const contentHTML = createContentHTML(pageData.body);

    return titleHTML + contentHTML;
}

document.addEventListener('DOMContentLoaded', () => {
    const initialPageContent = loadPageContent('home');
    document.getElementById('content').innerHTML = initialPageContent;

    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            const pageContent = loadPageContent(page);
            document.getElementById('content').innerHTML = pageContent;
        });
    });
});
