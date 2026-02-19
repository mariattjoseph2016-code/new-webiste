document.addEventListener('DOMContentLoaded', function () {
  // Mariatt gallery
  const galleryEl = document.getElementById('mariatt-gallery');
  if (galleryEl) {
    const images = [
      'https://images.unsplash.com/photo-1504198458649-3128b932f49b?w=1200&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1499346030926-9a72daac6c63?w=1200&auto=format&fit=crop&q=60'
    ];
    let idx = 0;
    const img = document.getElementById('gallery-image');
    const prev = document.getElementById('prev');
    const next = document.getElementById('next');
    function show(i) { img.src = images[i]; }
    if (img) { show(idx); }
    if (prev) prev.addEventListener('click', () => { idx = (idx - 1 + images.length) % images.length; show(idx); });
    if (next) next.addEventListener('click', () => { idx = (idx + 1) % images.length; show(idx); });
  }

  // Febi curated products
  const febiContainer = document.getElementById('febi-products');
  if (febiContainer && typeof products !== 'undefined' && Array.isArray(products)) {
    // choose a few product IDs that represent Febi's picks
    const picks = [1, 4, 7, 10];
    const picked = products.filter(p => picks.includes(p.id));
    picked.forEach(p => {
      const card = document.createElement('article');
      card.className = 'product-card';
      card.innerHTML = `
        <div class="product-image">${p.emoji}</div>
        <div class="product-info">
          <div class="product-category">${p.category}</div>
          <div class="product-name">${p.name}</div>
          <div class="product-description">${p.description}</div>
          <div class="product-price">$${p.price.toFixed(2)}</div>
        </div>
      `;
      febiContainer.appendChild(card);
    });
  }

  // Sijo quote generator
  const quotes = [
    'The only limit to our realization of tomorrow is our doubts of today. — F. D. Roosevelt',
    'Do what you can, with what you have, where you are. — T. Roosevelt',
    'Simplicity is the ultimate sophistication. — Leonardo da Vinci',
    'Start where you are. Use what you have. Do what you can. — Arthur Ashe'
  ];
  const quoteText = document.getElementById('quote-text');
  const newQuoteBtn = document.getElementById('new-quote');
  if (newQuoteBtn && quoteText) {
    newQuoteBtn.addEventListener('click', () => {
      const q = quotes[Math.floor(Math.random() * quotes.length)];
      quoteText.textContent = q;
    });
  }
});
