import CartPage from "../pages/CartPage";
import CollectionPage from "../pages/CollectionPage";
import CheckoutPage from "../pages/page_checkout/CheckoutPage";
import PageHome from "../pages/HomePage";
import ProductDetailPage from "../pages/product_detail/ProductDetailPage";
import ThankyouPage from "../pages/ThankyouPage";
import { Page } from "./types";
import ProductIcon from "../components/icons/ProductIcon";
import CategoryIcon from "../components/icons/CategoryIcon";
import VariantIcon from "../components/icons/VariantIcon";
import {
  CategoryAdmin,
  CreateProductAdmin,
  InfoAdmin,
  OrderEditAdmin,
  OrderPageAdmin,
  ProductAdmin,
  ProductEditAdmin,
  VariantAdmin,
} from "../pages/admin";

export const page_route_app: Page[] = [
  { path: "/", component: PageHome },
  { path: "/product-detail/:id", component: ProductDetailPage },
  { path: "/page-collection", component: CollectionPage },
  { path: "/page-collection/:cateId", component: CollectionPage },
  { path: "/cart", component: CartPage },
  { path: "/checkout", component: CheckoutPage },
  { path: "/thank-you", component: ThankyouPage },
];

export const page_route_admin_app: Page[] = [
  {
    icon: <ProductIcon />,
    name: "order",
    path_admin: "order",
    component: OrderPageAdmin,
    index: true,
    childs: [
      {
        path: "detail/:id",
        component: OrderEditAdmin,
      },
    ],
  },
  {
    icon: <ProductIcon />,
    name: "product",
    path_admin: "product",
    component: ProductAdmin,
    childs: [
      {
        path: "create",
        component: CreateProductAdmin,
      },
      {
        path: "info/:id",
        component: ProductEditAdmin,
      },
    ],
  },
  {
    icon: <CategoryIcon />,
    name: "Category",
    path_admin: "category",
    component: CategoryAdmin,
  },
  {
    icon: <VariantIcon />,
    name: "Variant",
    path_admin: "variant",
    component: VariantAdmin,
  },
  {
    icon: <VariantIcon />,
    name: "Info app",
    path_admin: "info-app",
    component: InfoAdmin,
  },
];
