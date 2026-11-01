/* ============================================================
   THE DESI CHAPTER — Content Store
   --------------------------------------------------------------
   Every editable word, price, colour and image label on the site
   lives in this one object. The admin dashboard (admin/dashboard.html)
   edits this object and saves it to localStorage; every page reads
   from localStorage first and falls back to these defaults.

   IMPORTANT (read this before hosting for real customers):
   localStorage lives inside ONE browser on ONE device. It is perfect
   for building, demoing and previewing the whole editable-CMS
   experience, but it will NOT sync between the admin's laptop and a
   customer's phone. To go live with real multi-user editing you
   need this same object stored in a real database and served over
   an API — see README.md "Going from prototype to production".
   ============================================================ */

const STORE_KEY = "tdc_site_content_v1";

const DEFAULT_CONTENT = {
  theme: {
    ivory: "#F4EBD8",
    ivoryDeep: "#EADFC3",
    indigo: "#1E3A52",
    rust: "#96402C",
    gold: "#B98A34",
    ink: "#2B241C",
    success: "#4b7b52",
    inkSoft: "#5b5346"
  },
  settings: {
    siteName: "The Desi Chapter",
    tagline: "Rooted in tradition, made for today.",
    instagramUrl: "https://instagram.com/thedesichapter",
    contactEmail: "hello@thedesichapter.com",
    contactPhone: "+91 90000 00000",
    whatsapp: "+91 90000 00000",
    freeShippingNote: "Delivered within 7 days, pan-India."
  },
  marquee: [
    "MADE IN INDIA",
    "DESI VIBE, EVERYDAY EASE",
    "TAILORED FOR EVERYDAY USE",
    "DELIVERED WITHIN 7 DAYS",
    "A PORTION OF EVERY SALE FEEDS STREET DOGS"
  ],
  menu: [
    { label: "Shop", href: "shop.html" },
    { label: "Our Story", href: "index.html#our-story" },
    { label: "Welfare Interest", href: "index.html#welfare" },
    { label: "Contact", href: "contact.html" },
    { label: "Return & Exchange Policy", href: "policies/return-exchange.html" },
    { label: "Privacy Policy", href: "policies/privacy-policy.html" },
    { label: "Shipping & Delivery Policy", href: "policies/shipping-policy.html" }
  ],
  hero: {
    heading: "The Desi Chapter",
    tagline: "Rooted in tradition, made for today.",
    ctaLabel: "View the Collection",
    ctaHref: "shop.html"
  },
  trustBadges: {
    items: [
      { label: "Handcrafted", icon: "hand" },
      { label: "Homegrown", icon: "house" },
      { label: "Made in India", icon: "globe" },
      { label: "Craft Centric", icon: "needle" }
    ]
  },
  promoBanner: {
    eyebrow: "Made With Love",
    heading: "Where Tradition Meets You, Every Day",
    subtext: "Rooted. Expressive. A little nostalgic, a little bold.",
    ctaLabel: "Shop Now",
    ctaHref: "shop.html"
  },
  ourStory: {
    eyebrow: "Our Story",
    heading: "A Love Letter From India, Stitched by Karigars",
    pullQuote: "The Desi Chapter is a love letter from India — its patterns, its karigars, its quiet devotion to craft.",
    body: "It began with a plain white kurta at a family wedding, and a quiet question: why do our most beautiful things only come out for festivals? The Desi Chapter is our answer — Bagru florals and Ajrakh geometry, Dabu resists and Kantha stitches, cut into clothes you would actually reach for on a Tuesday. Not a costume of India, but a way of carrying her patterns into the everyday."
  },
  nazar: {
    eyebrow: "Nazar Protection",
    heading: "Nazar Protection",
    body: "Every desi mother has her own ritual against nazar — a kala tika behind the ear, a lemon-chilli by the door, a knot tied for luck. We grew up on that same loving obsession with warding off the evil eye, so we wove it right into the label: a small nazar protection stitched into every piece. So go on, wear it carefree: nazar nahi lagega."
  },
  welfare: {
    eyebrow: "Welfare Interest",
    heading: "Every piece looks after a street dog too",
    body: "A portion of profit from every single order goes toward the feeding, sterilisation and medical care of street dogs in the neighbourhoods where we work. No grand claims — just a small, steady commitment that grows with every chapter we sell."
  },
  /* Each "craft" is one chapter's story (Bagru, Dabu, Ajrakh, Kantha...).
     Add, edit or remove chapters freely from the admin dashboard —
     "fact" is the short card text, "story" is an optional longer
     read for a chapter that deserves more room (e.g. a launch story). */
  crafts: [
    { key: "bagru", name: "Bagru", origin: "Bagru, Rajasthan", fact: "Hand block-printed using hand-carved teak blocks, Bagru prints are known for their earthy, natural dyes and repeating floral 'booti' motifs — a craft over 300 years old, practised by the Chhipa community.", story: "" },
    { key: "dabu", name: "Dabu", origin: "Rajasthan", fact: "A mud-resist printing technique where a paste of clay, gum and lime is applied before dyeing, so the covered areas resist colour — giving Dabu its soft, earthy negative-space patterns.", story: "" },
    { key: "ajrakh", name: "Ajrakh", origin: "Kutch, Gujarat & Sindh", fact: "A labour-intensive resist-dye technique using natural indigo and madder root, built up in over a dozen steps, producing the deep blue-and-red geometric prints Ajrakh is known for.", story: "" },
    { key: "kantha", name: "Kantha", origin: "West Bengal & Odisha", fact: "A running-stitch embroidery tradition, originally used to layer and quilt old saris into soft new cloth — every uneven stitch a small record of the hand that made it.", story: "" }
  ],
  reviews: [
    { name: "Aarushi M.", location: "Mumbai", rating: 5, text: "The Bagru kurta feels like something my grandmother would have worn, but somehow still works with my jeans on a Monday. Loved it.", image: "", visible: true },
    { name: "Devika R.", location: "Bengaluru", rating: 5, text: "Fabric quality is gorgeous, and I love that a part of it goes to street dogs. Ordering my second chapter piece already.", image: "", visible: true },
    { name: "Kabir S.", location: "Delhi", rating: 4, text: "Ajrakh print co-ord set is beautifully made. Delivery took exactly a week as promised.", image: "", visible: true }
  ],
  /* Flat list of craft/print filter tags used on the shop page chips. */
  collections: ["All", "Bagru", "Dabu", "Ajrakh", "Kantha"],
  /* Nested merchandising categories for future growth — e.g. Women > Ethnic
     Wear / Daily Wear / Party Wear / Night Wear. Fully editable (add/remove
     both the top-level category and its sub-collections) from the admin
     dashboard's Categories & Collections panel. Not required for the shop
     page to work today, but ready for when the catalog grows. */
  merchCategories: [
    { name: "Women", subcollections: ["Ethnic Wear", "Daily Wear", "Party Wear", "Night Wear"] },
    { name: "Men", subcollections: ["Ethnic Wear", "Daily Wear"] },
    { name: "Accessories", subcollections: [] },
    { name: "Home Decor", subcollections: [] }
  ],
  /* Optional freeform sections the admin can add to the homepage —
     e.g. a seasonal note, a "Chapter Two coming soon" teaser, and so on.
     Rendered in order, after the built-in sections. */
  customSections: [],
  /* Size guide charts — admin uploads one image per guide (e.g. Women's Kurta
     Sizing, Men's Shirt Sizing). Each product picks one from the "Size Guide"
     dropdown on the product form, so different product lines (e.g. once Men's
     styles launch) can point to a different chart. Upload your first chart
     from the admin dashboard's Products panel. */
  sizeGuides: [
    { id: "sg-default", name: "General Size Guide", image: "" }
  ],
  /* Shown on every product page — editable from the admin dashboard's
     Content panel rather than per-product, since these are usually the
     same policies across the whole catalog. */
  productPageInfo: {
    shippingReturnsText: "Delivered within 7 business days across India. Read our Shipping Policy and Return & Exchange Policy.",
    fabricCareText: "100% cotton, hand block-printed / hand-embroidered. Gentle hand wash in cold water, dry in shade.",
    welfareNote: "A portion of this sale goes toward the feeding, sterilisation and medical care of street dogs in our community."
  },
  products: [
    {
      id: "p1", name: "Bagru Floral Kurta", collection: "Bagru",
      category: "Women", subCollection: "Ethnic Wear", sizeGuideId: "sg-default",
      price: 2450, mrp: 2900, availability: "available",
      region: "Rajasthan", palette: "indigo", image: "", featuredHome: true,
      description: "A hand block-printed cotton kurta in the classic Bagru booti motif, cut for everyday ease. Nazar-protected inside label.",
      sizes: ["S", "M", "L", "XL"],
      gender: "Women"
    },
    {
      id: "p2", name: "Ajrakh Co-ord Set", collection: "Ajrakh",
      category: "Women", subCollection: "Party Wear", sizeGuideId: "sg-default",
      price: 3200, mrp: 3200, availability: "made-to-order",
      region: "Gujarat", palette: "rust", image: "", featuredHome: true,
      description: "Indigo and madder Ajrakh print co-ord set, hand-printed in Kutch using a fourteen-step natural dye process.",
      sizes: ["S", "M", "L"],
      gender: "Women"
    },
    {
      id: "p3", name: "Dabu Resist Shirt", collection: "Dabu",
      category: "Men", subCollection: "Daily Wear", sizeGuideId: "sg-default",
      price: 2100, mrp: 2100, availability: "out",
      region: "Rajasthan", palette: "gold", image: "", featuredHome: true,
      description: "A relaxed-fit shirt in mud-resist Dabu print, soft earthy tones that only get better with wash.",
      sizes: ["M", "L", "XL"],
      gender: "Men"
    },
    {
      id: "p4", name: "Kantha Stitch Dress", collection: "Kantha",
      category: "Women", subCollection: "Party Wear", sizeGuideId: "sg-default",
      price: 2850, mrp: 3400, availability: "preorder",
      region: "West Bengal", palette: "indigo", image: "", featuredHome: true,
      description: "Hand-embroidered running-stitch Kantha work over soft cotton, gently gathered for a flattering everyday silhouette.",
      sizes: ["S", "M", "L"],
      gender: "Women"
    },
    {
      id: "p5", name: "Paisley Print Shirt", collection: "Bagru",
      category: "Men", subCollection: "Ethnic Wear", sizeGuideId: "sg-default",
      price: 2250, mrp: 2250, availability: "available",
      region: "Rajasthan", palette: "rust", image: "", featuredHome: false,
      description: "A crisp cotton shirt carrying the timeless ambi (paisley) motif in a modern colourway.",
      sizes: ["S", "M", "L", "XL"],
      gender: "Men"
    },
    {
      id: "p6", name: "Ajrakh Wrap Dress", collection: "Ajrakh",
      category: "Women", subCollection: "Ethnic Wear", sizeGuideId: "sg-default",
      price: 3600, mrp: 3600, availability: "available",
      region: "Gujarat", palette: "indigo", image: "", featuredHome: false,
      description: "An easy wrap silhouette in classic Ajrakh block print, finished with hand-stitched edges.",
      sizes: ["S", "M", "L"],
      gender: "Women"
    }
  ],
  coupons: [
    { code: "DESI10", type: "percent", value: 10, active: true, note: "10% off first order" },
    { code: "FESTIVE300", type: "flat", value: 300, active: true, note: "Flat ₹300 off orders above ₹2500" }
  ],
  policies: {
    returnExchange: {
      heading: "Return & Exchange Policy",
      updated: "Last updated: July 2026",
      body:
`<p>At The Desi Chapter, every piece is checked before it leaves us — but if something isn't right, we want to make it easy to put right.</p>

<h3>Exchange &amp; Return Window</h3>
<ul>
<li>You may request an exchange or return within 7 days of the delivery date.</li>
<li>Items must be unused, unwashed, unaltered and returned with all original tags and packaging intact.</li>
<li>Innerwear, and items marked "Final Sale", are not eligible for return or exchange.</li>
</ul>

<h3>How to Request a Return or Exchange</h3>
<ul>
<li>Email us at hello@thedesichapter.com or reach out via the Contact page with your order number and reason for return.</li>
<li>Our team will confirm eligibility and share the return pickup / drop-off details.</li>
<li>Once the item passes quality check on our end, we will process your exchange or refund.</li>
</ul>

<h3>Refunds</h3>
<ul>
<li>Approved refunds are issued to the original payment method within 7–10 business days of the item reaching us.</li>
<li>Shipping charges, where applicable, are non-refundable.</li>
</ul>

<h3>Damaged or Incorrect Items</h3>
<ul>
<li>If you receive a damaged, defective or incorrect item, please write to us within 48 hours of delivery with photos of the product and packaging, and we will arrange a free replacement or full refund.</li>
</ul>

<h3>Need Help?</h3>
<p>Reach us any time at hello@thedesichapter.com — we read every message ourselves.</p>`
    },
    privacy: {
      heading: "Privacy Policy",
      updated: "Last updated: July 2026",
      body:
`<p>This Privacy Policy explains how The Desi Chapter ("we", "us") collects, uses and protects the personal information of visitors and customers ("you") on thedesichapter.com.</p>

<h3>Information We Collect</h3>
<ul>
<li>Contact details you provide at sign-up or checkout: name, email address, phone number and delivery address.</li>
<li>Order history and preferences, so we can process and follow up on your orders.</li>
<li>Basic device and browsing information collected automatically, such as pages visited and general location, to help us improve the site.</li>
</ul>

<h3>How We Use Your Information</h3>
<ul>
<li>To create and manage your account, verify it via OTP, and process and deliver your orders.</li>
<li>To send order updates, and — only if you opt in — occasional emails about new chapters, offers and our welfare work.</li>
<li>To understand which products and regions are resonating, so we can plan better collections.</li>
</ul>

<h3>Sharing of Information</h3>
<ul>
<li>We share only the delivery details necessary with our shipping partners so your order can reach you.</li>
<li>We do not sell your personal information to third parties.</li>
</ul>

<h3>Your Choices</h3>
<ul>
<li>You may update your account details at any time by logging in.</li>
<li>You may unsubscribe from marketing emails using the link in any newsletter.</li>
<li>You may request deletion of your account and associated data by writing to us.</li>
</ul>

<h3>Data Security</h3>
<p>We use industry-standard measures to protect your data, including encrypted connections and access-controlled systems. No method of transmission over the internet is 100% secure, but we work continuously to protect your information.</p>

<h3>Contact Us</h3>
<p>Questions about this policy can be sent to hello@thedesichapter.com.</p>`
    },
    shipping: {
      heading: "Shipping & Delivery Policy",
      updated: "Last updated: July 2026",
      body:
`<p>We currently ship across India only.</p>

<h3>Delivery Timelines</h3>
<ul>
<li>Orders are processed within 1–2 business days of confirmation.</li>
<li>Standard delivery across India takes up to 7 business days from dispatch, depending on your location.</li>
<li>You will receive tracking details by email and SMS as soon as your order is shipped.</li>
</ul>

<h3>Shipping Charges</h3>
<ul>
<li>Shipping charges, if any, are calculated at checkout based on your delivery address and order value.</li>
</ul>

<h3>Order Tracking</h3>
<ul>
<li>You can track your order any time from the "My Orders" section of your account using the link sent to you at dispatch.</li>
</ul>

<h3>Delays</h3>
<ul>
<li>While we aim to always meet our stated timelines, delivery may occasionally be delayed due to weather, courier disruptions or regional restrictions beyond our control. We will keep you informed if this happens.</li>
</ul>

<h3>Questions</h3>
<p>For any shipping-related query, write to us at hello@thedesichapter.com with your order number.</p>`
    }
  }
};

function loadContent(){
  try{
    const raw = localStorage.getItem(STORE_KEY);
    if(!raw) return structuredClone(DEFAULT_CONTENT);
    const parsed = JSON.parse(raw);
    // shallow-merge so new default fields (from future updates) still appear
    return Object.assign(structuredClone(DEFAULT_CONTENT), parsed);
  }catch(e){
    console.warn("Content store read failed, using defaults", e);
    return structuredClone(DEFAULT_CONTENT);
  }
}

function saveContent(content){
  localStorage.setItem(STORE_KEY, JSON.stringify(content));
}

function resetContent(){
  localStorage.removeItem(STORE_KEY);
}

window.TDC_CONTENT = loadContent();
window.TDC_saveContent = saveContent;
window.TDC_resetContent = resetContent;
window.TDC_DEFAULTS = DEFAULT_CONTENT;

/* ============================================================
   Demo customer seed — so you can preview the account page /
   customer UI immediately without going through signup first.
   Demo login: demo@thedesichapter.com / demo1234
   Or via Phone OTP: 9876543210 (any demo OTP shown on screen)
   ============================================================ */
(function seedDemoCustomer(){
  try{
    const customers = JSON.parse(localStorage.getItem('tdc_customers') || '[]');
    const exists = customers.some(c => c.phone === '9876543210' || c.email === 'demo@thedesichapter.com');
    if(!exists){
      customers.push({
        name: "Ananya Sharma",
        email: "demo@thedesichapter.com",
        phone: "9876543210",
        address: {
          line1: "12 Worli Sea Face Apartments",
          line2: "Dr Annie Besant Road",
          landmark: "Near Worli Naka",
          city: "Mumbai",
          state: "Maharashtra",
          pincode: "400018",
          country: "India"
        },
        passwordHash: btoa("demo1234")
      });
      localStorage.setItem('tdc_customers', JSON.stringify(customers));
    }
  }catch(e){ /* storage unavailable — demo login just won't be pre-seeded */ }
})();
