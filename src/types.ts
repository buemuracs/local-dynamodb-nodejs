export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export enum UserTypes {
  ADMIN = "ADMIN",
  USER = "USER",
  GUEST = "GUEST",
}

export class User {
  id: string;
  companyId: string;
  name: string;
  status: UserStatus;
  type: UserTypes;

  constructor(input: User) {
    this.id = input.id;
    this.companyId = input.companyId;
    this.name = input.name;
    this.status = input.status;
    this.type = input.type;
  }
}
