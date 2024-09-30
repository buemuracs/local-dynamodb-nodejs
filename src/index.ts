import { randomBytes, randomUUID } from "node:crypto";
import { createTable, findByCompanyAndType, putItem } from "./dynamodb";
import { OrderStatus, OrderTypes } from "./types";

// Run the functions
async function execute() {
  // Create Table and seed
  await createTable();
  await putItem({
    id: randomUUID(),
    companyId: "45139adb-cd8a-4ddc-aa9e-63f899a8449d",
    name: "ORDER-COMMON",
    userId: "cm1p02y6a000008le54jrdaig",
    status: OrderStatus.OPEN,
    type: OrderTypes.COMMON,
  });
  await putItem({
    id: randomUUID(),
    companyId: "45139adb-cd8a-4ddc-aa9e-63f899a8449d",
    name: "ORDER-COMMON",
    userId: "cm1p02y6a000008le54jrdaig",
    status: OrderStatus.OPEN,
    type: OrderTypes.COMMON,
  });
  await putItem({
    id: randomUUID(),
    companyId: "45139adb-cd8a-4ddc-aa9e-63f899a8449d",
    name: "ORDER-COMMON",
    userId: "cm1p02y6a000008le54jrdaig",
    status: OrderStatus.OPEN,
    type: OrderTypes.COMMON,
  });
  await putItem({
    id: randomUUID(),
    companyId: "45139adb-cd8a-4ddc-aa9e-63f899a8449d",
    name: "ORDER-COMMON",
    userId: "cm1p03yh3000108le71cqaoxh",
    status: OrderStatus.OPEN,
    type: OrderTypes.COMMON,
  });
  await putItem({
    id: randomUUID(),
    companyId: "45139adb-cd8a-4ddc-aa9e-63f899a8449d",
    name: "ORDER-COMMON",
    userId: "cm1p03yh3000108le71cqaoxh",
    status: OrderStatus.OPEN,
    type: OrderTypes.COMMON,
  });

  // const res = await findByCompanyAndType({
  //   companyId: "45139adb-cd8a-4ddc-aa9e-63f899a8449d",
  //   type: OrderTypes.ADMIN,
  //   // name: "jane doe",
  // });
  // console.log(res);
}
execute();
