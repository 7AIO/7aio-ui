import { Welcome } from "~/home/welcome";
import type { Route } from "./+types/miners";
import { Layout } from "~/home/layout";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "7AIO | Miners" },
    { name: "description", content: "Welcome to 7AIO!" },
  ];
}

export default function Miners() {
  return (
    <Layout>
      <div>
        <p>Ini halaman miners</p>
      </div>
    </Layout>
  );
}
