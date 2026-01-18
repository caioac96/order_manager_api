export default class CreateOrder {
    constructor({ orderRepository, orderService, eventPublisher }) {
        this.orderRepository = orderRepository
        this.orderService = orderService
        this.eventPublisher = eventPublisher
    }

    async execute(createOrderRequest) {
        this.orderService.validateItems(createOrderRequest.items)

        const totalPrice = this.orderService.calculateTotalPrice(
            createOrderRequest.items
        )

        const totalQuantity = this.orderService.calculateTotalQuantity(
            createOrderRequest.items
        )

        const order = {
            // customerId: createOrderRequest.customerId,
            items: createOrderRequest.items,
            totalPrice,
            totalQuantity,
            status: 'CREATED',
            createdAt: new Date()
        }

        const savedOrder = await this.orderRepository.save(order)

        // TODO: await this.eventPublisher.publish('OrderCreated', savedOrder)

        return savedOrder
    }
}