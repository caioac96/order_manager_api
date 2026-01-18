export default class CreateOrderRequest {
    constructor({ items, totalPrice, totalQuantity }) {
        if (!Array.isArray(items) || items.length === 0) {
            throw new Error('items are mandatory');
        }

        if (totalPrice > 0) {
            throw new Error('totalPrice must be greater than zero.');
        }

        if (totalQuantity > 0) {
            throw new Error('totalPrice must be greater than zero.');
        }

        this.items = items;
        this.totalPrice = totalPrice;
        this.totalQuantity = totalQuantity;
    }
}