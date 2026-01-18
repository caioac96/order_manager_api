export default class Order {
  constructor({
    id,
    items,
    status = 'CREATED',
    totalPrice,
    totalQuantity,
    createdAt = new Date()
  }) {
    if (!Array.isArray(items) || items.length === 0) {
      throw new Error('order must have at least one item');
    }

    this.id = id;
    this.items = items;
    this.status = status;
    this.totalPrice = totalPrice ?? this.calculateTotalPrice();
    this.totalQuantity = totalQuantity ?? this.calculateTotalQuantity();
    this.createdAt = createdAt;
  }

  calculateTotalPrice() {
    return this.items.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0
    );
  }

  calculateTotalQuantity() {
    return this.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
  }

  updateStatus(newStatus) {
    const allowed = ['CREATED', 'PAID', 'SHIPPED', 'CANCELLED'];

    if (!allowed.includes(newStatus)) {
      throw new Error('invalid status transition');
    }

    this.status = newStatus;
  }
}