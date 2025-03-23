
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import BlurredCard from "@/components/ui/BlurredCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string(),
  role: z.enum(["hire", "work"]),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<"hire" | "work">("work");
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "work",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log("Signup with:", { ...values, role: selectedRole });
      // In a real implementation, this would connect to your auth service
      
      // Mock successful registration for demonstration
      toast({
        title: "Account created successfully",
        description: "Welcome to FoundYou! Let's complete your profile.",
      });
      
      // Navigate to onboarding after signup
      setTimeout(() => navigate("/onboarding"), 1000);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: "Please try again with different credentials.",
      });
    }
  };

  const handleRoleChange = (value: string) => {
    setSelectedRole(value as "hire" | "work");
    form.setValue("role", value as "hire" | "work");
  };

  return (
    <div 
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1559251606-c623743a6d76?q=80&w=2070&auto=format&fit=crop')" }}
    >
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center pt-20 px-4">
        <BlurredCard className="w-full max-w-md backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 shadow-xl">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">Create Your Account</h1>
            <p className="text-muted-foreground">Join the FoundYou community</p>
          </div>
          
          <Tabs value={selectedRole} onValueChange={handleRoleChange} className="mb-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="work">Looking for Work</TabsTrigger>
              <TabsTrigger value="hire">Looking to Hire</TabsTrigger>
            </TabsList>
            <TabsContent value="work" className="mt-4">
              <p className="text-sm text-muted-foreground">
                Create an engineer profile, showcase your skills, and find great projects.
              </p>
            </TabsContent>
            <TabsContent value="hire" className="mt-4">
              <p className="text-sm text-muted-foreground">
                Post projects, find talented engineers, and manage your team efficiently.
              </p>
            </TabsContent>
          </Tabs>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="you@example.com" 
                        type="email" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          placeholder="Create a password" 
                          type={showPassword ? "text" : "password"} 
                          {...field} 
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Confirm your password" 
                        type={showPassword ? "text" : "password"} 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="pt-2">
                <Button type="submit" className="w-full gap-2">
                  <UserPlus className="h-4 w-4" />
                  Create Account
                </Button>
              </div>
            </form>
          </Form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </BlurredCard>
      </div>
    </div>
  );
};

export default Signup;
