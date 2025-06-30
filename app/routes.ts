import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("login", "routes/login.tsx"),
    route("learn", "routes/learn.tsx"),
    route("community", "routes/community.tsx"),
    route("miners", "routes/miners.tsx"),
] satisfies RouteConfig;
