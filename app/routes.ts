import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("login", "routes/login.tsx"),
    layout("auth/ProtectedRoute.tsx",[
      route("learn", "routes/learn.tsx"),
      route("community", "routes/community.tsx"),
      route("miners", "routes/miners.tsx"),
    ]),
] satisfies RouteConfig;
