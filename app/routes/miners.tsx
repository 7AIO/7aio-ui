import type { Route } from "./+types/miners";
import { Layout } from "~/home/layout";
import { Button } from "~/components/ui/button";
import { Cpu, ArrowLeft } from "lucide-react";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "7AIO | AI Tools Playground" },
    { name: "description", content: "Our AI Tools Playground is coming soon!" },
  ];
}

export default function Miners() {
  return (
    <Layout>
      <main className="min-h-screen relative flex items-center justify-center py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <div className="mx-auto p-6 bg-violet-500/20 rounded-full mb-8 w-fit glow-effect animate-float">
              <Cpu className="h-16 w-16 text-violet-400" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gradient mb-4 py-2">
              Coming Soon!
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
              Our Miners is under construction. We're working hard to make it available soon. Stay tuned!
            </p>
            <Button asChild size="lg" className="bg-button-gradient hover:scale-105 transform transition-all duration-200 glow-effect px-8 py-3 text-lg font-semibold">
              <Link to="/">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Go Back Home
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </Layout>
  );
}