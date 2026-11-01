# The Desi Chapter — Website Package

## What this is
A complete, ready-to-upload front-end for The Desi Chapter: home page, shop, product
pages, customer signup/login/account, an admin dashboard, and all policy pages —
in the aesthetic you described (ivory/indigo/rust/gold, Bagru/Dabu/Ajrakh/Kantha
block-print patterns, nazar motif).

## How to host it (no coding needed)
This is a **static site** — plain HTML/CSS/JS — so it runs on almost any hosting plan:

1. Buy hosting + point your domain to it (Hostinger, GoDaddy, Bluehost, etc. all work).
2. Open your host's **File Manager** (or connect via FTP with FileZilla).
3. Upload the *entire contents* of this folder into `public_html` (or `www` / `htdocs`),
   keeping the folder structure exactly as-is (`css/`, `js/`, `assets/`, `policies/`, `admin/`).
4. Visit your domain — `index.html` loads automatically as the home page.

That's it — no database, no server setup, no build step required for the site to display.

## What actually works right now, in the browser
- Full responsive design across all pages, on any modern browser.
- Shop filtering/sorting, product pages, cart (saved in the browser).
- Signup → OTP step → account creation, and login via OTP or email/password —
  all working **end-to-end in the browser** using a demo OTP (shown on screen).
- The **admin dashboard** (`admin/dashboard.html`, default login `admin` / `admin123`):
  add/edit/delete products, categories, collections, coupons; edit the homepage
  copy (Our Story, Nazar, Welfare, banner strip, marquee ticker, menu); edit all
  three policy pages; change the colour theme; moderate customer reviews; and
  view a sales-analytics dashboard (best-sellers, region, age range, gender split,
  monthly trend).
- Every edit you make in the admin dashboard saves to that browser and instantly
  updates the pages you view from it.

## What's a demo, and what you need to add before taking real customer orders
Because this is a static site with no server, a few pieces are **realistic simulations**
so you can see and test the exact experience, but they aren't yet wired to real
external services:

| Feature | Right now | To go live, you need |
|---|---|---|
| Phone OTP (signup/login) | Generates a code and shows it on-screen | An SMS OTP API — e.g. **MSG91**, **Twilio Verify**, or **AWS SNS** — called from a small backend |
| Customer accounts | Saved in that one browser's storage | A real database (e.g. **PostgreSQL/MySQL** via a backend, or a service like **Supabase/Firebase**) so accounts work across every device |
| Admin dashboard edits | Saved in that one browser's storage | The same content moved into that database, served through a small admin API, so edits made on your laptop show up for every visitor everywhere |
| Sales analytics | Sample/sample-shaped data | Real order records (region, age, gender come from what you collect at checkout) feeding the same charts |
| Checkout / payment | Shows a message, no real charge | A payment gateway — **Razorpay** or **PayU** are the most common for India — integrated into checkout |
| Contact form | Confirms on-screen only | An email-sending step — e.g. **Formspree**, **SendGrid**, or your backend's own `/contact` route |
| Admin login | Username/password stored in the browser | Proper server-side authentication with hashed passwords (never store or ship passwords in front-end code for a real launch) |

None of this is unusual — it's the normal path every e-commerce build takes: **design
and storefront first, then a backend for accounts/orders/payments.** I can build that
backend with you next; the natural stack for this project is a small Node.js or PHP
API with a MySQL/PostgreSQL database, MSG91 or Twilio for OTP, and Razorpay for
payments — all of which run fine on the same or a slightly upgraded hosting plan.

## Editing content directly in the code (optional)
Everything editable through the admin dashboard also has sensible starting content
in **`js/content-store.js`** — open that file if you ever want to change defaults
(e.g. what a fresh install shows before anyone touches the admin panel).

## Folder structure
```
index.html               → Home page
shop.html                → Shop / product listing
product.html             → Single product page (?id=)
login.html / signup.html → Customer auth
account.html             → Customer profile + review submission
contact.html             → Contact page
policies/                → Return & Exchange, Privacy, Shipping & Delivery
admin/dashboard.html     → Admin login + full dashboard
css/style.css            → All styling and design tokens
js/content-store.js      → All editable site content (defaults)
js/main.js               → Shared header/footer/cart/menu behaviour
js/home.js               → Home-page rendering
assets/logo.png          → Your logo
```
