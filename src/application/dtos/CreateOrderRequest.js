export default class CreateOrderRequest {
    constructor({ items }) {
        if (!Array.isArray(items) || items.length === 0) {
            throw new Error('items are mandatory');
        }

        this.items = items;
    }
}