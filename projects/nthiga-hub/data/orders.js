
// Orders from localStorage
export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
    orders.unshift(order);
    saveToStorage();
}

function saveToStorage() {
    localStorage.setItem('orders', JSON.stringify(orders));
}

export function deleteOrder(orderId) {
    const newOrders = orders.filter((order) => order.id !== orderId);
    orders.length = 0;
    newOrders.forEach((order) => orders.push(order));
    saveToStorage();
}

export function clearAllOrders() {
    orders.length = 0;
    saveToStorage();
}