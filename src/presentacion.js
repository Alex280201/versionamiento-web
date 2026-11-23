import './styles/style.css';
import './styles/presentacion.css';
import { renderizarNavbar, renderizarFooter } from './components/layout.js';

// Cada lámina tiene la sección a la que pertenece y su contenido en HTML.
const LAMINAS = [
  {
    seccion: 'Universidad Central del Ecuador · Arquitectura de Software',
    clase: 'portada',
    html: `
      <h1>Gestión de versionamiento con GitHub y GitLab</h1>
      <p class="grande">Comparación de ambas plataformas a partir de un sitio desarrollado en equipo, protegido con reglas y desplegado de forma continua.</p>
      <p class="integrantes">Grupo 2 · Jhon Ávila · Alexander Chicango · José Cuadro · Bruno Sampedro</p>`,
  },
  {
    seccion: 'Contenido',
    html: `
      <h2>Contenido</h2>
      <div class="tabla"><table>
        <thead><tr><th scope="col">Tema</th><th scope="col" class="cifra">Tiempo</th></tr></thead>
        <tbody>
          <tr><td>1. Contexto y caso práctico</td><td class="cifra">4 min</td></tr>
          <tr><td>2. Diferencias de modelo</td><td class="cifra">4 min</td></tr>
          <tr><td>3. Despliegue en cada plataforma</td><td class="cifra">6 min</td></tr>
          <tr><td>4. Reglas de protección y demostración</td><td class="cifra">5 min</td></tr>
          <tr><td>5. Variables, reversión y comandos</td><td class="cifra">4 min</td></tr>
          <tr><td>6. Cuentas educativas</td><td class="cifra">3 min</td></tr>
          <tr><td>7. Resultados, hallazgos y conclusiones</td><td class="cifra">4 min</td></tr>
        </tbody>
      </table></div>`,
  },
  {
    seccion: '1. Contexto y caso práctico',
    html: `
      <h2>Contexto</h2>
      <div class="cifras">
        <div><p class="valor">93 %</p><p>de los desarrolladores usa Git (Stack Overflow, 2022).</p></div>
        <div><p class="valor">180 M+</p><p>desarrolladores registrados en GitHub (Octoverse 2025).</p></div>
        <div><p class="valor">2</p><p>plataformas comparadas con el mismo proyecto.</p></div>
      </div>`,
  },
  {
    seccion: '1. Contexto y caso práctico',
    html: `
      <h2>Caso práctico: este sitio</h2>
      <div class="flujo"><span>feature/…</span><b>→</b><span>develop</span><b>→</b><span>test</span><b>→</b><span>main</span></div>
      <ul>
        <li>Cada integrante desarrolló una página en su propia rama.</li>
        <li>Cada paso entre ramas se hace con un pull request revisado por otro integrante.</li>
        <li>Un workflow de GitHub Actions replica el repositorio en GitLab.</li>
        <li>Cloudflare Pages publica el sitio desde cada repositorio.</li>
      </ul>`,
  },
  {
    seccion: '2. Diferencias de modelo',
    html: `
      <h2>Diferencias de modelo</h2>
      <div class="tabla"><table>
        <thead><tr><th scope="col">Aspecto</th><th scope="col">GitHub</th><th scope="col">GitLab</th></tr></thead>
        <tbody>
          <tr><td>CI/CD</td><td>Eventos y acciones reutilizables</td><td>Etapas y plantillas</td></tr>
          <tr><td>Ejecución</td><td>Máquina virtual</td><td>Contenedor</td></tr>
          <tr><td>Publicación de sitios</td><td>Pasos explícitos</td><td>Convención: job <code>pages</code></td></tr>
          <tr><td>Organización</td><td>Organizaciones</td><td>Grupos con herencia</td></tr>
          <tr><td>Instalación propia</td><td>De pago</td><td>Gratuita (Community Edition)</td></tr>
        </tbody>
      </table></div>`,
  },
  {
    seccion: '3. Despliegue en cada plataforma',
    html: `
      <h2>Réplica en GitLab desde GitHub</h2>
      <pre><code>on:
  push:
    branches: [main, develop, test]
jobs:
  sync:
    steps:
      - uses: actions/checkout@v4
      - run: |
          git remote add gitlab https://oauth2:\${{ secrets.GITLAB_TOKEN }}@gitlab.com/...
          git push gitlab --force --prune "refs/remotes/origin/*:refs/heads/*"</code></pre>
      <p class="nota">Archivo <code>.github/workflows/sync-gitlab.yml</code> del repositorio del grupo. El token se guarda como secreto y no aparece en los registros.</p>`,
  },
  {
    seccion: '3. Despliegue en cada plataforma',
    html: `
      <h2>Despliegue nativo: GitHub Actions</h2>
      <pre><code>permissions:
  pages: write
  id-token: write              # token OIDC temporal
jobs:
  validate:
    steps:
      - run: npx --yes html-validate "public/**/*.html"
  deploy:
    needs: validate            # sin validación no hay despliegue
    environment: github-pages
    steps:
      - uses: actions/upload-pages-artifact@v3
      - uses: actions/deploy-pages@v4</code></pre>
      <p class="nota">Pipeline del prototipo publicado en GitHub Pages.</p>`,
  },
  {
    seccion: '3. Despliegue en cada plataforma',
    html: `
      <h2>Despliegue nativo: GitLab CI</h2>
      <pre><code>stages: [validate, deploy]
validate:
  image: node:22-alpine
  script:
    - npx --yes html-validate "public/**/*.html"
pages:                         # el nombre activa GitLab Pages
  stage: deploy
  artifacts:
    paths: [public]
  rules:
    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH</code></pre>
      <p class="nota">Pipeline del prototipo publicado en GitLab Pages.</p>`,
  },
  {
    seccion: '4. Reglas de protección',
    html: `
      <h2>Reglas activas en el repositorio</h2>
      <div class="tabla"><table>
        <thead><tr><th scope="col">Rama</th><th scope="col">Regla</th></tr></thead>
        <tbody>
          <tr><td><code>main</code></td><td>Pull request con dos aprobaciones; sin force push ni borrado</td></tr>
          <tr><td><code>test</code></td><td>Pull request con una aprobación; sin force push ni borrado</td></tr>
          <tr><td><code>develop</code></td><td>Pull request con una aprobación; sin force push ni borrado</td></tr>
        </tbody>
      </table></div>
      <p class="nota">En GitLab, las aprobaciones obligatorias y CODEOWNERS requieren el plan Premium. En repositorios privados de GitHub, las reglas requieren el plan Pro, incluido en GitHub Education.</p>`,
  },
  {
    seccion: '4. Reglas de protección',
    html: `
      <h2>Demostración: cambio bloqueado</h2>
      <div class="dos-columnas">
        <ul>
          <li>Se eliminó a propósito el texto alternativo de una imagen.</li>
          <li>El check de validación falló.</li>
          <li>GitHub bloqueó la fusión del pull request.</li>
        </ul>
        <div class="destacado"><p>Antes de esta prueba, el validador no detectaba el error: el preset estándar no revisa accesibilidad. Una regla solo protege si se verifica.</p></div>
      </div>
      <p class="nota">PR #3 del prototipo: github.com/jhon-avila135/investigacion-versionamiento/pull/3</p>`,
  },
  {
    seccion: '5. Variables, reversión y comandos',
    html: `
      <h2>Variables y secretos</h2>
      <div class="tabla"><table>
        <thead><tr><th scope="col">Aspecto</th><th scope="col">GitHub</th><th scope="col">GitLab</th></tr></thead>
        <tbody>
          <tr><td>Niveles</td><td>Organización, repositorio, entorno</td><td>Grupo (heredable), proyecto</td></tr>
          <tr><td>Datos sensibles</td><td><code>secrets</code></td><td>Masked, masked and hidden</td></tr>
          <tr><td>Producción</td><td>Entornos con revisores</td><td>Variables protegidas</td></tr>
          <tr><td>Predefinidas</td><td><code>GITHUB_SHA</code></td><td><code>CI_COMMIT_SHORT_SHA</code></td></tr>
        </tbody>
      </table></div>
      <p class="nota">En el proyecto: el secreto <code>GITLAB_TOKEN</code> para la réplica y, en el prototipo, la variable protegida <code>ENTORNO</code>.</p>`,
  },
  {
    seccion: '5. Variables, reversión y comandos',
    html: `
      <h2>Comandos del flujo de trabajo</h2>
      <pre><code>git switch -c feature/informe       # rama por tarea desde develop
git commit -m "feat(informe): ..."  # Conventional Commits
git push -u origin feature/informe  # publicar la rama
git pull origin develop             # actualizar antes de crear otra rama
git remote add gitlab URL           # segundo remoto
git revert HEAD                     # reversión sin reescribir historial
git tag -a v1.0.0 -m "entrega"      # versión de entrega</code></pre>`,
  },
  {
    seccion: '6. Cuentas educativas',
    html: `
      <h2>GitHub Education</h2>
      <div class="tabla"><table>
        <thead><tr><th scope="col">Aspecto</th><th scope="col">Free</th><th scope="col">Education</th></tr></thead>
        <tbody>
          <tr><td>Solicitante</td><td>Cualquier usuario</td><td>Estudiante verificado</td></tr>
          <tr><td>Reglas en repositorios privados</td><td>No</td><td>Sí</td></tr>
          <tr><td>Codespaces</td><td>120 h-núcleo/mes</td><td>180 h-núcleo/mes</td></tr>
          <tr><td>Copilot</td><td>Gratuito con límites</td><td>Premium sin costo</td></tr>
        </tbody>
      </table></div>
      <p class="nota">El beneficio se otorga al estudiante.</p>`,
  },
  {
    seccion: '6. Cuentas educativas',
    html: `
      <h2>GitLab for Education</h2>
      <div class="tabla"><table>
        <thead><tr><th scope="col">Aspecto</th><th scope="col">Free</th><th scope="col">for Education</th></tr></thead>
        <tbody>
          <tr><td>Solicitante</td><td>Cualquier usuario</td><td>Docentes o personal</td></tr>
          <tr><td>Plan</td><td>Free</td><td>Ultimate, renovable cada año</td></tr>
          <tr><td>Minutos de CI</td><td>400/mes</td><td>50 000/mes</td></tr>
          <tr><td>Uso</td><td>Sin restricción</td><td>Docencia e investigación</td></tr>
        </tbody>
      </table></div>
      <p class="nota">El beneficio se otorga a la institución.</p>`,
  },
  {
    seccion: '7. Resultados, hallazgos y conclusiones',
    html: `
      <h2>Resultados</h2>
      <div class="tabla"><table>
        <thead><tr><th scope="col">Plataforma</th><th scope="col" class="cifra">Duración del pipeline</th><th scope="col" class="cifra">Tiempo de entrega</th></tr></thead>
        <tbody>
          <tr><td>GitHub Pages</td><td class="cifra">35,5 s (n = 6)</td><td class="cifra">49,4 s (n = 7)</td></tr>
          <tr><td>GitLab Pages</td><td class="cifra">47,5 s (n = 2)</td><td class="cifra">60 s (n = 1)</td></tr>
        </tbody>
      </table></div>
      <p class="nota">Mediciones del prototipo. Tiempo de entrega: métrica DORA (Forsgren, Humble y Kim, 2018).</p>`,
  },
  {
    seccion: '7. Resultados, hallazgos y conclusiones',
    html: `
      <h2>Hallazgos</h2>
      <ul>
        <li>La validación omitía la accesibilidad hasta probarla con un caso real.</li>
        <li>GitHub Pages y GitLab Pages usan rutas base distintas para un mismo sitio.</li>
        <li>GitLab Pages sirvió por unos segundos versiones distintas tras cada despliegue.</li>
        <li>GitLab no admite un proyecto público dentro de un grupo privado.</li>
        <li>El código se replica con un push; los pipelines no son compatibles entre plataformas.</li>
      </ul>`,
  },
  {
    seccion: '7. Resultados, hallazgos y conclusiones',
    html: `
      <h2>Criterios de selección</h2>
      <div class="dos-columnas">
        <div>
          <h3>GitHub</h3>
          <ul><li>Proyectos académicos y de código abierto</li><li>Beneficios para estudiantes</li><li>Ecosistema de integraciones</li></ul>
        </div>
        <div>
          <h3>GitLab</h3>
          <ul><li>Instalación en servidores propios</li><li>Ciclo completo en una herramienta</li><li>Grupos con herencia</li></ul>
        </div>
      </div>`,
  },
  {
    seccion: '7. Resultados, hallazgos y conclusiones',
    html: `
      <h2>Conclusiones</h2>
      <ol>
        <li>Ambas plataformas resuelven las mismas necesidades con modelos distintos.</li>
        <li>Las reglas de protección convierten la revisión en un requisito, no en una buena intención.</li>
        <li>Una regla solo es efectiva si se verifica con un caso real.</li>
        <li>El correo institucional tiene más impacto en GitHub; en GitLab depende de la universidad.</li>
      </ol>`,
  },
  {
    seccion: 'Referencias',
    html: `
      <h2>Referencias</h2>
      <ul>
        <li>Forsgren, N., Humble, J. y Kim, G. (2018). <em>Accelerate</em>. IT Revolution.</li>
        <li>GitHub Docs: planes, rulesets, secrets, Pages y GitHub Education.</li>
        <li>GitLab: GitLab for Education Program; GitLab Docs: variables, ramas protegidas y Pages.</li>
        <li>GitHub (2025). <em>Octoverse 2025</em>. Stack Overflow (2022). <em>Developer Survey</em>.</li>
      </ul>`,
  },
  {
    seccion: 'Grupo 2',
    html: `
      <h2>Preguntas</h2>
      <p class="grande">Gracias por su atención.</p>`,
  },
];

document.addEventListener('DOMContentLoaded', () => {
  renderizarNavbar();
  renderizarFooter();

  const contenedor = document.querySelector('main.container');
  contenedor.classList.add('presentacion');

  contenedor.innerHTML = `
    <p class="ayuda">Flechas del teclado para avanzar o retroceder; tecla F para pantalla completa.</p>
    ${LAMINAS.map((lamina, i) => `
      <section class="lamina ${lamina.clase || ''}" id="lamina-${i + 1}" aria-label="Lámina ${i + 1} de ${LAMINAS.length}" hidden>
        <p class="seccion-lamina">${lamina.seccion}</p>
        ${lamina.html}
        <span class="numero-lamina">${i + 1} / ${LAMINAS.length}</span>
      </section>`).join('')}
    <div class="controles">
      <button type="button" id="anterior">Anterior</button>
      <output id="contador" aria-live="polite"></output>
      <button type="button" id="siguiente">Siguiente</button>
      <button type="button" id="completa">Pantalla completa</button>
    </div>`;

  const laminas = contenedor.querySelectorAll('.lamina');
  const contador = contenedor.querySelector('#contador');
  let actual = 0;

  function mostrar(n) {
    actual = Math.max(0, Math.min(laminas.length - 1, n));
    laminas.forEach((lamina, i) => { lamina.hidden = i !== actual; });
    contador.textContent = `${actual + 1} / ${laminas.length}`;
  }

  function pantallaCompleta() {
    if (document.fullscreenElement) document.exitFullscreen();
    else contenedor.requestFullscreen();
  }

  contenedor.querySelector('#anterior').addEventListener('click', () => mostrar(actual - 1));
  contenedor.querySelector('#siguiente').addEventListener('click', () => mostrar(actual + 1));
  contenedor.querySelector('#completa').addEventListener('click', pantallaCompleta);

  document.addEventListener('keydown', (e) => {
    if (['ArrowRight', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); mostrar(actual + 1); }
    if (['ArrowLeft', 'PageUp'].includes(e.key)) { e.preventDefault(); mostrar(actual - 1); }
    if (e.key === 'Home') mostrar(0);
    if (e.key === 'End') mostrar(laminas.length - 1);
    if (e.key === 'f' || e.key === 'F') pantallaCompleta();
  });

  mostrar(0);
});
