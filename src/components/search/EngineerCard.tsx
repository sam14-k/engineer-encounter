
import BlurredCard from "@/components/ui/BlurredCard";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Star, Clock, CheckCircle, BrainCircuit } from "lucide-react";
import { Link } from "react-router-dom";

export interface EngineerData {
  id: string;
  name: string;
  title: string;
  avatar: string;
  rating: number;
  hourlyRate: number;
  skills: string[];
  matchPercentage: number;
  availability: string;
  verified: boolean;
}

interface EngineerCardProps {
  data: EngineerData;
  featured?: boolean;
  className?: string;
}

const EngineerCard = ({ data, featured = false, className = "" }: EngineerCardProps) => {
  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < Math.floor(rating) 
              ? "text-yellow-400 fill-yellow-400" 
              : i < rating 
                ? "text-yellow-400 fill-yellow-400 opacity-50" 
                : "text-gray-300"
          }`}
        />
      ));
  };

  return (
    <BlurredCard 
      className={`h-full flex flex-col ${featured ? 'border-primary/30 shadow-lg shadow-primary/5' : ''} ${className}`}
      hoverEffect
    >
      {featured && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white text-xs px-3 py-1 rounded-full">
          Top Match
        </div>
      )}
      
      <div className="flex items-start gap-4">
        <img
          src={data.avatar}
          alt={data.name}
          className="w-16 h-16 rounded-lg object-cover"
          loading="lazy"
        />
        
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">{data.name}</h3>
            {data.verified && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Verified Engineer</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          
          <p className="text-sm text-muted-foreground">{data.title}</p>
          
          <div className="flex items-center gap-1 mt-1">
            {renderStars(data.rating)}
            <span className="text-sm ml-1">{data.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-4 mt-6">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground">Hourly Rate</p>
          <p className="font-semibold">${data.hourlyRate}/hr</p>
        </div>
        
        <div className="flex-1">
          <p className="text-sm text-muted-foreground">Availability</p>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-green-500" />
            <p className="font-semibold text-green-600">{data.availability}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <p className="text-sm text-muted-foreground mb-2">Skills</p>
        <div className="flex flex-wrap gap-2">
          {data.skills.slice(0, 3).map((skill, index) => (
            <Badge key={index} variant="secondary" className="font-normal">
              {skill}
            </Badge>
          ))}
          {data.skills.length > 3 && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Badge variant="outline" className="font-normal">
                    +{data.skills.length - 3} more
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="flex flex-wrap gap-1 max-w-xs">
                    {data.skills.slice(3).map((skill, index) => (
                      <Badge key={index} variant="secondary" className="font-normal">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BrainCircuit className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">AI Match</span>
          </div>
          <div className="flex items-center">
            <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full"
                style={{ width: `${data.matchPercentage}%` }}
              ></div>
            </div>
            <span className="ml-2 text-sm font-medium">{data.matchPercentage}%</span>
          </div>
        </div>
        
        <div className="flex gap-3 mt-auto">
          <Button size="sm" variant="outline" className="flex-1 gap-2">
            <MessageSquare className="h-4 w-4" /> Message
          </Button>
          <Button size="sm" className="flex-1" asChild>
            <Link to={`/profile/${data.id}`}>View Profile</Link>
          </Button>
        </div>
      </div>
    </BlurredCard>
  );
};

export default EngineerCard;
