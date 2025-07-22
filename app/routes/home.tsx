import { Layout } from "~/home/layout";
import type { Route } from "./+types/home";
import { HomeIndex } from "~/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "7AIO" },
    { name: "description", content: "Welcome to 7AIO!" },
  ];
}

export default function Home() {
  return (
    <Layout>
      <HomeIndex />
    </Layout>
  );
}
