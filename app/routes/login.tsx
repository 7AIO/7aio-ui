import type { Route } from "./+types/login";
import { Welcome } from "../home/welcome";
import { Layout } from "~/home/layout";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "7AIO" },
    { name: "description", content: "Welcome to 7AIO!" },
  ];
}

export default function Login() {
  return (
      <Layout>
        <Welcome />
      </Layout>
    );
}
