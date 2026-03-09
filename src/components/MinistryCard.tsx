import { Card, CardContent } from "@/components/ui/card";
import { Users, BookOpen, Heart, HandHelping } from "lucide-react";
import type { Ministry } from "@/services/apiService";

const iconMap: Record<string, React.ReactNode> = {
  youth: <Users className="h-8 w-8" />,
  prayer: <Heart className="h-8 w-8" />,
  outreach: <HandHelping className="h-8 w-8" />,
  "bible-study": <BookOpen className="h-8 w-8" />,
};

const MinistryCard = ({ ministry }: { ministry: Ministry }) => (
  <Card className="card-hover border-border/50 text-center group">
    <CardContent className="p-8">
      <div className="w-16 h-16 rounded-full bg-gold-light flex items-center justify-center mx-auto mb-5 text-accent group-hover:scale-110 transition-transform">
        {iconMap[ministry.slug] || <Users className="h-8 w-8" />}
      </div>
      <h3 className="font-heading text-xl font-semibold text-foreground mb-2">{ministry.name}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{ministry.description}</p>
    </CardContent>
  </Card>
);

export default MinistryCard;
