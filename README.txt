NGUNI MARKETING — DEMO WEBSITE
================================

REAL COMPANY DATA NOW INCLUDED
--------------------------------
Pulled from the company's official Facebook page (facebook.com/nguniads):
  - Address: Chobe Street, Windhoek, Namibia
  - Founded: 1 May 2018
  - Languages: Afrikaans & English
  - Real campaign photos: images/campaigns/ (illuminated signs, SABS road signs,
    self-inking stamps) — used on products.html, shop.html and index.html
  - Video section on index.html embeds 3 real project reels via Facebook's
    video plugin. If a reel doesn't render (ad blockers / browser restrictions
    on Facebook embeds), the "Watch on Facebook" link under each still works.


HOW TO OPEN
------------
Unzip this folder, then open index.html in any web browser.
Click through Home -> Products -> Contact -> Shop using the top navigation.
Keep all files and folders together (css/, js/, images/) — the pages link to them by relative path.


PAGES INCLUDED
--------------
- index.html      Landing / advertising page (about the business, services, coverage map)
- products.html   Full catalog with category tabs, photos and descriptions (no cart)
- contact.html    Contact details, business hours, contact form, map
- shop.html       E-commerce store with cart, checkout demo


ADDING YOUR OWN PHOTOS
-----------------------
Every photo on the site is currently a placeholder graphic labelled with its filename
and recommended size, e.g. "Add photo: reception-sign". To replace a placeholder:

1. Find the matching file inside the images/ folder (see list below).
2. Replace it with your own photo, using the SAME FILENAME (e.g. reception-sign.svg).
   - Easiest: rename your photo to match exactly, including keeping it as .svg,
     OR open the relevant HTML file and change the file extension in the <img src="...">
     tag to match your new file (e.g. .jpg or .png).
3. Save, then refresh the page in your browser.

Image folders:
  images/logo.png                  Your logo (already added)
  images/backgrounds/               Full-width hero/background photos (one per page)
                                     — currently set to the longhorn sunset photo you provided
                                     (hero-index.jpg, hero-products.jpg, hero-contact.jpg,
                                     hero-shop.jpg, cta-bg.jpg). Replace any of these with a
                                     different photo, same filename, to change just that page.
  images/about-photo.svg            About section photo (index.html)
  images/services/                  6 service card photos (index.html)
  images/products/                  16 product photos (used on BOTH products.html and shop.html)
  images/contact/                   Office photo + map/location photo (contact.html)

Recommended sizes are written directly on each placeholder image.


BACKGROUND IMAGES
------------------
Each page's hero section and the call-to-action band use a CSS background-image,
set inline in the HTML, e.g.:
  style="background-image:url('images/backgrounds/hero-index.svg')"
Replace the file at that path with your own photo (same filename) and it updates
automatically — no code changes needed. To use a different filename, search for
"background-image:url(" in the HTML file and edit the path.


STYLING
--------
All styling lives in one file: css/styles.css
Colors, fonts and spacing are defined as CSS variables at the top of that file
(--rust, --charcoal, --sand, etc.) — change them once and they update everywhere.

The site is fully mobile responsive: on narrow screens the navigation collapses
into a hamburger menu (tap the ☰ icon), and grids stack into a single column.


SCRIPTS
--------
js/site.js   Mobile menu toggle (used on every page)
js/shop.js   Shopping cart logic (used on shop.html only)


IMPORTANT NOTES
-----------------
- This is a front-end demo only. The contact form and checkout do not send real
  data anywhere — no backend, database or payment processor is connected yet.
- To take this live, you'll need: web hosting, a payment gateway (e.g. PayFast,
  Stripe, PayGate), and a way to receive contact-form submissions (e.g. Formspree,
  a mail server, or a custom backend).
