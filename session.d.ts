import { User } from "./typings/typings";

declare module "iron-session" {
  interface IronSessionData {
    user?: User;
  }
}
