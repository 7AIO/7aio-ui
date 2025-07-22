import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Model } from "~/lib/Model";
import type { ActionName } from "~/lib/Model";
import { Card, CardContent } from "~/components/ui/card";
import {
  Sparkles,
  BookOpen,
  Users,
  FlaskConical,
  Mountain,
  ChevronRight,
} from "lucide-react";
import { ChatBox, ChatBoxCTA } from "~/components/chat-box";
import { NavLink } from "react-router";
import { useAuth } from "~/auth/AuthProvider";

export function HomeIndex() {
  const [currentAnimation, setCurrentAnimation] = useState<
    ActionName | undefined
  >();
  const { user, loading, login } = useAuth();

  const subjects = [
    {
      name: "Science",
      icon: FlaskConical,
      description:
        "Explore the wonders of the natural world, from biology to physics and chemistry.",
      animation: "Wave" as ActionName,
      gradient: "from-purple-500 to-pink-500",
      iconBgColor: "bg-violet-500/20",
      iconTextColor: "text-violet-400",
      actions: () => {
        console.log("Arahkan Ke Science, robot waving");
        setCurrentAnimation("Wave");
      },
    },
    {
      name: "Geography",
      icon: Mountain,
      description:
        "Discover different cultures, landscapes, and environments across the globe.",
      animation: "ThumbsUp" as ActionName,
      gradient: "from-blue-500 to-cyan-500",
      iconBgColor: "bg-blue-500/20",
      iconTextColor: "text-blue-400",
      actions: () => {
        console.log("Arahkan Ke Geography, jempol!");
        setCurrentAnimation("ThumbsUp");
      },
    },
    {
      name: "Sociology",
      icon: Users,
      description:
        "Understand human society, social behavior, and cultural patterns.",
      animation: "Yes" as ActionName,
      gradient: "from-emerald-500 to-teal-500",
      iconBgColor: "bg-emerald-500/20",
      iconTextColor: "text-emerald-400",
      actions: () => {
        console.log("Arahkan Ke Sociology, dan animasi yes!");
        setCurrentAnimation("Yes");
      },
    },
    {
      name: "Language",
      icon: BookOpen,
      description:
        "Master new languages, unlock other cultures, and communicate with the world.",
      animation: "Dance" as ActionName,
      gradient: "from-amber-500 to-orange-500",
      iconBgColor: "bg-amber-500/20",
      iconTextColor: "text-amber-400",
      actions: () => {
        console.log("Arahkan Ke Language, dan animasi menari");
        setCurrentAnimation("Dance");
      },
    },
  ];

  return (
    <main className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 w-full flex flex-col ">
        <div className="text-center py-8 px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-gradient mb-4 py-2">
            Explore the Universe of AI with 7AIO
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            Discover the magic of artificial intelligence through interactive
            lessons, fun tools, and hands-on projects designed for students and
            young learners
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              size="lg"
              className="bg-button-gradient hover:scale-105 transform transition-all duration-200 glow-effect px-8 py-3 text-lg font-semibold animate-pulse-glow"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              <NavLink to="/learn">Start Learning Now</NavLink>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-violet-500/50 text-violet-300 focus:bg-violet-500/10 hover:bg-violet-500/10 px-8 py-3 text-lg backdrop:blur-sm"
            >
              <NavLink to="#chat-box">Try our AI Tools</NavLink>
            </Button>
          </div>
        </div>

        <div className="flex-1 my-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="flex flex-col space-y-6 items-center md:items-end">
                {subjects.slice(0, 2).map((subject, index) => (
                  <Card
                    key={subject.name}
                    className="bg-card-gradient border-slate-600/50 card-glow backdrop:blur-sm p-6 w-full max-w-sm animate-float"
                    style={{ animationDelay: `${index * 0.5}s` }}
                  >
                    <CardContent className="p-0">
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className={`p-2 ${subject.iconBgColor} rounded-lg`}
                        >
                          <subject.icon
                            className={`h-6 w-6 ${subject.iconTextColor}`}
                          />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-100">
                          {subject.name}
                        </h3>
                      </div>
                      <p className="text-sm text-slate-300 mb-4">
                        {subject.description}
                      </p>
                      <Button
                        onClick={user ? subject.actions : login}
                        className={`w-full bg-linear-to-r ${subject.gradient} hover:scale-105 transform transition-all duration-200`}
                      >
                        Learn {subject.name}
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="order-first md:order-0 mb-6 md:mb-0">
                <div className="relative">
                  <div className="absolute inset-0 bg-linear-to-r from-violet-500/20 to-blue-500/20 rounded-full blur-xl animate-pulse-glow"></div>
                  <div className="relative aspect-square max-w-[350px] mx-auto rounded-full bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-violet-500/30 backdrop-blur-sm overflow-hidden">
                    <Canvas
                      shadows
                      camera={{ fov: 50, position: [0, 0, 5] }}
                      className="w-full h-full"
                    >
                      <Environment preset="city" />
                      <ambientLight intensity={0.5} />
                      <pointLight position={[10, 10, 10]} intensity={1} />
                      <Model
                        position={[0, -2, -2]}
                        animation={currentAnimation}
                      />
                    </Canvas>
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-6 items-center md:items-start">
                {subjects.slice(2, 4).map((subject, index) => (
                  <Card
                    key={subject.name}
                    className="bg-card-gradient border-slate-600/50 card-glow backdrop:blur-sm p-6 w-full max-w-sm animate-float"
                    style={{ animationDelay: `${1 + index * 0.5}s` }}
                  >
                    <CardContent className="p-0">
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className={`p-2 ${subject.iconBgColor} rounded-lg`}
                        >
                          <subject.icon
                            className={`h-6 w-6 ${subject.iconTextColor}`}
                          />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-100">
                          {subject.name}
                        </h3>
                      </div>
                      <p className="text-sm text-slate-300 mb-4">
                        {subject.description}
                      </p>
                      <Button
                        onClick={user ? subject.actions : login}
                        className={`w-full bg-linear-to-r ${subject.gradient} hover:scale-105 transform transition-all duration-200`}
                      >
                        Learn {subject.name}
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          id="chat-box"
          className="w-full p-4 backdrop-blur-md border-t border-violet-500/20 bg-linear-to-t from-slate-900/80 to-transparent"
        >
          <div className="max-w-4xl mx-auto">
            {!loading && user ? <ChatBox user={user} /> : <ChatBoxCTA />}
          </div>
        </div>
      </div>
    </main>
  );
}
