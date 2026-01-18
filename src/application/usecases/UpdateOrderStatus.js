export default class UpdateOrderStatus {
  constructor({ orderRepository, orderService, eventPublisher }) {
    this.orderRepository = orderRepository
    this.orderService = orderService
    this.eventPublisher = eventPublisher
  }

  async execute({ orderId, status }) {
    try {
      this.orderService.isValidIdOrder(orderId);

      const order = await this.orderRepository.findById(orderId)
      if (!order) throw new Error('Order not found');

      order.updateStatus(status);
      await this.orderRepository.updateStatus(orderId, status);

      await this.eventPublisher.orderStatusUpdated(order);

      return order;
    } catch (error) {
      throw new Error(error);
    }
  }
}