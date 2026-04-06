import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import {loadProductsFetch } from '../data/products.js';
import { cart } from '../data/cart.js';
// import '../data/cart-class.js';
// import '../data/backend-practice.js';


async function loadPage() {
    try {
        // throw 'error1';
        await loadProductsFetch();

        const value = await new Promise((resolve, reject) => {
            // throw 'error';
            loadCart(() => {
                // reject('error3');
                resolve('value3');
            });
        });
    } catch (error) {
        console.log('Unexpected error.Please try again later');
    }

    renderOrderSummary();
    renderPaymentSummary();
    updateCartCount();
}
loadPage();

export function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('.js-cart-quantity').innerHTML = cartCount;
}


/*
Promise.all([
    loadProductsFetch(),
    new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    })
]).then((values) => {
    renderOrderSummary();
    renderPaymentSummary();
});
*/

/*
new Promise((resolve) => {
    loadProducts(() => {
        resolve('value1');
    });
}).then((value) => {
    return new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    });
}).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
});
*/


/*
loadProducts(() => {
    loadCart(() => {
        renderOrderSummary();
        renderPaymentSummary();
    });
});
*/
