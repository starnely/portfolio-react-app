// ============================================================
//STEP1: PURPOSE: Controls everything the user sees and does on the main shopping page (nthigaHub.html):
// ============================================================
import { cart, addToCart } from '../data/cart.js';
import { products, loadProductsFetch } from '../data/products.js';

/*
const products = [{
  image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
  name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
  rating: {
    stars: 4.5,
    counts: 87
  },
  priceCents: 1090
}, {
  image: 'images/products/intermediate-composite-basketball.jpg',
  name: 'Intermediate Size Basketball',
  rating: {
    stars: 4,
    counts: 127
  },
  priceCents: 2095
}, {
  image: 'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
  name: 'Adults Plain Cotton T-Shirt - 2 Pack',
  rating: {
    stars: 4.5,
    counts: 56
  },
  priceCents: 799
}];
*/

// ─────────────────────────────────────────────
// STEP 2: DEFINE updateCartQuantity()
// Shows the total number of items in the cart
// ─────────────────────────────────────────────
function updateCartQuantity() {
  let cartQuantity = 0;
  // Add up the quantity of every item in the cart
  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });
  // Display the total in the cart icon in the nav bar
  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}


// ─────────────────────────────────────────────
// STEP 3: DEFINE renderProductsGrid()
// Builds and displays the product grid on the page.
// ─────────────────────────────────────────────
function renderProductsGrid(productList = products) {
  let productsHTML = ''; /*A variable to combine HTMLS of the products*/

  // Looping through all the products in an array called Products
  productList.forEach((product) => {
    productsHTML += `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image" 
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getStarUrl()}">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${product.getPrice()}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          ${product.extraInfoHTML()}

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id='${product.id}'>
            Add to Cart
          </button>
        </div>`
  });

  // Insert ALL the product HTML into the page at once
  let productsGrid = document.querySelector('.js-products-grid');
  productsGrid.innerHTML = productsHTML;


  document.querySelectorAll('.js-add-to-cart')
    .forEach((button) => {
      button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        addToCart(productId);
        updateCartQuantity();
      });
    });
  // Update cart display after the grid renders
  updateCartQuantity();
}

// ─────────────────────────────────────────────
// STEP 4: LOAD PRODUCTS THEN RENDER
// This is where the page actually starts working.
// ─────────────────────────────────────────────
loadProductsFetch().then(() => {
  renderProductsGrid();
});

// ─────────────────────────────────────────────
// STEP 5: SEARCH BAR EVENT LISTENER
// Filters the product grid as the user types.
// ─────────────────────────────────────────────
document.querySelector('.js-product-search-bar').addEventListener('input', (event) => {
  // Get what the user typed, converted to lowercase
  const searchValue = event.target.value.toLowerCase();

  // Filter: keep only products whose name contains the search text
  const filteredProducts = products.filter((product) => {
    return product.name.toLowerCase().includes(searchValue);
  });

  // Re-render the grid with only the filtered results
  renderProductsGrid(filteredProducts);
});

