import { Router } from 'express';
import OrderController from './controllers/OrderController.js';

const router = Router();
const orderController = new OrderController();

router.post('/orders', (req, res, next) =>
    orderController.create(req, res, next)
);

router.get('/orders/:id', (req, res, next) =>
    orderController.getStatus(req, res, next)
);

router.put('/orders/:id/status', (req, res, next) =>
    orderController.updateStatus(req, res, next)
);

export default router;