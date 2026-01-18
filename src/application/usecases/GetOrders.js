export default class GetOrders {
    constructor({ orderRepository }) {
        this.orderRepository = orderRepository
    }

    async execute() {
        const orders = await this.orderRepository.findAll();

        return orders;
    }
}