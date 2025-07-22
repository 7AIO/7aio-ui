import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Sparkles, ArrowRight, Brain, Rocket } from "lucide-react";

export function Welcome() {
  return (
    <main className="flex items-center justify-center pt-16 pb-4 min-h-screen">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0 max-w-2xl mx-auto px-4">
        
        {/* Welcome Hero */}
        <div className="text-center animate-float">
          <div className="mx-auto p-6 bg-violet-500/20 rounded-full mb-8 w-fit glow-effect">
            <Brain className="h-16 w-16 text-violet-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            Welcome to 7AIO
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            Your journey into the amazing world of Artificial Intelligence starts here
          </p>
        </div>

        {/* What's Next Card */}
        <Card className="bg-card-gradient border-slate-600/50 card-glow backdrop-blur-sm w-full max-w-md">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              <div className="mx-auto p-4 bg-linear-to-r from-purple-500/20 to-blue-500/20 rounded-full w-fit">
                <Sparkles className="h-8 w-8 text-gradient" />
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-slate-100 mb-2">What's next?</h2>
                <p className="text-slate-300">
                  Ready to explore the universe of AI? Choose your adventure and start learning with interactive lessons, fun tools, and hands-on projects.
                </p>
              </div>

              <div className="space-y-4">
                <Button 
                  className="w-full bg-button-gradient hover:scale-105 transform transition-all duration-200 glow-effect text-lg py-6"
                  size="lg"
                >
                  <Rocket className="mr-2 h-5 w-5" />
                  Start Your AI Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full border-violet-500/50 text-violet-300 hover:bg-violet-500/10 backdrop-blur-sm"
                  size="lg"
                >
                  Explore Tools Playground
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-6 w-full max-w-md text-center">
          <div className="space-y-2">
            <div className="text-2xl font-bold text-gradient">1K+</div>
            <div className="text-sm text-slate-400">Students</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-gradient">50+</div>
            <div className="text-sm text-slate-400">Lessons</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-gradient">24/7</div>
            <div className="text-sm text-slate-400">AI Tools</div>
          </div>
        </div>
      </div>
    </main>
  );
}