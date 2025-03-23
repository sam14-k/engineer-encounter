import Navbar from "@/components/layout/Navbar";
import BlurredCard from "@/components/ui/BlurredCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Briefcase,
  Calendar,
  CheckCircle,
  Clock,
  Download,
  ExternalLink,
  Github,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Star,
  User,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { EngineerData } from "@/components/search/EngineerCard";

// Mock engineer data (expanded from search data)
const mockEngineer: EngineerData & {
  bio: string;
  location: string;
  experience: number;
  languages: { name: string; level: string }[];
  education: { degree: string; institution: string; year: string }[];
  workHistory: { role: string; company: string; duration: string; description: string }[];
  projects: { name: string; description: string; technologies: string[]; link?: string }[];
  reviews: { name: string; rating: number; comment: string; date: string }[];
} = {
  id: "1",
  name: "Alex Johnson",
  title: "Senior Frontend Developer",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  rating: 4.9,
  hourlyRate: 85,
  skills: [
    "React", 
    "TypeScript", 
    "Next.js", 
    "TailwindCSS", 
    "GraphQL", 
    "JavaScript", 
    "HTML5", 
    "CSS3", 
    "Redux", 
    "Jest", 
    "Cypress"
  ],
  matchPercentage: 98,
  availability: "Immediate",
  verified: true,
  bio: "I'm a passionate frontend developer with 8+ years of experience building responsive, user-friendly web applications. I specialize in React ecosystem and modern JavaScript frameworks, with a strong focus on creating performant and accessible user interfaces. I enjoy solving complex problems and continuously learning new technologies.",
  location: "San Francisco, CA",
  experience: 8,
  languages: [
    { name: "English", level: "Native" },
    { name: "Spanish", level: "Intermediate" },
    { name: "French", level: "Basic" }
  ],
  education: [
    {
      degree: "M.S. Computer Science",
      institution: "Stanford University",
      year: "2015"
    },
    {
      degree: "B.S. Computer Science",
      institution: "University of California, Berkeley",
      year: "2013"
    }
  ],
  workHistory: [
    {
      role: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      duration: "2020 - Present",
      description: "Lead frontend development for the company's flagship product. Implemented new features, improved performance, and mentored junior developers."
    },
    {
      role: "Frontend Developer",
      company: "InnoSoft",
      duration: "2017 - 2020",
      description: "Developed responsive web applications using React and modern JavaScript. Collaborated with design and backend teams to deliver seamless user experiences."
    },
    {
      role: "Junior Web Developer",
      company: "StartHub",
      duration: "2015 - 2017",
      description: "Built and maintained client websites. Implemented responsive designs and optimized site performance."
    }
  ],
  projects: [
    {
      name: "E-commerce Platform",
      description: "A full-featured e-commerce platform with advanced filtering, real-time inventory updates, and secure checkout.",
      technologies: ["React", "Next.js", "GraphQL", "Stripe"],
      link: "https://example.com/ecommerce"
    },
    {
      name: "Analytics Dashboard",
      description: "Interactive dashboard for visualizing business metrics with customizable charts and reports.",
      technologies: ["React", "D3.js", "TypeScript", "Material UI"],
      link: "https://example.com/dashboard"
    },
    {
      name: "Project Management Tool",
      description: "Collaborative project management application with real-time updates and task tracking.",
      technologies: ["React", "Firebase", "Redux", "TailwindCSS"]
    }
  ],
  reviews: [
    {
      name: "Sarah Miller",
      rating: 5,
      comment: "Alex was exceptional to work with. He delivered the project ahead of schedule and the code quality was outstanding. Would definitely hire again!",
      date: "June 15, 2023"
    },
    {
      name: "David Chen",
      rating: 5,
      comment: "Incredibly skilled developer who really understands how to create intuitive user interfaces. Communication was excellent throughout the project.",
      date: "March 22, 2023"
    },
    {
      name: "Emma Wilson",
      rating: 4,
      comment: "Great work on our application redesign. Alex provided valuable insights and implemented all features we requested.",
      date: "November 10, 2022"
    }
  ]
};

const Profile = () => {
  const { id } = useParams<{ id: string }>();
  const [engineer, setEngineer] = useState<typeof mockEngineer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch data for the specific engineer ID
    const timer = setTimeout(() => {
      setEngineer(mockEngineer);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [id]);

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${
            i < Math.floor(rating) 
              ? "text-yellow-400 fill-yellow-400" 
              : i < rating 
                ? "text-yellow-400 fill-yellow-400 opacity-50" 
                : "text-gray-300"
          }`}
        />
      ));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 pb-16">
          <div className="container px-6 mx-auto">
            <div className="h-[300px] rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse shimmer mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="h-[400px] rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse shimmer"></div>
              <div className="col-span-2 h-[400px] rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse shimmer"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!engineer) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 pb-16">
          <div className="container px-6 mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Engineer Not Found</h1>
            <p className="text-muted-foreground">The engineer profile you're looking for doesn't exist or has been removed.</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container px-6 mx-auto">
          <BlurredCard className="mb-8 p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="flex flex-col md:flex-row md:col-span-2 gap-6 items-center md:items-start">
                <img
                  src={engineer.avatar}
                  alt={engineer.name}
                  className="w-24 h-24 rounded-xl object-cover"
                  loading="lazy"
                />
                
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-3xl font-bold">{engineer.name}</h1>
                    {engineer.verified && (
                      <CheckCircle className="h-6 w-6 text-primary" />
                    )}
                  </div>
                  
                  <p className="text-xl text-muted-foreground mb-3">{engineer.title}</p>
                  
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{engineer.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                      <span>{engineer.experience}+ years</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-green-500" />
                      <span className="text-green-600">{engineer.availability}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {engineer.skills.slice(0, 8).map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                    {engineer.skills.length > 8 && (
                      <Badge variant="outline">
                        +{engineer.skills.length - 8} more
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Button size="sm" variant="outline" className="gap-2">
                      <Mail className="h-4 w-4" /> Contact
                    </Button>
                    <Button size="sm" className="gap-2">
                      <MessageCircle className="h-4 w-4" /> Message
                    </Button>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="ghost" className="rounded-full p-2 h-9 w-9">
                        <Github className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="rounded-full p-2 h-9 w-9">
                        <Linkedin className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="rounded-full p-2 h-9 w-9">
                        <Globe className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-center md:items-end">
                <div className="flex items-center gap-2 mb-2">
                  {renderStars(engineer.rating)}
                  <span className="font-bold text-lg">{engineer.rating.toFixed(1)}</span>
                  <span className="text-muted-foreground">({engineer.reviews.length} reviews)</span>
                </div>
                
                <div className="p-4 bg-primary/10 rounded-lg mb-4 text-center md:text-right">
                  <p className="text-sm text-muted-foreground">Hourly Rate</p>
                  <p className="text-2xl font-bold">${engineer.hourlyRate}/hr</p>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">AI Match</p>
                      <p className="font-bold text-primary">{engineer.matchPercentage}%</p>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" /> Resume
                  </Button>
                </div>
              </div>
            </div>
          </BlurredCard>
          
          <div className="mb-8">
            <Tabs defaultValue="about">
              <TabsList className="grid w-full md:w-auto md:inline-flex grid-cols-4 md:grid-cols-none h-auto">
                <TabsTrigger value="about" className="py-3">
                  <User className="h-4 w-4 mr-2 md:mr-0 md:hidden" />
                  <span className="md:inline">About</span>
                </TabsTrigger>
                <TabsTrigger value="experience" className="py-3">
                  <Briefcase className="h-4 w-4 mr-2 md:mr-0 md:hidden" />
                  <span className="md:inline">Experience</span>
                </TabsTrigger>
                <TabsTrigger value="projects" className="py-3">
                  <Star className="h-4 w-4 mr-2 md:mr-0 md:hidden" />
                  <span className="md:inline">Projects</span>
                </TabsTrigger>
                <TabsTrigger value="reviews" className="py-3">
                  <Star className="h-4 w-4 mr-2 md:mr-0 md:hidden" />
                  <span className="md:inline">Reviews</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="about" className="mt-6 animate-fade-in">
                <BlurredCard>
                  <h2 className="text-xl font-semibold mb-4">About {engineer.name}</h2>
                  <p className="text-muted-foreground mb-8">{engineer.bio}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Languages</h3>
                      <ul className="space-y-3">
                        {engineer.languages.map((language, index) => (
                          <li key={index} className="flex justify-between">
                            <span>{language.name}</span>
                            <span className="text-muted-foreground">{language.level}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Education</h3>
                      <ul className="space-y-4">
                        {engineer.education.map((edu, index) => (
                          <li key={index}>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">{edu.year}</span>
                            </div>
                            <p className="font-medium">{edu.degree}</p>
                            <p className="text-muted-foreground">{edu.institution}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-lg font-medium mb-4">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {engineer.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </BlurredCard>
              </TabsContent>
              
              <TabsContent value="experience" className="mt-6 animate-fade-in">
                <BlurredCard>
                  <h2 className="text-xl font-semibold mb-6">Work Experience</h2>
                  
                  <div className="space-y-8">
                    {engineer.workHistory.map((work, index) => (
                      <div key={index} className="relative pl-8 pb-8 border-l border-border last:border-l-0 last:pb-0">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                        
                        <div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{work.duration}</span>
                          </div>
                          
                          <h3 className="text-lg font-medium mt-1">{work.role}</h3>
                          <p className="text-primary">{work.company}</p>
                          <p className="mt-3 text-muted-foreground">{work.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </BlurredCard>
              </TabsContent>
              
              <TabsContent value="projects" className="mt-6 animate-fade-in">
                <BlurredCard>
                  <h2 className="text-xl font-semibold mb-6">Featured Projects</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {engineer.projects.map((project, index) => (
                      <BlurredCard key={index} className="h-full">
                        <div className="flex justify-between mb-3">
                          <h3 className="text-lg font-medium">{project.name}</h3>
                          {project.link && (
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
                              <a href={project.link} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            </Button>
                          )}
                        </div>
                        
                        <p className="text-muted-foreground mb-4">{project.description}</p>
                        
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, idx) => (
                            <Badge key={idx} variant="outline">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </BlurredCard>
                    ))}
                  </div>
                </BlurredCard>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-6 animate-fade-in">
                <BlurredCard>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">Client Reviews</h2>
                    
                    <div className="flex items-center gap-2">
                      {renderStars(engineer.rating)}
                      <span className="font-bold text-lg">{engineer.rating.toFixed(1)}</span>
                      <span className="text-muted-foreground">({engineer.reviews.length} reviews)</span>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {engineer.reviews.map((review, index) => (
                      <div key={index} className={index < engineer.reviews.length - 1 ? "pb-6 border-b border-border" : ""}>
                        <div className="flex justify-between mb-2">
                          <h3 className="font-medium">{review.name}</h3>
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                        </div>
                        
                        <div className="flex items-center mb-3">
                          {renderStars(review.rating)}
                        </div>
                        
                        <p className="text-muted-foreground">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </BlurredCard>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
