import logger from "../../../utils/logger.js";
import CreateOrderRequest from '../../../application/dtos/CreateOrderRequest.js';

export default class OrderController {
    constructor(messageCreate, messageGet, messageUpdated) {
        this.messageCreate = messageCreate | "Order created!";
        this.messageGet = messageGet | "Get order status";
        this.messageUpdated = messageUpdated | "Order updated!";
    }

    async create(req, res) {
        try {
            const dto = new CreateOrderRequest(req.body);

            const order = await this.createOrder.execute(dto);
            logger.info(this.messageCreate);
            res.status(201).json(order);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getStatus(req, res) {
        try {
            logger.info(this.messageCreate);
            res.json({ message: messageGet });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateStatus(req, res) {
        try {
            logger.info(this.messageCreate);
            res.json({ message: messageUpdated });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}