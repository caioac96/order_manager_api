import OrderController from './controllers/OrderController.js';

import CreateOrder from '../../application/usecases/CreateOrder.js';
import GetOrders from '../../application/usecases/GetOrders.js'
import GetOrderStatus from '../../application/usecases/GetOrderStatus.js';
import UpdateOrderStatus from '../../application/usecases/UpdateOrderStatus.js';

import OrderService from '../../domain/services/OrderService.js';

import OrderRepositoryMongo from '../database/mongodb/models/OrderRepositoryMongo.js';
import { rabbitPublisher } from '../../container.js';

export function makeOrderController() {
  // services
  const orderService = new OrderService();

  // repositories
  const orderRepository = new OrderRepositoryMongo();

  // events
  const eventPublisher = rabbitPublisher;

  // usecases
  const createOrderUseCase = new CreateOrder({
    orderRepository,
    orderService,
    eventPublisher
  });

  const getOrdersUseCase = new GetOrders({
    orderRepository
  });

  const getOrderStatusUseCase = new GetOrderStatus({
    orderRepository,
    orderService
  });

  const updateOrderStatusUseCase = new UpdateOrderStatus({
    orderRepository,
    orderService,
    eventPublisher
  });

  return new OrderController({
    createOrderUseCase,
    getOrdersUseCase,
    getOrderStatusUseCase,
    updateOrderStatusUseCase
  });
}