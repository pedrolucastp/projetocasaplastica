const headerContent = `
  <nav>
    <a href="#home" data-page="home"><img src="logo.png" alt="Casa Plastica" class="logo" height="80" width="197"></a>
    <ul>
      <li><a href="#home" data-page="home">Home</a></li>
      <li><a href="#sobre" data-page="sobre">Sobre</a></li>
      <li><a href="#servicos" data-page="servicos">Serviços</a></li>
      <li><a href="#contato" data-page="contato">Contato</a></li>
      <li><a href="#find-center" data-page="find-center">Mapa</a></li>
    </ul>
  </nav>
`;

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('header').innerHTML = headerContent;
});
