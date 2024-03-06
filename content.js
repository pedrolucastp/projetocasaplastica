document.addEventListener('DOMContentLoaded', () => {
    loadContent('home');

    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            loadContent(page);
        });
    });
});

function loadContent(page) {
    const content = {
        home: `
            <h2>Bem-vindo à Casa Plastica</h2>
            <p>Desafie a poluição plástica conosco.</p>
            <p>Nós oferecemos soluções inovadoras e acessíveis para a reciclagem de plásticos, promovendo a sustentabilidade e a preservação do meio ambiente.</p>
            <p>Explore nosso site para saber mais sobre nossos serviços, produtos e iniciativas.</p>
            `,
        sobre: `
            <h2>Sobre Nós</h2>
            <p>Somos a Casa Plastica, uma empresa empenhada em combater a poluição plástica e promover a sustentabilidade.</p>
            <p>Nosso projeto surgiu e segue com a ideia de construir uma casa feita inteiramente de plásticos retirados dos oceanos, mas evoluímos para muito mais.</p>
            <p>Desenvolvemos uma linha de máquinas e ferramentas para a reciclagem ser acessível a todos.</p>
            <p>Atualmente, desenvolvemos tecnologias e soluções para reciclagem em pequena escala, trabalhando em parceria com outras empresas, oferecendo consultorias, workshops e palestras sobre sustentabilidade e reciclagem de plásticos.</p>
            <p>Estamos comprometidos em tornar o mundo um lugar mais limpo e sustentável para as gerações futuras.</p>
            `,
        servicos: `
            <h2>Nossos Serviços</h2>
            <p>Oferecemos os seguintes serviços:</p>
            <ul>
                <li>Construção de máquinas de reciclagem de plástico sob demanda: Desenvolvemos máquinas de reciclagem de plástico customizadas e trabalhamos no desenvolvimento da Nomad, que são projetadas para oferecer soluções práticas e acessíveis para o problema da poluição plástica.</li>
                <li>Palestras e apresentações sobre sustentabilidade e reciclagem de plásticos: Promovemos a conscientização ambiental oferecendo palestras e apresentações sobre sustentabilidade, reciclagem de plásticos e o uso de tecnologias inovadoras para lidar com esses desafios.</li>
            </ul>
            `,
        contato: `
            <h2>Entre em Contato</h2>
            <p>Entre em contato pelo <a href="https://wa.me/5522997747785">WhatsApp</a></p>
            <p>Ou nos escreva um <a href="mailto:pedrolucasp@gmail.com">email</a></p>
            <p>E siga-nos no Instagram: <a href="https://www.instagram.com/projetocasaplastica" target="_blank">@projetocasaplastica</a></p>
            `
    };
    document.getElementById('content').innerHTML = content[page];
}
