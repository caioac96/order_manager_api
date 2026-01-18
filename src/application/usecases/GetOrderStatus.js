export default class GetOrderStatus {
    constructor({ orderRepository, orderService }) {
        this.orderRepository = orderRepository
        this.orderService = orderService
    }

    async execute(orderId) {
        this.orderService.isValidIdOrder(orderId)

        const order = await this.orderRepository.findById(orderId)

        return order.status;
    }
}