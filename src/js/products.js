import { products } from './constants/productsData.js';

console.log('Array de productos:', products);

const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.searcher__word');
const searchBtn = document.querySelector('.button--search');
const allBtn = document.querySelector('.button--all');

console.log('gallery:', gallery);
console.log('searchInput:', searchInput);
console.log('searchBtn:', searchBtn);
console.log('allBtn:', allBtn);

function renderProducts(productList) {
  console.log('Renderizando productos:', productList);
  gallery.innerHTML = '';
  productList.forEach(product => {
    gallery.innerHTML += `
      <div class="card">
        <img class="card__image" src="${product.image}" alt="${product.name}">
        <h3 class="card__title">${product.name}</h3>
        <span class="card__code">${product.code}</span>
        <p class="card__description">${product.description}</p>
        <span class="card__price">$${product.price}</span>
        <div class="card__actions">
          <button class="button button--add">Agregar al carrito</button>
          <span class="card__counter">0</span>
          <button class="button button--remove">Quitar del carrito</button>
        </div>
      </div>
    `;
  });
}

function searchProducts() {
  const query = searchInput.value.trim().toLowerCase();
  console.log('Buscando:', query);
  if (!query) {
    renderProducts(products);
    return;
  }
  const filtered = products.filter(product =>
    product.name.toLowerCase().includes(query) ||
    product.code.includes(query)
  );
  console.log('Resultados filtrados:', filtered);
  renderProducts(filtered);
}

searchBtn.addEventListener('click', searchProducts);
searchInput.addEventListener('keyup', e => {
  if (e.key === 'Enter') searchProducts();
});
allBtn.addEventListener('click', () => {
  searchInput.value = '';
  renderProducts(products);
});

// Render inicial
renderProducts(products); 