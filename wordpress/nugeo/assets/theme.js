/* Interações progressivas: o conteúdo funciona sem JavaScript. */
(() => {
  const body = document.body;
  const menuButton = document.querySelector('[data-menu-toggle]');
  const searchButton = document.querySelector('[data-search-toggle]');
  const navigation = document.getElementById('primary-navigation');
  const search = document.getElementById('site-search');
  const desktop = window.matchMedia('(min-width: 1200px)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  body.classList.add('nugeo-js');
  const submenus = [];
  navigation?.querySelectorAll('.nugeo-menu > li.menu-item-has-children').forEach((item, index) => {
    const submenu = item.querySelector(':scope > .sub-menu');
    const link = item.querySelector(':scope > a');
    if (!submenu || !link) return;
    submenu.id = `nugeo-submenu-${index}`;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'nugeo-submenu-toggle';
    button.textContent = '▾';
    button.setAttribute('aria-label', `Seções de ${link.textContent.trim()}`);
    button.setAttribute('aria-controls', submenu.id);
    button.setAttribute('aria-expanded', 'false');
    link.after(button);
    const close = () => { item.classList.remove('is-expanded'); button.setAttribute('aria-expanded', 'false'); };
    button.addEventListener('click', () => {
      const open = button.getAttribute('aria-expanded') !== 'true';
      submenus.forEach((entry) => entry.close());
      item.classList.toggle('is-expanded', open);
      button.setAttribute('aria-expanded', String(open));
    });
    item.addEventListener('focusout', (event) => { if (!item.contains(event.relatedTarget)) close(); });
    item.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && desktop.matches) { event.stopPropagation(); close(); button.focus(); }
    });
    submenus.push({ close });
  });

  function closeMenu(restoreFocus = false) {
    submenus.forEach((entry) => entry.close());
    navigation?.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Abrir menu principal');
    if (restoreFocus && !desktop.matches) menuButton?.focus();
  }

  function closeSearch(restoreFocus = false) {
    if (search) search.hidden = true;
    searchButton?.setAttribute('aria-expanded', 'false');
    searchButton?.setAttribute('aria-label', 'Abrir pesquisa');
    if (restoreFocus) searchButton?.focus();
  }

  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    closeSearch();
    navigation?.classList.toggle('is-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Fechar menu principal' : 'Abrir menu principal');
    if (open) navigation?.querySelector('a')?.focus();
  });

  searchButton?.addEventListener('click', () => {
    const open = searchButton.getAttribute('aria-expanded') !== 'true';
    closeMenu();
    if (search) search.hidden = !open;
    searchButton.setAttribute('aria-expanded', String(open));
    searchButton.setAttribute('aria-label', open ? 'Fechar pesquisa' : 'Abrir pesquisa');
    if (open) search?.querySelector('input')?.focus();
  });

  navigation?.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });
  desktop.addEventListener('change', () => closeMenu());
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    if (searchButton?.getAttribute('aria-expanded') === 'true') closeSearch(true);
    if (menuButton?.getAttribute('aria-expanded') === 'true') closeMenu(true);
    if (document.activeElement?.closest('.sub-menu')) document.activeElement.blur();
  });
  document.addEventListener('click', (event) => {
    if (!event.target.closest('#site-header')) { closeMenu(); closeSearch(); }
  });

  // Um observador, sem handler de scroll, e sem ocultar elementos antes de o JS funcionar.
  if (!reducedMotion.matches && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.remove('nugeo-reveal-pending');
        entry.target.classList.add('nugeo-reveal-visible');
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });

    for (const element of document.querySelectorAll('[data-reveal]')) {
      if (element.getBoundingClientRect().top < window.innerHeight) continue;
      element.classList.add('nugeo-reveal-pending');
      observer.observe(element);
    }
    reducedMotion.addEventListener('change', (event) => {
      if (!event.matches) return;
      observer.disconnect();
      document.querySelectorAll('.nugeo-reveal-pending').forEach((element) => element.classList.remove('nugeo-reveal-pending'));
    });
    document.addEventListener('focusin', (event) => {
      const element = event.target.closest('.nugeo-reveal-pending');
      if (element) { element.classList.remove('nugeo-reveal-pending'); observer.unobserve(element); }
    });
  }
})();
