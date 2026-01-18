import { Router } from 'express';
import { makeOrderController } from './factory.js';

const router = Router();
const orderController = makeOrderController();

router.post('/orders', (req, res) =>
  orderController.create(req, res)
);

router.get('/orders', (req, res) =>
  orderController.getOrders(req, res)
);

router.get('/orders/:id', (req, res) =>
  orderController.getStatus(req, res)
);

router.patch('/orders/:id/status', (req, res) =>
  orderController.updateStatus(req, res)
);

export default router;