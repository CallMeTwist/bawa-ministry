import { Calendar, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { ChurchEvent } from "@/services/apiService";

const stripHtml = (html: string): string =>
  html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

const EventCard = ({ event }: { event: ChurchEvent }) => {
  // const dateObj = new Date(event.date);

  const dateObj = new Date(event.date + 'T00:00:00');

  return (
    <Card className="card-hover border-border/50 overflow-hidden">
      <CardContent className="p-0 flex flex-col sm:flex-row">
        <div className="gradient-gold text-center p-5 sm:w-28 flex flex-col items-center justify-center shrink-0">
          <span className="text-3xl font-heading font-bold" style={{ color: 'hsl(var(--primary))' }}>
            {dateObj.getDate()}
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'hsl(var(--primary))' }}>
            {dateObj.toLocaleDateString('en', { month: 'short' })}
          </span>
        </div>
        <div className="p-5 flex-1">
          <h3 className="font-heading text-lg font-semibold text-foreground mb-1">{event.title}</h3>
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
            {event.description ? stripHtml(event.description) : ""}
          </p>
          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3 text-accent" />{dateObj.toLocaleDateString()}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3 text-accent" />{event.location}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;