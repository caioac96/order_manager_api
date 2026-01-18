export default class OrderEventPublisher {
  async orderCreated(order) {
    throw new Error(`${this.constructor.name} must implement orderCreated()`);
  }

  async orderStatusUpdated(order) {
    throw new Error(`${this.constructor.name} must implement orderStatusUpdated()`);
  }
}