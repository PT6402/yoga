/* eslint-disable @typescript-eslint/no-empty-object-type */
import { ComponentType, ReactNode } from "react";

export interface LocationStates {
  "/"?: {};
  "/product-detail/:id"?: {};
  "/page-collection/:cateId"?: {};
  "/page-collection"?: {};
  "/cart"?: {};
  "/checkout"?: {};
  "/thank-you"?: {};
  "/order"?: {};
  "/login"?: {};
}
export type PathName = keyof LocationStates;
export interface PageChilds {
  path?: string;
  component?: ComponentType<object>;
}
export interface Page {
  path?: PathName;
  component?: ComponentType<object>;
  element?: ReactNode;
  icon?: ReactNode;
  name?: string;
  path_admin?: string;
  index?: boolean;
  childs?: PageChilds[];
}
