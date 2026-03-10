import { Link } from "react-router-dom";
import { Calendar, User, BookOpen, ArrowRight, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Devotional } from "@/services/apiService";

const DevotionalCard = ({ devotional }: { devotional: Devotional }) => (
  <Card className="card-hover border-border/50">
    <CardContent className="p-6">

      {/* Scripture reference badges */}
      <div className="flex flex-wrap items-center gap-1.5 mb-3">
        <BookOpen className="h-4 w-4 text-accent shrink-0" />
        {devotional.scripture_reference.map((ref) => (
          <span
            key={ref}
            className="scripture-reference text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full border border-accent/20"
          >
            {ref}
          </span>
        ))}
      </div>

      <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
        {devotional.title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
        {devotional.excerpt}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><User className="h-3 w-3" />{devotional.author}</span>
          <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(devotional.date).toLocaleDateString()}</span>
          
        </div>
        <span className="flex items-center gap-1">
          <Eye className="h-3 w-3" />
          {(devotional.views ?? 0).toLocaleString()}
        </span>
        <Link
          to={`/devotionals/${devotional.slug}`}
          className="text-accent text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all"
        >
          Read <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </CardContent>
  </Card>
);

export default DevotionalCard;
