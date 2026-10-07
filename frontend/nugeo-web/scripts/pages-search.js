(() => {
  const query = new URLSearchParams(location.search).get('s');
  if (!query) return;
  const main = document.querySelector('main');
  const box = document.createElement('section'); box.className = 'nugeo-pages-results';
  const heading = document.createElement('h1'); heading.textContent = `Resultados para “${query}”`;
  const status = document.createElement('p'); status.textContent = 'Pesquisando na demonstração…';
  const list = document.createElement('ul'); box.append(heading, status, list); main.replaceChildren(box);
  document.title = `Pesquisa: ${query} — NUGEO`;
  const normalize = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  const source = new URL('search-index.json', document.currentScript.src);
  fetch(source).then(response => { if (!response.ok) throw new Error('Index unavailable'); return response.json(); }).then(pages => {
    const results = pages.filter(page => terms.every(term => normalize(page.title + ' ' + page.text).includes(term)));
    status.textContent = `${results.length} resultado(s) nesta demonstração estática.`;
    for (const page of results) {
      const item = document.createElement('li'); const link = document.createElement('a');
      link.href = page.url; link.textContent = page.title; item.append(link); list.append(item);
    }
  }).catch(() => { status.textContent = 'Não foi possível carregar a busca. Utilize o menu para navegar.'; });
})();
