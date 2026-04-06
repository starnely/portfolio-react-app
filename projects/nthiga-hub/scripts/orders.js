// ============================================================
// IMPORTS
// ============================================================
import { formatCurrency } from './utils/money.js';
import { loadProductsFetch, getProduct } from '../data/products.js';
import { orders, deleteOrder, clearAllOrders } from '../data/orders.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { clearCart, addToCart } from '../data/cart.js';

// ============================================================
// Wait for products to load before doing anything else.
// ============================================================
loadProductsFetch().then(() => {
    // Render the orders list with all current orders
    renderOrders(orders);

    // Clear the cart now that the orders page has loaded
    clearCart();

    // SEARCH — filter orders by product name as the user types
    document.querySelector('.js-search-bar').addEventListener('input', (event) => {
        //Get the value inputted by the user
        const searchValue = event.target.value.toLowerCase();

        // Keep only orders that contain at least one matching product name
        const filteredOrders = orders.filter((order) => {

            //Skip any malformed order that is missing a products array
            if (!order || !Array.isArray(order.products))
                return false;

            return order.products.some((item) => {
                const product = getProduct(item.productId);
                return product && product.name.toLowerCase().includes(searchValue);
            });
        });

        renderOrders(filteredOrders);
    });
});

// ============================================================
// TRACKING MODAL
// Injected once into the page on script load.
// showTrackingModal() fills it in and opens it.
// Closes on X button click or backdrop click.
// ============================================================

document.body.insertAdjacentHTML('beforeend', `
    <div class="tracking-modal-backdrop js-tracking-backdrop" style="display:none;">
        <div class="tracking-modal">
            <button class="tracking-modal-close js-tracking-close">&times;</button>
            <h2 class="tracking-modal-title">Package Tracking</h2>
            <div class="tracking-modal-body js-tracking-body"></div>
        </div>
    </div>
`);

// Close on X
document.querySelector('.js-tracking-close').addEventListener('click', closeTrackingModal);

// Close when clicking the dark backdrop outside the modal box
document.querySelector('.js-tracking-backdrop').addEventListener('click', (event) => {
    if (event.target.classList.contains('js-tracking-backdrop')) {
        closeTrackingModal();
    }
});

function showTrackingModal({ orderId, productName, delivery, quantity }) {
    // Static progress steps — swap these for real API data when available
    const steps = [
        { label: 'Order Placed', done: true },
        { label: 'Processing', done: true },
        { label: 'Shipped', done: true },
        { label: 'Out for Delivery', done: false },
        { label: 'Delivered', done: false },
    ];

    const stepsHTML = steps.map((step) => `
        <div class="tracking-step ${step.done ? 'tracking-step-done' : ''}">
            <div class="tracking-step-dot"></div>
            <span>${step.label}</span>
        </div>
    `).join('');

    // Populate modal content with the clicked product's data
    document.querySelector('.js-tracking-body').innerHTML = `
        <p class="tracking-product-name">${productName}</p>
        <p class="tracking-meta">Order ID: <strong>${orderId}</strong></p>
        <p class="tracking-meta">Quantity: <strong>${quantity}</strong></p>
        <p class="tracking-meta">Estimated Delivery: <strong>${delivery}</strong></p>
        <div class="tracking-steps">${stepsHTML}</div>
    `;

    document.querySelector('.js-tracking-backdrop').style.display = 'flex';
}

function closeTrackingModal() {
    document.querySelector('.js-tracking-backdrop').style.display = 'none';
}


// ============================================================
// RENDER ORDERS
// Builds the full orders HTML and injects it into the page,
// ============================================================
function renderOrders(orders) {
    let ordersHTML = '';

    // ── Empty state ──────────────────────────────────────────
    if (orders.length === 0) {
        ordersHTML = `
            <div class="no-orders">
                <p>No orders yet. <a href="nthigaHub.html">Start shopping!</a></p>
            </div>
        `;
    }

    // ── "Clear All" button (only shown when orders exist) ────
    if (orders.length > 0) {
        ordersHTML += `
            <div class="clear-all-container">
                <button class="clear-all-button button-secondary js-clear-all-button">
                    Clear All Orders
                </button>
            </div>
        `;
    }

    orders.forEach((order) => {
        //skip any order that is malformed or missing its products array
        if (!order || !Array.isArray(order.products))
            return;

        // Format the order timestamp (e.g. "June 3, 2025 at 2:30 PM")
        const formattedDate = dayjs(order.orderTime).format('MMMM D, YYYY [at] h:mm A');


        ordersHTML += `
            <div class="order-container">
                <div class="order-header">
                    <div class="order-header-left-section">
                        <div class="order-date">
                            <div class="order-header-label">Order Placed:</div>
                            <div>${formattedDate}</div>
                        </div>
                        <div class="order-total">
                            <div class="order-header-label">Total:</div>
                            <div>$${formatCurrency(order.totalCostCents)}</div>
                        </div>
                    </div>
                    <div class="order-header-right-section">
                        <div class="order-header-label">Order ID:</div>
                        <div>${order.id}</div>
                        <button class="delete-order-button button-secondary js-delete-order-button"
                            data-order-id="${order.id}">
                            Delete Order
                        </button>
                    </div>
                </div>

                <div class="order-details-grid">
                    ${order.products.map((item) => {
            const product = getProduct(item.productId);
            if (!product) return '';

            const formattedDeliveryDate = dayjs(item.estimatedDeliveryTime).format('dddd, MMMM D');

            return `
                            <div class="product-image-container">
                                <img src="${product.image}">
                            </div>
                            <div class="product-details">
                                <div class="product-name">${product.name}</div>
                                <div class="product-delivery-date">
                                    Arriving on: ${formattedDeliveryDate}
                                </div>
                                <div class="product-quantity">
                                    Quantity: ${item.quantity}
                                </div>
                                <button class="buy-again-button js-buy-again-button button-primary">
                                    <img class="buy-again-icon" src="images/icons/buy-again.png">
                                    <span class="buy-again-message">Buy it again</span>
                                </button>
                            </div>
                            <div class="product-actions">
                                <a href="tracking.html?orderId=${order.id}">
                                    <button class="track-package-button js-track-package-button button-secondary">
                                        Track package
                                    </button>
                                </a>
                            </div>
                        `;
        }).join('')}
                </div>
            </div>
        `;
    });

    // Inject all built HTML into the page at once (single DOM write)
    document.querySelector('.js-orders-grid').innerHTML = ordersHTML;


    // ── Event listeners (re-attached after every render) ─────

    // BUY AGAIN — adds the item to the cart, then shows "Added ✓" for 2 seconds
    document.querySelectorAll('.js-buy-again-button').forEach((button) => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            const quantity = Number(button.dataset.quantity);

            // Add back to cart with the same quantity as the original order
            addToCart(productId, quantity);

            // Temporarily change label to confirm the action to the user
            const messageSpan = button.querySelector('.buy-again-message');
            messageSpan.textContent = 'Added \u2713';
            button.disabled = true;

            // Restore original label after 2 seconds so they can click again
            setTimeout(() => {
                messageSpan.textContent = 'Buy it again';
                button.disabled = false;
            }, 2000);
        });
    });

    // TRACK PACKAGE — opens modal with delivery status for this product
    document.querySelectorAll('.js-track-package-button').forEach((button) => {
        button.addEventListener('click', () => {
            showTrackingModal({
                orderId: button.dataset.orderId,
                productName: button.dataset.productName,
                delivery: button.dataset.delivery,
                quantity: button.dataset.quantity,
            });
        });
    })


    // ============================================================
    // ── Event listeners (re-attached after every render) ─────
    // ============================================================

    // Delete a single order when its "Delete Order" button is clicked
    document.querySelectorAll('.js-delete-order-button').forEach((button) => {
        button.addEventListener('click', () => {
            const orderId = button.dataset.orderId;
            deleteOrder(orderId); // mutates the orders array
            renderOrders(orders);// re-render with updated array
        });
    });

    // Clear all orders
    const clearAllButton = document.querySelector('.js-clear-all-button');
    if (clearAllButton) {
        clearAllButton.addEventListener('click', () => {
            clearAllOrders();
            renderOrders(orders);
        });
    }

}




