
import BlurredCard from "@/components/ui/BlurredCard";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  BrainCircuit, 
  Briefcase, 
  CreditCard, 
  Fingerprint, 
  MessageSquare, 
  Search, 
  Shield 
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const features = [
  {
    icon: <BrainCircuit className="h-10 w-10 text-primary" />,
    title: "AI-Powered Matching",
    description: "Our advanced algorithms match you with engineers who have the exact skills your project requires."
  },
  {
    icon: <Search className="h-10 w-10 text-primary" />,
    title: "Smart Search",
    description: "Find engineers by skills, experience, availability, and pricing with our intelligent search system."
  },
  {
    icon: <Briefcase className="h-10 w-10 text-primary" />,
    title: "Project Management",
    description: "Manage your projects from start to finish with our comprehensive project management tools."
  },
  {
    icon: <MessageSquare className="h-10 w-10 text-primary" />,
    title: "Real-Time Chat",
    description: "Communicate with engineers directly through our secure real-time messaging platform."
  },
  {
    icon: <CreditCard className="h-10 w-10 text-primary" />,
    title: "Secure Payments",
    description: "Process payments securely using our integrated payment system with escrow protection."
  },
  {
    icon: <Shield className="h-10 w-10 text-primary" />,
    title: "Verified Profiles",
    description: "All engineer profiles are thoroughly vetted and verified for quality assurance."
  }
];

const Features = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Gradually make items visible with a staggered delay
          const timeouts = features.map((_, index) => {
            return setTimeout(() => {
              setVisibleItems(prev => [...prev, index]);
            }, 150 * index);
          });
          
          return () => timeouts.forEach(timeout => clearTimeout(timeout));
        }
      },
      { threshold: 0.1 }
    );

    if (featuresRef.current) {
      observer.observe(featuresRef.current);
    }

    return () => {
      if (featuresRef.current) {
        observer.unobserve(featuresRef.current);
      }
    };
  }, []);

  return (
    <section className="py-20 relative overflow-hidden" ref={featuresRef}>
      {/* Background elements */}
      <div className="blurred-gradient-blue w-[500px] h-[500px] top-[20%] right-[-250px]" />
      
      <div className="container px-6 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium mb-6">
            <Fingerprint className="mr-2 h-4 w-4" />
            <span>Cutting-Edge Technology</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">
            Everything you need to find and work with top engineers
          </h2>
          
          <p className="text-lg text-muted-foreground text-balance">
            Our platform combines AI-powered matching, secure payments, and comprehensive project management tools to ensure successful collaboration.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <BlurredCard 
              key={index}
              className={`transition-all duration-500 ${
                visibleItems.includes(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
              hoverEffect
            >
              <div className="bg-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              
              <p className="text-muted-foreground mb-6">{feature.description}</p>
              
              <Button variant="ghost" className="group px-0 text-primary" asChild>
                <Link to="/search" className="inline-flex items-center">
                  Learn more 
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </BlurredCard>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Button size="lg" className="gap-2" asChild>
            <Link to="/search">
              Get Started <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Features;
