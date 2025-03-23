
import Features from "@/components/home/Features";
import Hero from "@/components/home/Hero";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main>
        <Hero />
        <Features />
        
        <section className="py-20 bg-secondary/50">
          <div className="container px-6 mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">
                  Join thousands of engineers and clients already using FoundYou
                </h2>
                
                <p className="text-lg text-muted-foreground mb-8 text-balance">
                  Create your account today and discover why FoundYou is the preferred platform for engineering talent.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-semibold">AI-Powered Matching</h3>
                      <p className="text-muted-foreground">
                        Find the perfect engineer match based on your specific project requirements.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-semibold">Secure Payments</h3>
                      <p className="text-muted-foreground">
                        Process payments securely with our integrated payment system and escrow protection.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-semibold">End-to-End Project Management</h3>
                      <p className="text-muted-foreground">
                        Manage your projects from start to finish with our comprehensive toolset.
                      </p>
                    </div>
                  </div>
                </div>
                
                <Button size="lg" className="gap-2 mt-10" asChild>
                  <Link to="/signup">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                  alt="Team collaboration"
                  className="w-full h-auto rounded-xl shadow-xl"
                  loading="lazy"
                />
                
                <div className="absolute -bottom-6 -left-6 bg-background p-4 rounded-xl shadow-lg border border-border animate-float">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      <img 
                        src="https://randomuser.me/api/portraits/women/72.jpg" 
                        alt="User"
                        className="w-8 h-8 rounded-full border-2 border-background"
                      />
                      <img 
                        src="https://randomuser.me/api/portraits/men/32.jpg" 
                        alt="User"
                        className="w-8 h-8 rounded-full border-2 border-background"
                      />
                      <img 
                        src="https://randomuser.me/api/portraits/women/45.jpg" 
                        alt="User"
                        className="w-8 h-8 rounded-full border-2 border-background"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium">10,000+ Engineers</p>
                      <p className="text-xs text-muted-foreground">Join our community</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <footer className="py-12 bg-background border-t border-border">
          <div className="container px-6 mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-semibold mb-3">Platform</h3>
                <ul className="space-y-2">
                  <li><Link to="/search" className="text-muted-foreground hover:text-foreground">Find Engineers</Link></li>
                  <li><Link to="/projects" className="text-muted-foreground hover:text-foreground">Projects</Link></li>
                  <li><Link to="/pricing" className="text-muted-foreground hover:text-foreground">Pricing</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Resources</h3>
                <ul className="space-y-2">
                  <li><Link to="/blog" className="text-muted-foreground hover:text-foreground">Blog</Link></li>
                  <li><Link to="/documentation" className="text-muted-foreground hover:text-foreground">Documentation</Link></li>
                  <li><Link to="/guides" className="text-muted-foreground hover:text-foreground">Guides</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Company</h3>
                <ul className="space-y-2">
                  <li><Link to="/about" className="text-muted-foreground hover:text-foreground">About</Link></li>
                  <li><Link to="/careers" className="text-muted-foreground hover:text-foreground">Careers</Link></li>
                  <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Legal</h3>
                <ul className="space-y-2">
                  <li><Link to="/privacy" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
                  <li><Link to="/terms" className="text-muted-foreground hover:text-foreground">Terms of Service</Link></li>
                  <li><Link to="/cookies" className="text-muted-foreground hover:text-foreground">Cookie Policy</Link></li>
                </ul>
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center mb-4 md:mb-0">
                <Link to="/" className="flex items-center gap-2 text-lg font-semibold">FoundYou</Link>
              </div>
              
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} FoundYou. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
