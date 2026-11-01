(function(){
  const C = window.TDC_CONTENT;
  const palettes = ['bagru','dabu','ajrakh','kantha'];

  function fmtBadge(p){
    if(p.availability === 'out') return `<span class="badge badge-out">Out of Stock</span>`;
    if(p.availability === 'preorder') return `<span class="badge badge-preorder">Pre-order</span>`;
    if(p.availability === 'made-to-order') return `<span class="badge badge-made">Made to Order</span>`;
    return '';
  }

  function thumbHtml(p, i){
    const pat = p.palette || palettes[i % palettes.length];
    if(p.image){
      return `<div class="thumb" style="background-image:url('${p.image}');background-size:cover;background-position:center;"></div>`;
    }
    return `<div class="thumb pat-${pat}">${p.collection}</div>`;
  }

  function productCard(p, i){
    return `<a class="product-card reveal" href="product.html?id=${p.id}">
      ${thumbHtml(p, i)}
      <div class="info">
        <div class="cat">${p.collection} &middot; ${p.gender}</div>
        <h4>${p.name}</h4>
        <div class="price-row">
          <span class="price">&#8377;${p.price}</span>
          ${p.mrp > p.price ? `<span class="price-strike">&#8377;${p.mrp}</span>` : ''}
        </div>
        ${fmtBadge(p)}
      </div>
    </a>`;
  }

  function render(){
    // Hero
    const heroTag = document.getElementById('heroTagline');
    if(heroTag) heroTag.textContent = C.hero.tagline;

    // Featured products (admin-selected via "Show on homepage")
    const feat = document.getElementById('featuredGrid');
    if(feat){
      let featured = C.products.filter(p => p.featuredHome);
      if(featured.length === 0) featured = C.products.slice(0,4);
      feat.innerHTML = featured.slice(0,8).map((p,i)=>productCard(p,i)).join('');
    }

    // Trust badges
    const badgeIcons = {
      hand: '<svg viewBox="0 0 100 100"><path d="M30 55 C20 50 15 40 18 30 C20 24 27 22 30 28 C31 20 40 16 44 24 C46 18 56 18 58 26 C62 20 70 24 70 32 C74 30 80 34 78 42 C82 46 80 56 70 58 C68 68 60 74 50 74 C40 74 32 66 30 55 Z" fill="var(--gold)"/><path d="M50 46 C47 42 41 43 41 48 C41 52 46 56 50 60 C54 56 59 52 59 48 C59 43 53 42 50 46 Z" fill="var(--rust)"/></svg>',
      house: '<svg viewBox="0 0 100 100" fill="none" stroke="var(--gold)" stroke-width="5"><path d="M18 46 L50 18 L82 46" stroke-linecap="round" stroke-linejoin="round"/><path d="M26 42 V80 H74 V42" stroke-linejoin="round"/><path d="M50 72 V52 M50 52 C44 52 40 46 42 40 C48 40 52 46 50 52 M50 52 C56 52 60 46 58 40 C52 40 48 46 50 52" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      globe: '<svg viewBox="0 0 100 100" fill="none" stroke="var(--gold)" stroke-width="5"><circle cx="50" cy="50" r="38"/><path d="M50 12c-16 16-16 60 0 76M50 12c16 16 16 60 0 76" /><path d="M13 38h74M13 62h74"/></svg>',
      indiamap: '<svg viewBox="0 0 100 130"><path d="M42 3 Q50 1 58 8 Q68 10 80 22 Q84 28 70 30 Q66 34 65 40 Q63 50 62 55 Q60 63 58 70 Q55 80 52 88 Q49 97 47 105 Q45 113 44 120 Q42 112 40 105 Q37 96 35 88 Q31 78 28 70 Q24 62 22 55 Q18 47 15 42 Q12 36 20 32 Q22 26 28 20 Q31 14 35 10 Q38 6 42 3 Z" fill="var(--gold)"/><path d="M44 60 C40 55 33 57 33 63 C33 68 39 73 44 78 C49 73 55 68 55 63 C55 57 48 55 44 60 Z" fill="var(--rust)"/></svg>',
      needle: '<svg viewBox="0 0 100 100" fill="none" stroke="var(--gold)" stroke-width="5" stroke-linecap="round"><path d="M20 30 Q35 20 50 30 Q65 40 80 30"/><path d="M20 50 Q35 40 50 50 Q65 60 80 50"/><path d="M20 70 Q35 60 50 70 Q65 80 80 70"/><path d="M30 20 Q20 35 30 50 Q40 65 30 80"/><path d="M50 20 Q40 35 50 50 Q60 65 50 80"/><path d="M70 20 Q60 35 70 50 Q80 65 70 80"/></svg>',
      heart: '<svg viewBox="0 0 100 100"><path d="M50 88s-32-20-42-40C1 33 8 15 24 15c9 0 16 5 20 12 4-7 11-12 20-12 16 0 23 18 16 33-10 20-30 40-30 40z" fill="var(--gold)"/></svg>',
      leaf: '<svg viewBox="0 0 100 100" fill="none" stroke="var(--gold)" stroke-width="5"><path d="M20 80c0-40 20-60 60-62-2 40-22 60-60 62z" stroke-linejoin="round"/><path d="M25 78C45 60 60 45 78 20" stroke-linecap="round"/></svg>',
      thread: '<svg viewBox="0 0 100 100" fill="none" stroke="var(--gold)" stroke-width="5"><circle cx="38" cy="38" r="22"/><path d="M38 16c-10 7-10 37 0 44M38 60c10-7 10-37 0-44M16 38c7-10 37-10 44 0M60 38c-7 10-37 10-44 0" stroke-width="3.5"/><path d="M54 54l30 30" stroke-linecap="round"/></svg>'
    };
    const trust = document.getElementById('trustRow');
    if(trust) trust.innerHTML = C.trustBadges.items.map(it=>`
      <div class="badge-item reveal">${badgeIcons[it.icon]||badgeIcons.hand}<span>${it.label}</span></div>`).join('');

    // Promo banner
    setText('promoHeading', C.promoBanner.heading);
    setText('promoSubtext', C.promoBanner.subtext);
    const promoCta = document.getElementById('promoCta');
    if(promoCta){ promoCta.textContent = C.promoBanner.ctaLabel; promoCta.href = C.promoBanner.ctaHref; }

    // Our story
    setText('storyEyebrow', C.ourStory.eyebrow);
    setText('storyHeading', C.ourStory.heading);
    setText('storyPullQuote', '&ldquo;' + C.ourStory.pullQuote + '&rdquo;');
    setText('storyBody', C.ourStory.body);
    const craftTags = document.getElementById('craftTagsRow');
    if(craftTags) craftTags.innerHTML = C.crafts.map(c=>`<div class="tag-item"><span class="dot"></span>${c.name}</div>`).join('');

    // Nazar (merged into Our Story callout)
    setText('nazarBody', C.nazar.body);

    // Welfare
    setText('welfareEyebrow', C.welfare.eyebrow);
    setText('welfareHeading', C.welfare.heading);
    setText('welfareBody', C.welfare.body);

    // Crafts (chapters) — each may have an optional longer "story"
    const crafts = document.getElementById('craftsGrid');
    if(crafts) crafts.innerHTML = C.crafts.map(c=>`
      <div class="craft-card reveal">
        <div class="swatch pat-${c.key}"></div>
        <div class="body">
          <div class="origin">${c.origin}</div>
          <h4>${c.name}</h4>
          <p>${c.fact}</p>
          ${c.story ? `<details class="craft-story"><summary>Read the full story</summary><p>${c.story}</p></details>` : ''}
        </div>
      </div>`).join('');

    // Reviews — only those the admin has marked visible
    const rev = document.getElementById('reviewsGrid');
    if(rev){
      const visibleReviews = C.reviews.filter(r => r.visible !== false);
      rev.innerHTML = visibleReviews.map(r=>`
        <div class="review-card reveal">
          <div class="stars">${'&#9733;'.repeat(r.rating)}${'&#9734;'.repeat(5-r.rating)}</div>
          <p class="quote">&ldquo;${r.text}&rdquo;</p>
          <div class="reviewer">
            ${r.image ? `<img class="thumb-img" src="${r.image}" alt="">` : `<div class="thumb-img"></div>`}
            <span>${r.name} &middot; ${r.location}</span>
          </div>
        </div>`).join('');
    }

    // Custom admin-added sections
    const customWrap = document.getElementById('customSectionsWrap');
    if(customWrap){
      customWrap.innerHTML = (C.customSections||[]).map(s => `
        <section class="section-tight" style="background:${s.bg||'var(--ivory-deep)'};">
          <div class="container center">
            <div class="eyebrow">${s.eyebrow||''}</div>
            <h2>${s.heading||''}</h2>
            <p style="max-width:640px;margin:0 auto;color:var(--ink-soft);">${s.body||''}</p>
          </div>
        </section>`).join('');
    }

    // Instagram
    const insta = document.getElementById('instaGrid');
    if(insta){
      insta.innerHTML = palettes.concat(palettes).slice(0,10).map(p=>`<div class="insta-tile pat-${p}"></div>`).join('');
    }
    const instaLink = document.getElementById('instaLink');
    if(instaLink) instaLink.href = C.settings.instagramUrl;
  }

  function setText(id, val){ const el = document.getElementById(id); if(el) el.innerHTML = val; }

  document.addEventListener('DOMContentLoaded', render);
})();
