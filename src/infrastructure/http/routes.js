import { Router } from 'express';
import { makeOrderController } from './factory.js';

const router = Router();
const orderController = makeOrderController();

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       201:
 *         description: Order created
 */
router.post('/orders', (req, res) =>
  orderController.create(req, res)
);

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: List orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: List of orders
 */
router.get('/orders', (req, res) =>
  orderController.getOrders(req, res)
);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get order status
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order status
 */
router.get('/orders/:id', (req, res) =>
  orderController.getStatus(req, res)
);

/**
 * @swagger
 * /orders/{id}/status:
 *   patch:
 *     summary: Update order status
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Status updated
 */
router.patch('/orders/:id/status', (req, res) =>
  orderController.updateStatus(req, res)
);

export default router;