import { randomBytes, randomUUID } from "node:crypto";
import { createTable, findByCompanyAndType, putItem } from "./dynamodb";
import { UserStatus, UserTypes } from "./types";

// Run the functions
async function execute() {
  // // Create Table and seed
  //   await createTable();
  //   await putItem({
  //     id: randomUUID(),
  //     companyId: "45139adb-cd8a-4ddc-aa9e-63f899a8449d",
  //     name: "john doe",
  //     status: UserStatus.ACTIVE,
  //     type: UserTypes.ADMIN,
  //   });
  //   await putItem({
  //     id: randomUUID(),
  //     companyId: "45139adb-cd8a-4ddc-aa9e-63f899a8449d",
  //     name: "jane doe",
  //     status: UserStatus.ACTIVE,
  //     type: UserTypes.GUEST,
  //   });
  //   await putItem({
  //     id: randomUUID(),
  //     companyId: "45139adb-cd8a-4ddc-aa9e-63f899a8449d",
  //     name: "bob doe",
  //     status: UserStatus.ACTIVE,
  //     type: UserTypes.GUEST,
  //   });
  //   await putItem({
  //     id: randomUUID(),
  //     companyId: "45139adb-cd8a-4ddc-aa9e-63f899a8449d",
  //     name: "lane doe",
  //     status: UserStatus.ACTIVE,
  //     type: UserTypes.ADMIN,
  //   });
  //   await putItem({
  //     id: randomUUID(),
  //     companyId: "45139adb-cd8a-4ddc-aa9e-63f899a8449d",
  //     name: "fred doe",
  //     status: UserStatus.ACTIVE,
  //     type: UserTypes.ADMIN,
  //   });

  const res = await findByCompanyAndType({
    companyId: "45139adb-cd8a-4ddc-aa9e-63f899a8449d",
    type: UserTypes.ADMIN,
    // name: "jane doe",
  });
  console.log(res);
}
execute();
