import { MODULE_ORDER } from './config.js';

/**
 * modules/{id}/{id}.html 을 순서대로 #app-root 에 삽입
 */
export async function loadModules(root = document.getElementById('app-root')) {
  if (!root) throw new Error('#app-root not found');

  for (const id of MODULE_ORDER) {
    const url = `modules/${id}/${id}.html`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to load module: ${url}`);
    const html = await res.text();
    root.insertAdjacentHTML('beforeend', html);
  }
}
