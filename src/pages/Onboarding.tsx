
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ArrowRight, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import BlurredCard from "@/components/ui/BlurredCard";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

// Mock user data (in a real app this would come from auth context)
const mockUser = {
  name: "John Doe",
  email: "john@example.com",
  role: "work" as const, // "work" or "hire"
};

const engineerFormSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters" }),
  expertise: z.string().min(2, { message: "Please select your expertise" }),
  bio: z.string().min(10, { message: "Bio must be at least 10 characters" }).max(300, { message: "Bio must be less than 300 characters" }),
  skills: z.string().min(3, { message: "Please list at least one skill" }),
  hourlyRate: z.string().min(1, { message: "Please enter your hourly rate" }),
  experienceLevel: z.string().min(1, { message: "Please select your experience level" }),
});

const clientFormSchema = z.object({
  companyName: z.string().min(2, { message: "Company name must be at least 2 characters" }),
  industry: z.string().min(2, { message: "Please select your industry" }),
  bio: z.string().min(10, { message: "Bio must be at least 10 characters" }).max(300, { message: "Bio must be less than 300 characters" }),
  projectTypes: z.string().min(3, { message: "Please list types of projects you're interested in" }),
  teamSize: z.string().min(1, { message: "Please select your team size" }),
});

const Onboarding = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userRole] = useState(mockUser.role);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  
  const engineerForm = useForm<z.infer<typeof engineerFormSchema>>({
    resolver: zodResolver(engineerFormSchema),
    defaultValues: {
      title: "",
      expertise: "",
      bio: "",
      skills: "",
      hourlyRate: "",
      experienceLevel: "",
    },
  });

  const clientForm = useForm<z.infer<typeof clientFormSchema>>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      companyName: "",
      industry: "",
      bio: "",
      projectTypes: "",
      teamSize: "",
    },
  });

  const handleEngineerSubmit = (values: z.infer<typeof engineerFormSchema>) => {
    console.log("Engineer profile data:", values);
    
    // Mock successful profile creation
    toast({
      title: "Profile created successfully",
      description: "Your engineer profile is now live!",
    });
    
    // Navigate to dashboard/profile
    setTimeout(() => navigate("/profile/me"), 1000);
  };

  const handleClientSubmit = (values: z.infer<typeof clientFormSchema>) => {
    console.log("Client profile data:", values);
    
    // Mock successful profile creation
    toast({
      title: "Profile created successfully",
      description: "Your client profile is now live!",
    });
    
    // Navigate to dashboard
    setTimeout(() => navigate("/dashboard"), 1000);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setPhotoPreview(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1491895200222-0fc4a4c35e18?q=80&w=2874&auto=format&fit=crop')" }}
    >
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center pt-20 pb-10 px-4">
        <BlurredCard className="w-full max-w-2xl backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 shadow-xl">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold">Complete Your Profile</h1>
            <p className="text-muted-foreground">
              {userRole === "work" 
                ? "Tell us about your skills and expertise" 
                : "Tell us about your company and what you're looking for"}
            </p>
          </div>
          
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="h-24 w-24 rounded-full bg-muted-foreground/20 flex items-center justify-center overflow-hidden">
                {photoPreview ? (
                  <img 
                    src={photoPreview} 
                    alt="Profile preview" 
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-2xl text-muted-foreground">
                    {mockUser.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <label 
                htmlFor="profile-photo" 
                className="absolute -bottom-2 -right-2 h-8 w-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center cursor-pointer shadow-md hover:bg-primary/90 transition-colors"
              >
                <Upload className="h-4 w-4" />
              </label>
              <input 
                id="profile-photo" 
                type="file" 
                accept="image/*" 
                className="sr-only" 
                onChange={handlePhotoChange}
              />
            </div>
          </div>
          
          {userRole === "work" ? (
            <Form {...engineerForm}>
              <form onSubmit={engineerForm.handleSubmit(handleEngineerSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={engineerForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Professional Title</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Senior Frontend Developer" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={engineerForm.control}
                    name="expertise"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Main Expertise</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your main expertise" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="frontend">Frontend Development</SelectItem>
                            <SelectItem value="backend">Backend Development</SelectItem>
                            <SelectItem value="fullstack">Full Stack Development</SelectItem>
                            <SelectItem value="mobile">Mobile Development</SelectItem>
                            <SelectItem value="devops">DevOps</SelectItem>
                            <SelectItem value="ai">AI/Machine Learning</SelectItem>
                            <SelectItem value="data">Data Science</SelectItem>
                            <SelectItem value="blockchain">Blockchain</SelectItem>
                            <SelectItem value="design">UI/UX Design</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={engineerForm.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Professional Bio</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell clients about yourself, your experience, and what you're passionate about..." 
                          className="min-h-[120px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        This will appear on your profile and in search results.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={engineerForm.control}
                  name="skills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Skills</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g. React, Node.js, TypeScript, AWS (comma separated)" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        List your key skills separated by commas.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={engineerForm.control}
                    name="hourlyRate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hourly Rate (USD)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="e.g. 50" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={engineerForm.control}
                    name="experienceLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Experience Level</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your experience level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                            <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
                            <SelectItem value="senior">Senior (5-8 years)</SelectItem>
                            <SelectItem value="lead">Lead/Architect (8+ years)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <Button type="submit" className="w-full gap-2">
                  Complete Profile
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            </Form>
          ) : (
            <Form {...clientForm}>
              <form onSubmit={clientForm.handleSubmit(handleClientSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={clientForm.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Acme Inc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={clientForm.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Industry</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your industry" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="tech">Technology</SelectItem>
                            <SelectItem value="finance">Finance</SelectItem>
                            <SelectItem value="healthcare">Healthcare</SelectItem>
                            <SelectItem value="education">Education</SelectItem>
                            <SelectItem value="ecommerce">E-commerce</SelectItem>
                            <SelectItem value="media">Media & Entertainment</SelectItem>
                            <SelectItem value="manufacturing">Manufacturing</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={clientForm.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell engineers about your company, projects, and work culture..." 
                          className="min-h-[120px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        This will appear on your company profile and job postings.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={clientForm.control}
                  name="projectTypes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Types</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g. Web Applications, Mobile Apps, Data Science (comma separated)" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        What kind of projects do you typically need help with?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={clientForm.control}
                  name="teamSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Team Size</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your team size" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="solo">Solo Founder</SelectItem>
                          <SelectItem value="small">Small (2-10 employees)</SelectItem>
                          <SelectItem value="medium">Medium (11-50 employees)</SelectItem>
                          <SelectItem value="large">Large (51-200 employees)</SelectItem>
                          <SelectItem value="enterprise">Enterprise (201+ employees)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full gap-2">
                  Complete Profile
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            </Form>
          )}
        </BlurredCard>
      </div>
    </div>
  );
};

export default Onboarding;
