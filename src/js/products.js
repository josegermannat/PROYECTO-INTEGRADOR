import { products } from './constants/productsData.js';

console.log('Array de productos:', products);

const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.searcher__word');
const searchBtn = document.querySelector('.button--search');
const allBtn = document.querySelector('.button--all');


function createCounter(counterElem) {
  let count = 0;
  return {
    add: () => {
      count++;
      counterElem.textContent = count;
    },
    remove: () => {
      if (count > 0) count--;
      counterElem.textContent = count;
    }
  };
}

function renderProducts(productList) {
  console.log('Renderizando productos:', productList);
  gallery.innerHTML = '';
  productList.forEach(product => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
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
    `;
    
    const addBtn = card.querySelector('.button--add');
    const removeBtn = card.querySelector('.button--remove');
    const counterElem = card.querySelector('.card__counter');
    
    const counter = createCounter(counterElem);
    addBtn.addEventListener('click', counter.add);
    removeBtn.addEventListener('click', counter.remove);
    gallery.appendChild(card);
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
