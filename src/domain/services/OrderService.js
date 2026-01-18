export default class OrderService {
    validateItems(items) {
        if (!items || items.length === 0) {
            throw new Error('order must have at least one item')
        }

        items.forEach(item => {
            if (item.quantity <= 0) {
                throw new Error('item quantity must be greater than zero')
            }
            if (item.unitPrice <= 0) {
                throw new Error('item unitPrice must be greater than zero')
            }
        })
    }

    calculateTotalPrice(items) {
        return items.reduce((total, item) => {
            return total + item.unitPrice * item.quantity
        }, 0)
    }

    calculateTotalQuantity(items) {
        return items.reduce((total, item) => {
            return total + item.quantity
        }, 0)
    }

    isValidStatusTransition(current, next) {
        const transitions = {
            CREATED: ['PAID', 'CANCELLED'],
            PAID: ['SHIPPED'],
            SHIPPED: []
        }

        return transitions[current]?.includes(next)
    }

    isValidIdOrder(orderId) {
        if (typeof orderId !== 'string') {
            throw new Error('orderId must be string');
        }
        return;
    }
}