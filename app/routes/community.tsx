import type { Route } from "./+types/community";
import { Layout } from "~/home/layout";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "7AIO | Community" },
    { name: "description", content: "Welcome to 7AIO!" },
  ];
}

export default function Community() {
  return (
    <Layout>
      <div>
        <p>Ini halaman komunitas</p>
      </div>
    </Layout>
  );
}
