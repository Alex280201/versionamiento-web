import './styles/style.css';
import { renderizarNavbar, renderizarFooter } from './components/layout.js';

document.addEventListener('DOMContentLoaded', () => {
  renderizarNavbar();
  renderizarFooter();

  const contenedor = document.querySelector('main.container');

  // TODO: aquí va el contenido específico de la página de Recursos
});
