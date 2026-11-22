import './styles/style.css';
import { renderizarNavbar, renderizarFooter } from './components/layout.js';

document.addEventListener('DOMContentLoaded', () => {
  renderizarNavbar();
  renderizarFooter();

  const contenedor = document.querySelector('main.container');

  const comandos = [
    { cmd: "git clone <url>", desc: "Clona el repositorio remoto completo con su historial." },
    { cmd: "git switch -c <rama>", desc: "Crea y cambia a una rama aislada de trabajo." },
    { cmd: "git status -s", desc: "Muestra en formato corto los archivos modificados o sin seguimiento." },
    { cmd: "git add .", desc: "Envía todos los cambios al área de preparación (Staging)." },
    { cmd: 'git commit -m "feat: mensaje"', desc: "Registra una instantánea usando Conventional Commits." },
    { cmd: "git push -u origin <rama>", desc: "Publica la rama local en el repositorio remoto." },
    { cmd: "git fetch --all", desc: "Descarga referencias y ramas remotas sin alterar el código local." },
    { cmd: "git pull --rebase origin develop", desc: "Actualiza la rama actual manteniendo un historial limpio y lineal." },
    { cmd: "git diff", desc: "Muestra línea por línea los cambios aún no confirmados." },
    { cmd: "git log --oneline --graph -n 10", desc: "Visualiza el árbol de commits y fusiones recientes." },
    { cmd: "git stash", desc: "Guarda temporalmente cambios sin confirmar para cambiar de rama." },
    { cmd: "git revert <hash>", desc: "Revierte un commit previo creando uno nuevo sin reescribir historial." },
    { cmd: 'git tag -a v1.0.0 -m "Release"', desc: "Crea una etiqueta anotada bajo Semantic Versioning." },
    { cmd: "git push origin v1.0.0", desc: "Publica la etiqueta de versión en el remoto." },
    { cmd: "git branch -d <rama>", desc: "Elimina localmente una rama ya fusionada." }
  ];

  contenedor.innerHTML = `
    <section style="max-width: 960px; margin: 2rem auto; padding: 2rem; border: 1px solid #cbd5e1; border-radius: 12px; background: #ffffff;">
      <header style="border-bottom: 1px solid #e2e8f0; padding-bottom: 1rem; margin-bottom: 1.5rem;">
        <h1 style="font-size: 1.9rem; color: #0f172a; margin-bottom: 0.4rem;">Recursos Técnicos y Guía Rápida de Git</h1>
        <p style="color: #475569;">Arquitectura de Software · Grupo 2 · Aporte: Ernesto Alexander Chicango Brusil</p>
      </header>

      <h2 style="font-size: 1.3rem; color: #1e40af; margin-bottom: 0.75rem;">1. Los 15 comandos esenciales del flujo colaborativo</h2>
      <p style="color: #334155; margin-bottom: 1rem;">Haz clic en <strong>Copiar</strong> para llevar cualquier comando directo a tu terminal:</p>
      
      <div style="overflow-x: auto; margin-bottom: 2rem;">
        <table style="width: 100%; border-collapse: collapse; font-size: 0.95rem;">
          <thead>
            <tr style="background: #f1f5f9; text-align: left;">
              <th style="padding: 0.65rem; border: 1px solid #cbd5e1;">Comando</th>
              <th style="padding: 0.65rem; border: 1px solid #cbd5e1;">Propósito en el flujo</th>
              <th style="padding: 0.65rem; border: 1px solid #cbd5e1; text-align: center;">Acción</th>
            </tr>
          </thead>
          <tbody>
            ${comandos.map((item, i) => `
              <tr>
                <td style="padding: 0.6rem; border: 1px solid #cbd5e1;"><code>${item.cmd.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></td>
                <td style="padding: 0.6rem; border: 1px solid #cbd5e1; color: #1e293b;">${item.desc}</td>
                <td style="padding: 0.6rem; border: 1px solid #cbd5e1; text-align: center;">
                  <button data-idx="${i}" class="btn-copiar" style="padding: 0.3rem 0.7rem; cursor: pointer; border: 1px solid #94a3b8; border-radius: 6px; background: #f8fafc;">Copiar</button>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>

      <h2 style="font-size: 1.3rem; color: #1e40af; margin-bottom: 0.75rem;">2. Cuotas gratuitas de ejecución CI/CD y multiplicadores</h2>
      <div style="overflow-x: auto; margin-bottom: 2rem;">
        <table style="width: 100%; border-collapse: collapse; font-size: 0.95rem;">
          <thead>
            <tr style="background: #f1f5f9; text-align: left;">
              <th style="padding: 0.65rem; border: 1px solid #cbd5e1;">Plataforma / Plan</th>
              <th style="padding: 0.65rem; border: 1px solid #cbd5e1;">Minutos gratis incluidos</th>
              <th style="padding: 0.65rem; border: 1px solid #cbd5e1;">Regla de consumo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 0.6rem; border: 1px solid #cbd5e1;"><strong>GitHub Actions (Free)</strong></td>
              <td style="padding: 0.6rem; border: 1px solid #cbd5e1;">2.000 min/mes en privados · Ilimitado en públicos</td>
              <td style="padding: 0.6rem; border: 1px solid #cbd5e1;">Linux ×1, Windows ×2, macOS ×10 (redondeo al minuto superior)</td>
            </tr>
            <tr>
              <td style="padding: 0.6rem; border: 1px solid #cbd5e1;"><strong>GitHub Pro (Student Pack)</strong></td>
              <td style="padding: 0.6rem; border: 1px solid #cbd5e1;">3.000 min/mes en privados · Ilimitado en públicos</td>
              <td style="padding: 0.6rem; border: 1px solid #cbd5e1;">Incluye protección de ramas en repositorios privados</td>
            </tr>
            <tr>
              <td style="padding: 0.6rem; border: 1px solid #cbd5e1;"><strong>GitLab CI/CD (Free)</strong></td>
              <td style="padding: 0.6rem; border: 1px solid #cbd5e1;">400 min/mes compartidos (públicos y privados)</td>
              <td style="padding: 0.6rem; border: 1px solid #cbd5e1;">Runners compartidos ×1; runners propios (self-hosted) consumen 0 min</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 style="font-size: 1.3rem; color: #1e40af; margin-bottom: 0.75rem;">3. Estándares aplicados en el repositorio</h2>
      <ul style="line-height: 1.8; color: #1e293b; padding-left: 1.5rem;">
        <li><strong>Conventional Commits:</strong> <code>feat:</code> (nueva función), <code>fix:</code> (corrección), <code>docs:</code> (documentación), <code>ci:</code> (pipelines), <code>chore:</code> (mantenimiento).</li>
        <li><strong>Semantic Versioning (SemVer):</strong> <code>vMAYOR.MENOR.PARCHE</code> (ej. <code>v1.0.0</code> para entrega estable).</li>
        <li><strong>Protección de ramas:</strong> Prohibido el <code>push</code> directo a <code>main</code> o <code>develop</code>; todo cambio pasa por Pull/Merge Request con validación automática en verde.</li>
      </ul>
    </section>
  `;

  document.querySelectorAll(".btn-copiar").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = btn.getAttribute("data-idx");
      navigator.clipboard.writeText(comandos[idx].cmd);
      const original = btn.textContent;
      btn.textContent = "Copiado";
      setTimeout(() => { btn.textContent = original; }, 1200);
    });
  });
});
