import { useRef, useState } from "react";
import { Button } from "~/components/ui/button";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Stats,
  OrbitControls,
  ContactShadows,
  Environment,
} from "@react-three/drei";
import type { Mesh } from "three";
import { Model } from "~/lib/Model";
import type { ActionName } from "~/lib/Model";
import { Card, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Send } from "lucide-react";
import { ChatBox } from "~/components/chat-box";

export function HomeIndex() {
  const [currentAnimation, setCurrentAnimation] = useState<
    ActionName | undefined
  >();

  const subjects = [
    {
      name: "Science",
      animation: "Wave" as ActionName,
      actions: () => {
        console.log("Arahkan Ke Science, robot waving");
        setCurrentAnimation("Wave");
      },
    },
    {
      name: "Geography",
      animation: "ThumbsUp" as ActionName,
      actions: () => {
        console.log("Arahkan Ke Geography, jempol!");
        setCurrentAnimation("ThumbsUp");
      },
    },
    {
      name: "Sociology",
      animation: "Yes" as ActionName,
      actions: () => {
        console.log("Arahkan Ke Sociology, dan animasi yes!");
        setCurrentAnimation("Yes");
      },
    },
    {
      name: "Language",
      animation: "Dance" as ActionName,
      actions: () => {
        console.log("Arahkan Ke Language, dan animasi menari");
        setCurrentAnimation("Dance");
      },
    },
  ];

  return (
    <main className="min-h-screen relative">
      <div className="w-full flex flex-col h-screen">
        {/* Top section with model and buttons */}
        <div className="flex-1">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center mt-6">
              {/* Left column */}
              <div className="flex flex-col space-y-4 items-center md:items-end">
                <Button
                  variant="default"
                  onClick={subjects[0].actions}
                  className="w-full md:w-auto"
                >
                  {subjects[0].name}
                </Button>
                <Button
                  variant="default"
                  onClick={subjects[1].actions}
                  className="w-full md:w-auto"
                >
                  {subjects[1].name}
                </Button>
              </div>

              {/* Center column with 3D model */}
              <div className="order-first md:order-none mb-6 md:mb-0">
                <div className="aspect-square max-w-[300px] mx-auto rounded-full bg-background border-foreground">
                  <Canvas
                    shadows
                    camera={{ fov: 50, position: [0, 0, 5] }}
                    className="w-full h-full"
                  >
                    <Environment preset="city" />
                    <ambientLight />
                    <Model
                      position={[0, -2, -2]}
                      animation={currentAnimation}
                    />
                  </Canvas>
                </div>
              </div>

              {/* Right column */}
              <div className="flex flex-col space-y-4 items-center md:items-start">
                <Button
                  variant="default"
                  onClick={subjects[2].actions}
                  className="w-full md:w-auto"
                >
                  {subjects[2].name}
                </Button>
                <Button
                  variant="default"
                  onClick={subjects[3].actions}
                  className="w-full md:w-auto"
                >
                  {subjects[3].name}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Chat section */}
        <div className="w-full p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <ChatBox />
        </div>
      </div>
    </main>
  );
}
