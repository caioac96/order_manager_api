import logger from "../../../utils/logger.js";
import CreateOrderRequest from "../../../application/dtos/CreateOrderRequest.js";

export default class OrderController {
    constructor({
        createOrderUseCase,
        getOrdersUseCase,
        getOrderStatusUseCase,
        updateOrderStatusUseCase
    }) {
        this.createOrderUseCase = createOrderUseCase;
        this.getOrdersUseCase = getOrdersUseCase;
        this.getOrderStatusUseCase = getOrderStatusUseCase;
        this.updateOrderStatusUseCase = updateOrderStatusUseCase;
    }

    async create(req, res) {
        try {
            const dto = new CreateOrderRequest(req.body);

            const order = await this.createOrderUseCase.execute(dto);

            logger.info(`Order created! orderId: ${order.id}`);

            return res.status(201).json(order);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async getOrders(req, res) {
        try {
            const orders = await this.getOrdersUseCase.execute();

            logger.info("Orders found");

            return res.json(orders);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async getStatus(req, res) {
        try {
            const { id } = req.params;

            const status = await this.getOrderStatusUseCase.execute(id);

            logger.info(`Order: orderId: ${id} - Status: ${status}`);

            return res.json({ orderId: id, status: status });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async updateStatus(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;

            const updatedOrder =
                await this.updateOrderStatusUseCase.execute({
                    orderId: id,
                    status
                });

            logger.info(`Order status updated! orderId: ${id} - Status: ${status}`);

            return res.json(updatedOrder);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}