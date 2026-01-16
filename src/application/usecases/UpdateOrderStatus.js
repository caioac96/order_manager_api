export default class UpdateOrderStatus {
  constructor(orderRepository, eventPublisher) {
    this.orderRepository = orderRepository;
    this.eventPublisher = eventPublisher;
  }

  // TODO: pensar melhor essa lógica
  async execute({ orderId, status }) {
    const order = await this.orderRepository.findById(orderId);
    if (!order) throw new Error('Order not found');

    order.updateStatus(status);
    await this.orderRepository.updateStatus(orderId, status);

    await this.eventPublisher.publishStatusChanged(order);

    return order;
  }
}