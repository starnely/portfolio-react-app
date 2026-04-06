// ─────────────────────────────────────────────
// STEP 1: Import
// ─────────────────────────────────────────────
import { cart, removeCartItem, updateDeliveryOption } from '../../data/cart.js';
import { products, getProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';
import { updateCartCount } from '../checkout.js';

// ─────────────────────────────────────────────
// STEP 2: deliveryOptionsHTML() — INNER HELPER
// Builds the HTML for the 3 delivery radio buttons
// shown under each cart item on checkout.
// ─────────────────────────────────────────────
function deliveryOptionsHTML(matchingProduct, cartItem) {
  let html = '';

  deliveryOptions.forEach((deliveryOption) => {

    // Calculate what date this delivery option would arrive
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D, YYYY');

    // Format the price — FREE if 0 cents, otherwise show dollar amount
    const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)}-`;


    // Check if THIS delivery option is the one currently selected
    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

    // Build the radio button HTML for this delivery option
    html += `  <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" 
    data-delivery-option-id="${deliveryOption.id}">
                  <input type="radio"
                  ${isChecked ? 'checked' : ''}
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      ${dateString}
                    </div>
                    <div class="delivery-option-price">
                      ${priceString} Shipping
                    </div>
                  </div>
                </div>
    `
  });

  return html;
}

// ─────────────────────────────────────────────
// STEP 3: renderOrderSummary() — THE MAIN FUNCTION
// This is the function called by checkout.js to build
// ─────────────────────────────────────────────
export function renderOrderSummary() {

  // If cart is empty or doesn't exist, show a friendly
  if (!cart || cart.length === 0) {
    document.querySelector('.js-order-summary').innerHTML = `
                <div class="no-cart-item">
                    <p>No items in the Cart. <a href = "nthigaHub.html">Add Items to the cart</a></p>
                </div>
            `;

    return; // ← stop here, don't run the rest of the function
  }

  // ── STEP 3b: BUILD HTML FOR EACH CART ITEM ─
  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {

    // Get the productId stored in this cart entry
    const productId = cartItem.productId;

    // Use getProduct() to find the FULL product details
    const matchingProduct = getProduct(productId);

    // Get the delivery option object for this cart item
    const deliveryOptionId = cartItem.deliveryOptionId;
    const deliveryOption = getDeliveryOption(deliveryOptionId);

    // Calculate the expected delivery date for this item
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D, YYYY');


    cartSummaryHTML += `<div class="cart-item-container 
    js-cart-item-container
    js-cart-item-container-${productId}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  ${matchingProduct.getPrice()}
                </div>
                <div class="product-quantity js-product-quantity-${matchingProduct.id}">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-quantity-link js-delete-link-${matchingProduct.id}" 
                  data-product-id='${cartItem.productId}'>
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options js-delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
              ${deliveryOptionsHTML(matchingProduct, cartItem)}
              </div>
            </div>
          </div>`;
  });


  // ── STEP 3c: INSERT HTML INTO THE PAGE ─────
  // Now that all cart item HTML is built,
  // inject it all into the page at once.
  // ───────────────────────────────────────────
  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;


  // Attach a click listener to every Delete link.
  // ───────────────────────────────────────────
  document.querySelectorAll('.js-delete-quantity-link')
    .forEach((link) => {
      link.addEventListener('click', () => {

        // Read which product this Delete button belongs to
        const productId = link.dataset.productId;

        // Remove from cart data (updates localStorage too)
        removeCartItem(productId);

        // Remove the visual card from the page
        const cartContainer = document.querySelector(`.js-cart-item-container-${productId}`);

        cartContainer.remove();

        //Recalculate and redisplay the payment totals
        renderPaymentSummary();

        // Update the cart item count in the nav bar
        updateCartCount();
      });
    });


  // ── STEP 3e: DELIVERY OPTION LISTENERS ─────
  // Attach a click listener to every delivery option radio button.
  // ───────────────────────────────────────────
  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {

      // Read which product and which delivery option was clicked
      const productId = element.dataset.productId;
      const deliveryOptionId = element.dataset.deliveryOptionId;

      // Update this cart item's delivery option and save to localStorage
      updateDeliveryOption(productId, deliveryOptionId);

      // Re-render order summary so delivery date refreshes
      renderOrderSummary();

      // Re-render payment summary so delivery price refreshes
      renderPaymentSummary();

    });
  });
}
