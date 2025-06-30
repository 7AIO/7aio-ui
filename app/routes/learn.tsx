import type { Route } from "./+types/learn";
import { Layout } from "~/home/layout";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "7AIO | Learn" },
    { name: "description", content: "Welcome to 7AIO!" },
  ];
}

export default function Learn() {
  return (
    <Layout>
      <main className="bg-slate-300">
        <p>Ini halaman LearnAI</p>
      </main>
    </Layout>
  );
}
