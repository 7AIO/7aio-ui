import type { Route } from "./+types/learn";
import { Layout } from "~/home/layout";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Brain, BookOpen, Code, Zap, Star, Clock, Users, ChevronRight } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "7AIO | Learn" },
    { name: "description", content: "AI Learning Courses" },
  ];
}

export default function Learn() {
  const courses = [
    {
      title: "AI Basics",
      description: "Learn what AI is and how it's changing our world through fun examples and interactive demos",
      level: "Beginner",
      duration: "2-3 hours",
      students: "1.2k",
      rating: 4.8,
      icon: Brain,
      gradient: "from-purple-500 to-pink-500",
      topics: ["What is AI?", "Machine Learning", "Real-world examples"]
    },
    {
      title: "Machine Learning",
      description: "Dive deeper into ML algorithms with interactive demos and real-world applications",
      level: "Intermediate", 
      duration: "4-5 hours",
      students: "856",
      rating: 4.9,
      icon: Code,
      gradient: "from-blue-500 to-cyan-500",
      topics: ["Supervised Learning", "Unsupervised Learning", "Neural Networks"]
    },
    {
      title: "Neural Networks",
      description: "Explore the power of neural networks with visualizations and hands-on coding exercises",
      level: "Advanced",
      duration: "6-8 hours", 
      students: "623",
      rating: 4.7,
      icon: Zap,
      gradient: "from-emerald-500 to-teal-500",
      topics: ["Deep Learning", "CNNs", "RNNs", "Transformers"]
    }
  ];

  const learningPath = [
    {
      step: 1,
      title: "Start with Fundamentals",
      description: "Begin your AI journey with basic concepts"
    },
    {
      step: 2,
      title: "Practice with Tools", 
      description: "Experiment with real AI applications"
    },
    {
      step: 3,
      title: "Build Projects",
      description: "Create your own AI-powered solutions"
    },
    {
      step: 4,
      title: "Join Community",
      description: "Share and learn with other explorers"
    }
  ];

  return (
    <Layout>
      <main className="min-h-screen relative py-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gradient mb-4 py-2">
              AI Learning Courses
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
              From beginner to advanced, we've got learning paths for every level of AI explorer
            </p>
            
            <Button 
              size="lg" 
              className="bg-button-gradient hover:scale-105 transform transition-all duration-200 glow-effect px-8 py-3 text-lg font-semibold mb-8 animate-pulse-glow"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              View All Courses
            </Button>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {courses.map((course, index) => (
              <Card 
                key={index}
                className="bg-card-gradient border-slate-600/50 card-glow backdrop-blur-sm animate-float hover:scale-105 transform transition-all duration-200"
                style={{animationDelay: `${index * 0.3}s`}}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 bg-linear-to-r ${course.gradient} rounded-lg opacity-80`}>
                      <course.icon className="h-6 w-6 text-white" />
                    </div>
                    <Badge 
                      variant="secondary" 
                      className={`
                        ${course.level === 'Beginner' ? 'bg-green-500/20 text-green-400 border-green-500/30' : ''}
                        ${course.level === 'Intermediate' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : ''}
                        ${course.level === 'Advanced' ? 'bg-red-500/20 text-red-400 border-red-500/30' : ''}
                      `}
                    >
                      {course.level}
                    </Badge>
                  </div>
                  <CardTitle className="text-slate-100 text-xl">{course.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 mb-6">{course.description}</p>
                  
                  {/* Course Stats */}
                  <div className="flex items-center gap-4 mb-6 text-sm text-slate-400">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {course.students}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400" />
                      {course.rating}
                    </div>
                  </div>

                  {/* Topics */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {course.topics.map((topic, topicIndex) => (
                        <Badge 
                          key={topicIndex} 
                          variant="outline" 
                          className="text-xs border-slate-500/50 text-slate-300"
                        >
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button 
                    className={`w-full bg-linear-to-r ${course.gradient} hover:scale-105 transform transition-all duration-200`}
                  >
                    Start Course
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Learning Path Section */}
          <Card className="bg-linear-to-br from-slate-800/50 to-slate-900/50 border-violet-500/30 backdrop-blur-sm mb-16">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-gradient mb-4">Your Learning Journey</CardTitle>
              <p className="text-slate-300">Follow our structured path to become an AI expert</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {learningPath.map((step, index) => (
                  <div key={index} className="text-center relative">
                    {index < learningPath.length - 1 && (
                      <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-violet-500 to-purple-500/50"></div>
                    )}
                    <div className="relative z-10">
                      <div className="w-16 h-16 mx-auto mb-4 bg-linear-to-r from-violet-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {step.step}
                      </div>
                      <h3 className="font-semibold text-slate-100 mb-2">{step.title}</h3>
                      <p className="text-sm text-slate-300">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </Layout>
  );
}