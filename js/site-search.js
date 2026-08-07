// Client-side site search — no backend, just a small curated index of pages/sections.
const SITE_SEARCH_INDEX = [
  { title: 'Home', url: 'index.html', keywords: 'home landing hero start' },
  { title: 'About CIAS', url: 'about.html', keywords: 'about mission vision history overview center' },
  { title: 'Research Areas', url: 'index.html#research', keywords: 'research areas focus projects publications' },
  { title: 'Research Tracks', url: 'about.html', keywords: 'research tracks disciplines' },
  { title: 'Track Leaders', url: 'people.html#leaders', keywords: 'leadership directors track leaders faculty' },
  { title: 'People', url: 'people.html', keywords: 'people team affiliates researchers staff' },
  { title: 'Senior Affiliates', url: 'people.html#senior', keywords: 'senior affiliates researchers' },
  { title: 'Junior Affiliates', url: 'people.html#junior', keywords: 'junior research affiliate students emerging' },
  { title: 'External Affiliates', url: 'people.html#external', keywords: 'external affiliates partners collaborators' },
  { title: 'News & Events', url: 'news.html', keywords: 'news events announcements updates' },
  { title: 'Collaborations', url: 'collaborations.html', keywords: 'collaborations partners partnerships industry' },
  { title: 'Contact', url: 'contact.html', keywords: 'contact email message form get in touch' }
];

function initSiteSearch() {
  const btn = document.getElementById('searchBtn');
  const panel = document.getElementById('searchPanel');
  const input = document.getElementById('searchInput');
  const results = document.getElementById('searchResults');
  if (!btn || !panel || !input || !results) return;

  let activeIndex = -1;

  function renderResults(query) {
    const q = query.trim().toLowerCase();
    const matches = q
      ? SITE_SEARCH_INDEX.filter(item =>
          item.title.toLowerCase().includes(q) || item.keywords.toLowerCase().includes(q)
        )
      : SITE_SEARCH_INDEX;

    activeIndex = -1;

    if (matches.length === 0) {
      results.innerHTML = '<li class="px-4 py-3 text-sm text-slate-400">No matches found.</li>';
      return;
    }

    results.innerHTML = matches.map(item => `
      <li>
        <a href="${item.url}" class="search-result-link block px-3 py-2.5 text-sm text-slate-200 hover:bg-white/5 hover:text-brand-orange transition rounded-lg">
          ${item.title}
        </a>
      </li>
    `).join('');
  }

  function setActive(index) {
    const links = results.querySelectorAll('a');
    links.forEach(l => l.classList.remove('bg-white/5', 'text-brand-orange'));
    if (links[index]) links[index].classList.add('bg-white/5', 'text-brand-orange');
  }

  function openPanel() {
    panel.classList.remove('hidden');
    btn.setAttribute('aria-expanded', 'true');
    input.value = '';
    renderResults('');
    setTimeout(() => input.focus(), 10);
  }

  function closePanel() {
    panel.classList.add('hidden');
    btn.setAttribute('aria-expanded', 'false');
  }

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (panel.classList.contains('hidden')) openPanel(); else closePanel();
  });

  input.addEventListener('input', () => renderResults(input.value));

  input.addEventListener('keydown', (e) => {
    const links = results.querySelectorAll('a');
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      activeIndex = Math.min(activeIndex + 1, links.length - 1);
      setActive(activeIndex);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeIndex = Math.max(activeIndex - 1, 0);
      setActive(activeIndex);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const target = links[activeIndex] || links[0];
      if (target) window.location.href = target.getAttribute('href');
    } else if (e.key === 'Escape') {
      closePanel();
    }
  });

  document.addEventListener('click', (e) => {
    if (!panel.classList.contains('hidden') && !panel.contains(e.target) && !btn.contains(e.target)) {
      closePanel();
    }
  });
}

document.addEventListener('DOMContentLoaded', initSiteSearch);
