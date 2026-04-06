// ─────────────────────────────────────────────
// STEP 1: DECLARE THE CART VARIABLE:Start as undefined — will be filled by loadFromStorage().
// ─────────────────────────────────────────────
export let cart;


// ─────────────────────────────────────────────
// STEP 2: DEFINE saveToStorage()-Saves the current cart to the browser's localStorage.
// ─────────────────────────────────────────────
function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}


// ─────────────────────────────────────────────
// STEP 3: DEFINE loadFromStorage()-Reads the cart from localStorage when the page loads.
// ─────────────────────────────────────────────
export function loadFromStorage() {
    cart = JSON.parse(localStorage.getItem('cart'));

    // start with an empty cart if nothing was saved yet
    if (!cart) {
        cart = [];
    }
}
loadFromStorage();// Call the function to populate the cart first 


// ─────────────────────────────────────────────
// STEP 5A: addToCart() — Add a product to the cart
// ─────────────────────────────────────────────
export function addToCart(productId) {
    let matchingItem;

    // Search the cart for an item with the same productId
    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });


    if (matchingItem) {
        // Product already in cart — just increase the count
        matchingItem.quantity += 1;
    } else {
        // Product not in cart — add it as a brand new entry
        cart.push({
            productId: productId,
            quantity: 1,
            deliveryOptionId: '1'
        });
    }
    saveToStorage();
}


// ─────────────────────────────────────────────
// STEP 5B: removeCartItem() — Remove a product from the cart
// ─────────────────────────────────────────────
export function removeCartItem(productId) {
    const newCart = [];

    // Keep every item EXCEPT the one being removed
    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    });

    // Replace old cart with the filtered new cart and save storage
    cart = newCart;
    saveToStorage();
}


// ─────────────────────────────────────────────
// STEP 5C: updateDeliveryOption() — Change delivery speed
// Called when the user selects a different shipping option
// ─────────────────────────────────────────────
export function updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

    // Find the cart item that matches the given productId
    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });

    // if item not found, stop here
    if (!matchingItem) return;

    // Update the delivery option for this item
    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToStorage();
}


// ─────────────────────────────────────────────
// STEP 5D: clearCart() — Empty the entire cart
// Used after an order is placed successfully.
// ─────────────────────────────────────────────
export function clearCart() {
    cart = [];
    saveToStorage();
}
