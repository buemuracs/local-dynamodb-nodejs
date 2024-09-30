export enum OrderStatus {
  OPEN = "OPEN",
  SHIPPED = "SHIPPED",
}

export enum OrderTypes {
  COMMON = "COMMON",
  PROMO = "PROMO",
}

export class Order {
  id: string;
  companyId: string;
  name: string;
  userId: string;
  status: OrderStatus;
  type: OrderTypes;

  constructor(input: Order) {
    this.id = input.id;
    this.companyId = input.companyId;
    this.name = input.name;
    this.userId = input.userId;
    this.status = input.status;
    this.type = input.type;
  }
}
