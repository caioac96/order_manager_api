export default class UpdateOrderStatus {
  constructor({ orderRepository, orderService, eventPublisher }) {
    this.orderRepository = orderRepository
    this.orderService = orderService
    this.eventPublisher = eventPublisher
  }

  async execute({ orderId, status }) {
    this.orderService.isValidIdOrder(orderId);

    const order = await this.orderRepository.findById(orderId)
    if (!order) throw new Error('Order not found');

    order.updateStatus(status);
    await this.orderRepository.updateStatus(orderId, status);

    // TODO: await this.eventPublisher.publishStatusChanged(order);

    return order;
  }
}