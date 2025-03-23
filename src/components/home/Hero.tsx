
import { Button } from "@/components/ui/button";
import BlurredCard from "@/components/ui/BlurredCard";
import { ArrowRight, BrainCircuit, Code, Database, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={heroRef}
      className="relative pt-32 pb-20 overflow-hidden"
    >
      {/* Background elements */}
      <div className="blurred-gradient-blue w-[600px] h-[600px] top-[-100px] right-[-100px]" />
      <div className="blurred-gradient-blue w-[600px] h-[600px] bottom-[-100px] left-[-100px]" />

      <div className="container px-6 mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className={`space-y-8 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium">
              <BrainCircuit className="mr-2 h-4 w-4" />
              <span>AI-Powered Engineer Matching</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance leading-tight">
              Find the <span className="text-primary">perfect engineer</span> for your next project
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-xl text-balance">
              FoundYou leverages AI to connect you with the most qualified engineers based on your project requirements, timeline, and budget.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90" asChild>
                <Link to="/search">
                  Find Engineers <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/signup">Create Account</Link>
              </Button>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <span>10,000+ Engineers</span>
              </div>
              <div className="flex items-center gap-2">
                <Code className="h-4 w-4 text-primary" />
                <span>500+ Skills</span>
              </div>
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-primary" />
                <span>99.9% Match Rate</span>
              </div>
            </div>
          </div>
          
          <div className={`${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
            <div className="relative">
              <BlurredCard className="p-0 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80" 
                  alt="AI Engineer Matching"
                  className="w-full h-auto rounded-t-xl object-cover"
                  loading="lazy"
                />
                
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">AI-Powered Matching</h3>
                    <div className="flex space-x-2">
                      <span className="inline-flex h-3 w-3 rounded-full bg-green-500"></span>
                      <span className="inline-flex h-3 w-3 rounded-full bg-primary"></span>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground">
                    Our advanced AI analyzes your project requirements and matches you with engineers who have the exact skills you need.
                  </p>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <BlurredCard className="col-span-1 p-4 animate-float" style={{ animationDelay: '0.1s' }}>
                      <div className="text-sm font-medium">Match Rate</div>
                      <div className="text-lg font-bold text-primary">98.5%</div>
                    </BlurredCard>
                    <BlurredCard className="col-span-2 p-4 animate-float" style={{ animationDelay: '0.3s' }}>
                      <div className="text-sm font-medium">Top Skills Matched</div>
                      <div className="text-lg font-bold text-primary">React, Node.js, Python</div>
                    </BlurredCard>
                  </div>
                </div>
              </BlurredCard>
              
              <BlurredCard 
                className="absolute -bottom-6 -right-6 w-48 p-4 animate-float"
                style={{ animationDelay: '0.5s' }}
              >
                <div className="text-sm font-medium">Engineers Available</div>
                <div className="text-2xl font-bold text-primary">10,458</div>
              </BlurredCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
