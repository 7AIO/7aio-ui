import type { Route } from "./+types/community";
import { Layout } from "~/home/layout";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Users, MessageCircle, Trophy, Star, ArrowRight, CircleQuestionMark, BadgeQuestionMark, FileQuestionMark, MailQuestion, CircleQuestionMarkIcon } from "lucide-react";
import { NavLink } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "7AIO | Community" },
    { name: "description", content: "Join Our Discord Community!" },
  ];
}

export default function Community() {
  const communityFeatures = [
    {
      icon: Users,
      title: "Connect with Explorers",
      description: "Meet fellow AI enthusiasts and learners from around the world"
    },
    {
      icon: MessageCircle,
      title: "Ask Questions",
      description: "Get help from fellow community members and mentors"
    },
    {
      icon: Trophy,
      title: "Share Projects",
      description: "Show off your AI creations and get feedback from peers"
    },
    {
      icon: Star,
      title: "Stay Updated",
      description: "Get the latest news and features about AI tools"
    }
  ];

  return (
    <Layout>
      <main className="min-h-screen relative py-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gradient mb-6 ">
              Join Our Discord Community
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
              Connect with fellow AI explorers, share your projects, ask questions, and learn together in our dedicated Discord server
            </p>
          </div>

          {/* Community Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {communityFeatures.map((feature, index) => (
              <Card 
                key={index}
                className="bg-card-gradient border-slate-600/50 card-glow backdrop-blur-sm animate-float hover:scale-105 transform transition-all duration-200"
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto p-3 bg-violet-500/20 rounded-lg mb-4 w-fit">
                    <feature.icon className="h-8 w-8 text-violet-400" />
                  </div>
                  <CardTitle className="text-slate-100">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 text-center">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Ready to Connect Section */}
          <Card className="bg-linear-to-br from-slate-800/50 to-slate-900/50 border-violet-500/30 backdrop-blur-sm max-w-2xl mx-auto">
            <CardContent className="p-8 text-center">
              <div className="mx-auto p-4 bg-violet-500/20 rounded-full mb-6 w-fit">
                <Users className="h-12 w-12 text-violet-400" />
              </div>
              <h2 className="text-2xl font-bold text-gradient mb-4">Ready to Connect?</h2>
              <p className="text-slate-300 mb-6">
                Our Discord server is the central hub for the 7AIO community. Join us to share your AI explorations and get feedback!
              </p>
              
              <div className="space-y-3 mb-6">
                {[
                  "Share your AI creations and get feedback",
                  "Ask questions and get help from fellow members", 
                  "Get access to exclusive tutorials and content",
                  "Stay updated on the latest 7AIO news and features"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 text-left">
                    <div className="h-2 w-2 bg-violet-400 rounded-full"></div>
                    <span className="text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
              
              <Button 
                size="lg" 
                className="bg-accent-gradient hover:scale-105 transform transition-all duration-200 glow-effect px-8 py-3 animate-pulse-glow"
              >
                <ArrowRight className="mr-2 h-5 w-5" />
                <NavLink to="https://discord.gg/cZHw9ZXE6b">Join the Server</NavLink> 
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </Layout>
  );
}