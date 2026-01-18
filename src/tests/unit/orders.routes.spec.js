import { jest } from "@jest/globals";
import CreateOrder from "../../application/usecases/CreateOrder.js";
import GetOrders from "../../application/usecases/GetOrders.js";
import GetOrderStatus from "../../application/usecases/GetOrderStatus.js";
import UpdateOrderStatus from "../../application/usecases/UpdateOrderStatus.js";

describe("CreateOrder use case", () => {
  it("deve criar uma order válida", async () => {
    const orderRepository = {
      save: jest.fn(),
    };

    const orderService = {
      validateItems: jest.fn(),
      calculateTotalPrice: jest.fn(),
      calculateTotalQuantity: jest.fn(),
    };

    const eventPublisher = {
      orderCreated: jest.fn(),
    };

    const useCase = new CreateOrder({
      orderRepository,
      orderService,
      eventPublisher,
    });

    const input = {
      items: [
        { description: "café", quantity: 2, unitPrice: 10 },
        { description: "pão", quantity: 1, unitPrice: 5 },
      ],
    };

    orderService.calculateTotalPrice.mockReturnValue(25);
    orderService.calculateTotalQuantity.mockReturnValue(3);

    orderRepository.save.mockResolvedValue({
      id: "1",
      ...input,
      totalPrice: 25,
      totalQuantity: 3,
      status: "CREATED",
    });

    const result = await useCase.execute(input);

    expect(orderService.validateItems).toHaveBeenCalledWith(input.items);
    expect(orderService.calculateTotalPrice).toHaveBeenCalledWith(input.items);
    expect(orderService.calculateTotalQuantity).toHaveBeenCalledWith(input.items);
    expect(orderRepository.save).toHaveBeenCalled();
    expect(eventPublisher.orderCreated).toHaveBeenCalledWith(result);
    expect(result.id).toBeDefined();
  });
});

describe("GetOrders use case", () => {
  it("deve retornar a lista de orders", async () => {
    const orderRepository = {
      findAll: jest.fn(),
    };

    const useCase = new GetOrders({ orderRepository });

    const orders = [
      { id: "1", status: "CREATED" },
      { id: "2", status: "DONE" },
    ];

    orderRepository.findAll.mockResolvedValue(orders);

    const result = await useCase.execute();

    expect(orderRepository.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(orders);
  });
});

describe("GetOrderStatus use case", () => {
  it("deve retornar o status da order", async () => {
    const orderRepository = {
      findById: jest.fn(),
    };

    const orderService = {
      isValidIdOrder: jest.fn(),
    };

    const useCase = new GetOrderStatus({
      orderRepository,
      orderService,
    });

    const order = { id: "1", status: "CREATED" };
    orderRepository.findById.mockResolvedValue(order);

    const result = await useCase.execute("1");

    expect(orderService.isValidIdOrder).toHaveBeenCalledWith("1");
    expect(orderRepository.findById).toHaveBeenCalledWith("1");
    expect(result).toEqual("CREATED");
  });
});

describe("UpdateOrderStatus use case", () => {
  it("deve atualizar o status da order", async () => {
    const orderRepository = {
      findById: jest.fn(),
      updateStatus: jest.fn(),
    };

    const orderService = {
      isValidIdOrder: jest.fn(),
    };

    const eventPublisher = {
      orderStatusUpdated: jest.fn(),
    };

    const order = {
      id: "1",
      status: "CREATED",
      updateStatus: jest.fn(function (status) {
        this.status = status;
      }),
    };

    orderRepository.findById.mockResolvedValue(order);
    orderRepository.updateStatus.mockResolvedValue();
    eventPublisher.orderStatusUpdated.mockResolvedValue();

    const useCase = new UpdateOrderStatus({
      orderRepository,
      orderService,
      eventPublisher,
    });

    const result = await useCase.execute({
      orderId: "1",
      status: "DONE",
    });

    expect(orderService.isValidIdOrder).toHaveBeenCalledWith("1");
    expect(order.updateStatus).toHaveBeenCalledWith("DONE");
    expect(orderRepository.updateStatus).toHaveBeenCalledWith("1", "DONE");
    expect(eventPublisher.orderStatusUpdated).toHaveBeenCalledWith(order);
    expect(result.status).toBe("DONE");
  });
});