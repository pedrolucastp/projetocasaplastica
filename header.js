const headerContent = `
  <nav>
    <a href="#" data-page="home"><img src="/logo.png" alt="Casa Plastica" class="logo" height="80" width="197"></a>
    <ul>
      <li><a href="#" data-page="sobre">Sobre</a></li>
      <li><a href="#" data-page="servicos">Serviços</a></li>
      <li><a href="#" data-page="contato">Contato</a></li>
    </ul>
  </nav>
`

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('header').innerHTML = headerContent;
});
