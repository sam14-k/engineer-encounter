
import Navbar from "@/components/layout/Navbar";
import SearchInterface from "@/components/search/SearchInterface";
import EngineerCard, { EngineerData } from "@/components/search/EngineerCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, SlidersHorizontal } from "lucide-react";
import { useState, useEffect } from "react";

// Mock data for engineers
const mockEngineers: EngineerData[] = [
  {
    id: "1",
    name: "Alex Johnson",
    title: "Senior Frontend Developer",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4.9,
    hourlyRate: 85,
    skills: ["React", "TypeScript", "Next.js", "TailwindCSS", "GraphQL"],
    matchPercentage: 98,
    availability: "Immediate",
    verified: true,
  },
  {
    id: "2",
    name: "Sarah Chen",
    title: "Full Stack Engineer",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4.8,
    hourlyRate: 95,
    skills: ["Node.js", "React", "MongoDB", "AWS", "Docker"],
    matchPercentage: 92,
    availability: "Within 1 week",
    verified: true,
  },
  {
    id: "3",
    name: "Miguel Rodriguez",
    title: "Backend Developer",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg",
    rating: 4.7,
    hourlyRate: 80,
    skills: ["Python", "Django", "PostgreSQL", "Redis", "RabbitMQ"],
    matchPercentage: 85,
    availability: "Within 2 weeks",
    verified: false,
  },
  {
    id: "4",
    name: "Priya Sharma",
    title: "DevOps Engineer",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 4.9,
    hourlyRate: 110,
    skills: ["Kubernetes", "Docker", "AWS", "Terraform", "CI/CD"],
    matchPercentage: 89,
    availability: "Immediate",
    verified: true,
  },
  {
    id: "5",
    name: "David Wilson",
    title: "Mobile Developer",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    rating: 4.6,
    hourlyRate: 75,
    skills: ["React Native", "Swift", "Kotlin", "Firebase", "Redux"],
    matchPercentage: 82,
    availability: "Within 1 week",
    verified: true,
  },
  {
    id: "6",
    name: "Emma Thompson",
    title: "UI/UX Designer & Developer",
    avatar: "https://randomuser.me/api/portraits/women/29.jpg",
    rating: 4.8,
    hourlyRate: 90,
    skills: ["Figma", "React", "CSS", "User Research", "Prototyping"],
    matchPercentage: 94,
    availability: "Immediate",
    verified: true,
  },
  {
    id: "7",
    name: "Omar Hassan",
    title: "Machine Learning Engineer",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
    rating: 4.7,
    hourlyRate: 130,
    skills: ["Python", "TensorFlow", "PyTorch", "Data Science", "NLP"],
    matchPercentage: 78,
    availability: "Within a month",
    verified: false,
  },
  {
    id: "8",
    name: "Lisa Wang",
    title: "Blockchain Developer",
    avatar: "https://randomuser.me/api/portraits/women/79.jpg",
    rating: 4.5,
    hourlyRate: 120,
    skills: ["Solidity", "Ethereum", "Web3.js", "Smart Contracts", "DeFi"],
    matchPercentage: 76,
    availability: "Within 2 weeks",
    verified: true,
  },
  {
    id: "9",
    name: "James Smith",
    title: "System Architect",
    avatar: "https://randomuser.me/api/portraits/men/41.jpg",
    rating: 4.9,
    hourlyRate: 140,
    skills: ["System Design", "Cloud Architecture", "AWS", "Microservices", "Serverless"],
    matchPercentage: 90,
    availability: "Within 1 week",
    verified: true,
  },
];

const Search = () => {
  const [engineers, setEngineers] = useState<EngineerData[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(3); // Mock pagination
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setEngineers(mockEngineers);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (filters: any) => {
    console.log("Search filters:", filters);
    // In a real app, this would make an API call with the filters
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // For demo, we're just reshowing the same data
      // but in a real app this would filter based on the criteria
      setEngineers(mockEngineers);
      setLoading(false);
    }, 800);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setLoading(true);
    
    // Simulate API call for pagination
    setTimeout(() => {
      // For demo, we're just reshowing the same data
      setLoading(false);
    }, 500);
  };

  const renderSkeletons = () => {
    return Array(6)
      .fill(0)
      .map((_, i) => (
        <div key={i} className="h-[300px] rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse shimmer"></div>
      ));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container px-6 mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Find Engineers</h1>
            <p className="text-muted-foreground max-w-3xl">
              Discover top engineering talent matched perfectly to your project requirements. 
              Use our AI-powered search to filter by skills, availability, and more.
            </p>
          </div>
          
          <div className="mb-8">
            <SearchInterface onSearch={handleSearch} />
          </div>
          
          <div className="md:hidden mb-6">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
            >
              <SlidersHorizontal className="h-4 w-4" />
              {showMobileFilters ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading
              ? renderSkeletons()
              : engineers.map((engineer, index) => (
                  <EngineerCard
                    key={engineer.id}
                    data={engineer}
                    featured={index === 0}
                  />
                ))}
          </div>
          
          <div className="mt-12 flex justify-center">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </Button>
              ))}
              
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Search;
