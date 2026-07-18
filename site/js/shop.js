const products = [
  {id:'sg1',cat:'signage',name:'Reception sign package',desc:'Cut-vinyl or acrylic reception signage with logo, installed.',price:2400,unit:'per sign',img:'images/products/reception-sign.svg'},
  {id:'sg2',cat:'signage',name:'Window frosting & wall graphics',desc:'Frosted vinyl film and wall graphics for office branding.',price:1850,unit:'per m2 from',img:'images/products/window-frosting.svg'},
  {id:'sg4',cat:'signage',name:'Vehicle full wrap',desc:'Full vehicle wrap, printed and installed on one vehicle.',price:9800,unit:'per vehicle',img:'images/products/vehicle-wrap.svg'},
  {id:'sg6',cat:'signage',name:'Self-inking stamps',desc:'Premium self-inking stamps — fast, clean impressions, durable and refillable.',price:950,unit:'per set of 10',img:'images/campaigns/self-inking-stamps-flyer.png'},
  {id:'sg7',cat:'signage',name:'3D illuminated signs & lightboxes',desc:'Perspex & Perspexbuild illuminated signage that gets your business noticed, day and night.',price:8500,unit:'from, per sign',img:'images/campaigns/illuminated-signs-flyer.png'},

  {id:'rs1',cat:'roadsigns',name:'SABS standard road signs',desc:'Warning, street name, informational and directional road signs — SABS compliant.',price:1200,unit:'from, per sign',img:'images/campaigns/road-signs-flyer.png'},

  {id:'bb1',cat:'billboards',name:'Static billboard',desc:'One month static billboard booking, Windhoek or regional towns.',price:7200,unit:'per month from',img:'images/products/static-billboard.svg'},
  {id:'bb4',cat:'billboards',name:'Digital billboard rotation',desc:'Rotating digital billboard slot in major towns.',price:6500,unit:'per week',img:'images/products/digital-billboard.svg'},
  {id:'bb5',cat:'billboards',name:'Mall advertising panel',desc:'In-mall panel at Grove, Maerua, Wernhill, Platz am Meer or Oshana Mall.',price:5400,unit:'per month',img:'images/products/mall-advertising.svg'},
  {id:'bb7',cat:'billboards',name:'Airport advertising',desc:'Unique OOH placement at Hosea Kutako or Ondangwa Airport.',price:16800,unit:'per month',img:'images/products/airport-advertising.svg'},

  {id:'nf1',cat:'namfree',name:'NamFreeWater — starter',desc:'One-day branded water handout to a single targeted audience.',price:2500,unit:'per day',img:'images/products/namfree-starter.svg'},
  {id:'nf3',cat:'namfree',name:'NamFreeWater — weekly campaign',desc:'Five consecutive days of branded water distribution.',price:11000,unit:'per week',img:'images/products/namfree-campaign.svg'},

  {id:'ac1',cat:'activations',name:'In-store sampling team',desc:'Two promoters running in-store product sampling for one day.',price:3400,unit:'per day',img:'images/products/instore-sampling.svg'},
  {id:'ac2',cat:'activations',name:'Product launch activation',desc:'Full activation team and setup for a product launch event.',price:12500,unit:'per event',img:'images/products/product-launch.svg'},
  {id:'ac3',cat:'activations',name:'Promoter manpower',desc:'Additional promotional staff hired by the day.',price:950,unit:'per promoter / day',img:'images/products/promoter-manpower.svg'},

  {id:'pr1',cat:'print',name:'Business cards',desc:'Premium double-sided business cards, box of 500.',price:780,unit:'per 500',img:'images/products/business-cards.svg'},
  {id:'pr2',cat:'print',name:'Flyers & posters',desc:'Full-colour flyers or posters, pack of 250.',price:1350,unit:'per 250',img:'images/products/flyers-posters.svg'},
  {id:'pr3',cat:'print',name:'Pull-up banners',desc:'Retractable pull-up banner, printed and shipped.',price:1650,unit:'each',img:'images/products/pullup-banners.svg'},
];

const categories = [
  {id:'all',label:'All products'},
  {id:'signage',label:'Signage & branding'},
  {id:'roadsigns',label:'Road signs'},
  {id:'billboards',label:'Billboards'},
  {id:'namfree',label:'NamFree Water'},
  {id:'activations',label:'Activations'},
  {id:'print',label:'Print'},
];

let cart = {};
let activeCat = 'all';
let searchTerm = '';

function fmt(n){ return 'N$' + n.toLocaleString('en-NA'); }

function renderFilters(){
  const el = document.getElementById('filters');
  el.innerHTML = categories.map(c =>
    `<button class="filter-btn ${c.id===activeCat?'active':''}" onclick="setCat('${c.id}')">${c.label}</button>`
  ).join('');
}
function setCat(id){ activeCat = id; renderFilters(); renderGrid(); }

function renderGrid(){
  const grid = document.getElementById('productGrid');
  const filtered = products.filter(p => {
    const matchCat = activeCat === 'all' || p.cat === activeCat;
    const matchSearch = !searchTerm || p.name.toLowerCase().includes(searchTerm) || p.desc.toLowerCase().includes(searchTerm);
    return matchCat && matchSearch;
  });
  if(filtered.length === 0){
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:50px 0;color:#6b6660;font-size:14px;">No products match your search.</div>`;
    return;
  }
  grid.innerHTML = filtered.map(p => `
    <div class="card" id="card-${p.id}">
      <div class="photo-slot">
        <span class="card-badge ${p.cat==='billboards'||p.cat==='namfree'||p.cat==='roadsigns' ? 'rust':''}">${categories.find(c=>c.id===p.cat).label}</span>
        <img src="${p.img}" alt="${p.name} — replace with your own photo">
      </div>
      <div class="card-body">
        <div class="card-title">${p.name}</div>
        <div class="card-desc">${p.desc}</div>
        <div class="card-foot">
          <div class="price">${fmt(p.price)}<br><small>${p.unit}</small></div>
          <button class="add-btn" id="btn-${p.id}" onclick="addToCart('${p.id}')">+ Add</button>
        </div>
      </div>
    </div>
  `).join('');
}

function addToCart(id){
  cart[id] = (cart[id] || 0) + 1;
  updateCartCount();
  renderDrawer();
  const btn = document.getElementById('btn-'+id);
  if(btn){
    btn.textContent = 'Added';
    btn.classList.add('added');
    setTimeout(()=>{ btn.textContent = '+ Add'; btn.classList.remove('added'); }, 1100);
  }
  const p = products.find(x=>x.id===id);
  showToast(p.name + ' added to cart');
}

function changeQty(id, delta){
  cart[id] = (cart[id] || 0) + delta;
  if(cart[id] <= 0) delete cart[id];
  updateCartCount();
  renderDrawer();
}

function removeItem(id){
  delete cart[id];
  updateCartCount();
  renderDrawer();
}

function updateCartCount(){
  const count = Object.values(cart).reduce((a,b)=>a+b,0);
  document.getElementById('cartCount').textContent = count;
}

function renderDrawer(){
  const body = document.getElementById('drawerBody');
  const foot = document.getElementById('drawerFoot');
  const entries = Object.entries(cart);
  if(entries.length === 0){
    body.innerHTML = `<div class="empty-cart"><div class="icon">&#128722;</div>Your cart is empty.<br>Add a product to get started.</div>`;
    foot.style.display = 'none';
    return;
  }
  foot.style.display = 'block';
  let subtotal = 0;
  body.innerHTML = entries.map(([id, qty]) => {
    const p = products.find(x=>x.id===id);
    const lineTotal = p.price * qty;
    subtotal += lineTotal;
    return `
      <div class="cart-item">
        <div class="thumb"><img src="${p.img}" alt="${p.name}"></div>
        <div class="cart-item-info">
          <div class="name">${p.name}</div>
          <div class="meta">${fmt(p.price)} · ${p.unit}</div>
          <div class="qty-row">
            <button class="qty-btn" onclick="changeQty('${id}',-1)">-</button>
            <span style="font-size:13px;font-weight:700;">${qty}</span>
            <button class="qty-btn" onclick="changeQty('${id}',1)">+</button>
            <button class="remove" onclick="removeItem('${id}')">Remove</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
  const fee = entries.length ? 350 : 0;
  document.getElementById('subtotalVal').textContent = fmt(subtotal);
  document.getElementById('feeVal').textContent = fmt(fee);
  document.getElementById('totalVal').textContent = fmt(subtotal + fee);
}

function openCart(){
  document.getElementById('drawer').classList.add('open');
  document.getElementById('overlay').classList.add('open');
}
function closeCart(){
  document.getElementById('drawer').classList.remove('open');
  document.getElementById('overlay').classList.remove('open');
}

function showToast(text){
  const toast = document.getElementById('toast');
  document.getElementById('toastText').textContent = text;
  toast.classList.add('show');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(()=> toast.classList.remove('show'), 2200);
}

function openCheckout(){
  if(Object.keys(cart).length === 0) return;
  const orderNum = Math.floor(100000 + Math.random()*900000);
  document.getElementById('orderId').textContent = 'Order #NGN-' + orderNum;
  document.getElementById('modalOverlay').classList.add('open');
  closeCart();
}
function closeCheckout(){
  document.getElementById('modalOverlay').classList.remove('open');
  cart = {};
  updateCartCount();
  renderDrawer();
}

document.addEventListener('DOMContentLoaded', function(){
  const searchInput = document.getElementById('searchInput');
  if(searchInput){
    searchInput.addEventListener('input', e => {
      searchTerm = e.target.value.trim().toLowerCase();
      renderGrid();
    });
  }
  renderFilters();
  renderGrid();
  renderDrawer();
});
