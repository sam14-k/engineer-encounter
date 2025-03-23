
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Slider
} from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import BlurredCard from "@/components/ui/BlurredCard";
import { Search, Sliders, X } from "lucide-react";
import { useState } from "react";

const skillOptions = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "Django",
  "Flask",
  "Ruby",
  "Rails",
  "Go",
  "Rust",
  "Java",
  "Spring",
  "C#",
  ".NET",
  "PHP",
  "Laravel",
  "Vue.js",
  "Angular",
  "AWS",
  "Azure",
  "GCP",
  "Docker",
  "Kubernetes",
  "GraphQL",
  "REST API",
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "Redis",
  "Firebase",
  "Supabase",
  "TensorFlow",
  "PyTorch",
  "Machine Learning",
  "AI",
  "DevOps",
  "Mobile Development",
  "Android",
  "iOS",
  "React Native",
  "Flutter",
];

interface SearchInterfaceProps {
  onSearch: (filters: any) => void;
}

const SearchInterface = ({ onSearch }: SearchInterfaceProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [hourlyRateRange, setHourlyRateRange] = useState([30, 150]);
  const [availability, setAvailability] = useState("");
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const handleAddSkill = (skill: string) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill));
  };

  const handleSearch = () => {
    onSearch({
      query,
      skills: selectedSkills,
      hourlyRateRange,
      availability,
      verifiedOnly,
    });
  };

  const handleReset = () => {
    setQuery("");
    setSelectedSkills([]);
    setHourlyRateRange([30, 150]);
    setAvailability("");
    setVerifiedOnly(false);
  };

  return (
    <BlurredCard className="w-full">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for engineers by name, skills, or expertise..."
            className="pl-10"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
            className={showFilters ? "bg-primary/10" : ""}
          >
            <Sliders className="h-4 w-4" />
          </Button>
          <Button className="px-6" onClick={handleSearch}>
            Search
          </Button>
        </div>
      </div>

      {showFilters && (
        <div className="mt-6 pt-6 border-t border-border animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <Label>Skills</Label>
              <Select onValueChange={handleAddSkill}>
                <SelectTrigger>
                  <SelectValue placeholder="Add skills" />
                </SelectTrigger>
                <SelectContent>
                  {skillOptions
                    .filter((skill) => !selectedSkills.includes(skill))
                    .map((skill) => (
                      <SelectItem key={skill} value={skill}>
                        {skill}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedSkills.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center gap-1 bg-secondary px-3 py-1 rounded-full text-sm"
                  >
                    <span>{skill}</span>
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-destructive"
                      onClick={() => handleRemoveSkill(skill)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Hourly Rate Range ($/hr)</Label>
                <div className="flex items-center justify-between mt-2 mb-4">
                  <span className="text-sm">${hourlyRateRange[0]}</span>
                  <span className="text-sm">${hourlyRateRange[1]}</span>
                </div>
                <Slider
                  defaultValue={[30, 150]}
                  min={10}
                  max={300}
                  step={5}
                  value={hourlyRateRange}
                  onValueChange={(value: number[]) => setHourlyRateRange(value)}
                />
              </div>

              <div>
                <Label>Availability</Label>
                <Select value={availability} onValueChange={setAvailability}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Any availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any availability</SelectItem>
                    <SelectItem value="Immediate">Immediate</SelectItem>
                    <SelectItem value="Within 1 week">Within 1 week</SelectItem>
                    <SelectItem value="Within 2 weeks">Within 2 weeks</SelectItem>
                    <SelectItem value="Within a month">Within a month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="verified"
                  checked={verifiedOnly}
                  onCheckedChange={(checked) => setVerifiedOnly(checked === true)}
                />
                <Label htmlFor="verified">Verified engineers only</Label>
              </div>

              <div className="pt-4 flex justify-end">
                <Button variant="outline" onClick={handleReset} className="mr-2">
                  Reset Filters
                </Button>
                <Button onClick={handleSearch}>Apply Filters</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </BlurredCard>
  );
};

export default SearchInterface;
