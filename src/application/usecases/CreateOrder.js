export default class CreateOrder {
    constructor({ orderRepository, orderService, eventPublisher }) {
        this.orderRepository = orderRepository
        this.orderService = orderService
        this.eventPublisher = eventPublisher
    }

    async execute(createOrderRequest) {
        try {
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

            await this.eventPublisher.orderCreated(savedOrder);

            return savedOrder
        } catch (error) {
            throw new Error(error);
        }
    }
}