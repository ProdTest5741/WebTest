/* ============================================================
   THE DESI CHAPTER — main.js
   Shared behaviour included on every storefront page.
   Depends on content-store.js being loaded first.
   ============================================================ */

(function(){
  const C = window.TDC_CONTENT;

  /* ---------- Apply theme colours from the content store ---------- */
  function applyTheme(){
    const t = C.theme || {};
    const root = document.documentElement.style;
    if(t.ivory) root.setProperty('--ivory', t.ivory);
    if(t.ivoryDeep) root.setProperty('--ivory-deep', t.ivoryDeep);
    if(t.indigo) root.setProperty('--indigo', t.indigo);
    if(t.rust) root.setProperty('--rust', t.rust);
    if(t.gold) root.setProperty('--gold', t.gold);
    if(t.ink) root.setProperty('--ink', t.ink);
    if(t.inkSoft) root.setProperty('--ink-soft', t.inkSoft);
    if(t.success) root.setProperty('--success', t.success);
  }
  applyTheme();

  /* ---------- Path helper: pages inside /policies or /admin need ../ ---------- */
  const inSub = /\/(policies|admin)\//.test(window.location.pathname);
  const base = inSub ? '../' : '';

  /* ---------- Render marquee ---------- */
  function renderMarquee(){
    const el = document.getElementById('marqueeTrack');
    if(!el) return;
    const items = (C.marquee || []).map(t => `<span>&#10022; ${t}</span>`).join('');
    el.innerHTML = items + items; // duplicate for seamless loop
  }

  /* ---------- Render header menu (drawer) ---------- */
  function renderMenu(){
    const el = document.getElementById('drawerMenu');
    if(!el) return;
    el.innerHTML = (C.menu || []).map(m => {
      let href = m.href;
      if(!/^https?:\/\//.test(href)) href = base + href;
      return `<li><a href="${href}">${m.label}</a></li>`;
    }).join('');
  }

  function renderBrand(){
    document.querySelectorAll('[data-brand-name]').forEach(n => n.textContent = C.settings.siteName);
    document.querySelectorAll('[data-brand-logo]').forEach(n => n.src = base + 'assets/logo.png');
  }

  /* ---------- Render footer ---------- */
  function renderFooter(){
    const el = document.getElementById('footerContent');
    if(!el) return;
    const menuLinks = (C.menu||[]).map(m=>{
      let href = m.href; if(!/^https?:\/\//.test(href)) href = base + href;
      return `<li><a href="${href}">${m.label}</a></li>`;
    }).join('');
    el.innerHTML = `
      <div>
        <h5>The Desi Chapter</h5>
        <p style="max-width:280px;color:#c3ccd1;font-size:.88rem;">${C.settings.tagline}</p>
        <p style="margin-top:14px;"><a href="${C.settings.instagramUrl}" target="_blank" rel="noopener" style="color:#d9e0e4;">Instagram &#8599;</a></p>
      </div>
      <div><h5>Navigate</h5><ul>${menuLinks}</ul></div>
      <div>
        <h5>Account</h5>
        <ul>
          <li><a href="${base}login.html">Customer Login</a></li>
          <li><a href="${base}signup.html">Create Account</a></li>
          <li><a href="${base}admin/dashboard.html">Admin Login</a></li>
        </ul>
      </div>
      <div>
        <h5>Reach Us</h5>
        <ul>
          <li>${C.settings.contactEmail}</li>
          <li>${C.settings.contactPhone}</li>
          <li>${C.settings.freeShippingNote}</li>
        </ul>
      </div>`;
    const yearEl = document.getElementById('footerYear');
    if(yearEl) yearEl.textContent = new Date().getFullYear();
  }

  /* ---------- Cart (localStorage) ---------- */
  const CART_KEY = 'tdc_cart_v1';
  function getCart(){ try{ return JSON.parse(localStorage.getItem(CART_KEY)) || []; }catch(e){ return []; } }
  function saveCart(items){ localStorage.setItem(CART_KEY, JSON.stringify(items)); renderCartCount(); }
  function addToCart(product, size, qty){
    const items = getCart();
    const existing = items.find(i => i.id === product.id && i.size === size);
    if(existing){ existing.qty += qty; }
    else{ items.push({ id: product.id, name: product.name, price: product.price, size, qty, palette: product.palette }); }
    saveCart(items);
  }
  function removeFromCart(idx){ const items = getCart(); items.splice(idx,1); saveCart(items); renderCartDrawer(); }
  function renderCartCount(){
    const n = getCart().reduce((s,i)=>s+i.qty,0);
    document.querySelectorAll('.cart-count').forEach(el => { el.textContent = n; el.style.display = n>0?'flex':'none'; });
  }
  function renderCartDrawer(){
    const el = document.getElementById('cartItems');
    if(!el) return;
    const items = getCart();
    if(items.length===0){ el.innerHTML = '<div class="cart-empty">Your cart is empty.<br>Time to start a chapter.</div>'; }
    else{
      let total = 0;
      el.innerHTML = items.map((i,idx)=>{
        total += i.price*i.qty;
        return `<div class="cart-item">
          <div class="thumb pat-${i.palette||'bagru'}"></div>
          <div class="grow">
            <div style="font-size:.92rem;font-weight:500;">${i.name}</div>
            <div style="font-size:.78rem;color:var(--ink-soft);">Size ${i.size} &middot; Qty ${i.qty}</div>
            <div style="font-size:.85rem;color:var(--indigo);margin-top:4px;">&#8377;${i.price*i.qty}</div>
          </div>
          <button aria-label="Remove" onclick="TDC.removeFromCart(${idx})" style="background:none;border:none;color:var(--rust);font-size:1.1rem;">&times;</button>
        </div>`;
      }).join('') + `<div style="padding-top:18px;display:flex;justify-content:space-between;font-family:var(--f-label);letter-spacing:.06em;">
          <span>SUBTOTAL</span><span>&#8377;${total}</span>
        </div>
        <a class="btn btn-solid btn-block" style="margin-top:16px;text-align:center;" href="checkout.html">Checkout</a>`;
    }
  }

  /* ---------- Drawer / cart toggles ---------- */
  function wireDrawers(){
    const drawer = document.getElementById('navDrawer');
    const overlay = document.getElementById('drawerOverlay');
    const openBtn = document.getElementById('menuBtn');
    const closeBtn = document.getElementById('drawerCloseBtn');
    const cart = document.getElementById('cartDrawer');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartOpenBtn = document.getElementById('cartBtn');
    const cartCloseBtn = document.getElementById('cartCloseBtn');

    function openDrawer(){ drawer && drawer.classList.add('open'); overlay && overlay.classList.add('open'); }
    function closeDrawer(){ drawer && drawer.classList.remove('open'); overlay && overlay.classList.remove('open'); }
    function openCart(){ renderCartDrawer(); cart && cart.classList.add('open'); cartOverlay && cartOverlay.classList.add('open'); }
    function closeCart(){ cart && cart.classList.remove('open'); cartOverlay && cartOverlay.classList.remove('open'); }

    openBtn && openBtn.addEventListener('click', openDrawer);
    closeBtn && closeBtn.addEventListener('click', closeDrawer);
    overlay && overlay.addEventListener('click', closeDrawer);
    cartOpenBtn && cartOpenBtn.addEventListener('click', openCart);
    cartCloseBtn && cartCloseBtn.addEventListener('click', closeCart);
    cartOverlay && cartOverlay.addEventListener('click', closeCart);
  }

  /* ---------- Scroll reveal ---------- */
  function wireReveal(){
    const els = document.querySelectorAll('.reveal');
    if(!('IntersectionObserver' in window)){ els.forEach(e=>e.classList.add('in')); return; }
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: .15 });
    els.forEach(e=>io.observe(e));
  }

  /* ---------- Newsletter form ---------- */
  function wireNewsletter(){
    const form = document.getElementById('newsletterForm');
    if(!form) return;
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const msg = document.getElementById('newsletterMsg');
      msg.textContent = "You're on the list — welcome to the chapter.";
    });
  }

  /* ---------- Init ---------- */
  document.addEventListener('DOMContentLoaded', function(){
    renderMarquee();
    renderMenu();
    renderBrand();
    renderFooter();
    renderCartCount();
    wireDrawers();
    wireReveal();
    wireNewsletter();
  });

  window.TDC = {
    content: C, base, getCart, saveCart, addToCart, removeFromCart, renderCartDrawer, renderCartCount
  };
})();
