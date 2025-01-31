import { Router } from "express";
import { BookRoutes } from "../modules/book/book.route";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/books",
    route: BookRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
