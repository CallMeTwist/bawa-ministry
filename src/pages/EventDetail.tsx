import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin, Clock, Share2, Tag, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import MainLayout from "@/layouts/MainLayout";
import EventCard from "@/components/EventCard";
import { getEventById, getEvents } from "@/services/apiService";
import type { ChurchEvent } from "@/services/apiService";

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent]             = useState<ChurchEvent | null>(null);
  const [otherEvents, setOtherEvents] = useState<ChurchEvent[]>([]);
  const [loading, setLoading]         = useState(true);
  const [notFound, setNotFound]       = useState(false);

  useEffect(() => {
    if (!id) return;
    Promise.all([getEventById(Number(id)), getEvents()])
      .then(([eventRes, eventsRes]) => {
        setEvent(eventRes.data);
        setOtherEvents(eventsRes.data.filter((e) => e.id !== Number(id)).slice(0, 3));
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <MainLayout>
        <div className="page-container max-w-4xl mx-auto space-y-6">
          <div className="h-80 bg-muted rounded-2xl animate-pulse" />
          <div className="h-32 bg-muted rounded-xl animate-pulse" />
          <div className="h-40 bg-muted rounded-xl animate-pulse" />
        </div>
      </MainLayout>
    );
  }

  if (notFound || !event) {
    return (
      <MainLayout>
        <div className="page-container text-center">
          <h1 className="section-heading mb-4">Event Not Found</h1>
          <Button asChild variant="outline">
            <Link to="/events">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Events
            </Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  const dateObj    = new Date(event.date);
  const endDateObj = event.end_date ? new Date(event.end_date) : null;

  const formattedDate = endDateObj
    ? `${dateObj.toLocaleDateString("en", { month: "long", day: "numeric" })} – ${endDateObj.toLocaleDateString("en", { month: "long", day: "numeric", year: "numeric" })}`
    : dateObj.toLocaleDateString("en", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  return (
    <MainLayout>
      <div className="page-container max-w-4xl mx-auto">

        <Link
          to="/events"
          className="inline-flex items-center gap-1 text-accent text-sm font-medium mb-8 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Events
        </Link>

        {/* Hero banner */}
        <div className="relative rounded-2xl overflow-hidden mb-10">
          {event.image ? (
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-64 md:h-80 object-cover"
            />
          ) : (
            <div className="w-full h-64 md:h-80 bg-gradient-to-br from-primary via-primary/80 to-accent/60" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-end p-8 md:p-12 text-center">
            <div className="inline-flex items-center gap-2 bg-background/80 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent mb-6">
              <Calendar className="h-3.5 w-3.5" />
              {formattedDate}
            </div>
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
              {event.title}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-accent" /> {event.location}
              </span>
              {event.time && (
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-accent" /> {event.time}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="prose-custom font-body text-foreground/90 leading-relaxed text-base md:text-lg mb-10">
          <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">About This Event</h2>
          <p>{event.description}</p>
          <p className="mt-4">
            Join us for this special gathering as we come together as a church family.
            Whether you're a long-time member or visiting for the first time, you are
            warmly welcome. Come expecting to be blessed, encouraged, and refreshed in
            the presence of the Lord.
          </p>
        </div>

        {/* Details card */}
        <div className="bg-secondary rounded-xl p-6 md:p-8 mb-10 grid sm:grid-cols-3 gap-6">
          <div className="text-center">
            <Calendar className="h-6 w-6 text-accent mx-auto mb-2" />
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Date</p>
            <p className="font-heading font-semibold text-foreground">
              {dateObj.toLocaleDateString("en", { month: "long", day: "numeric", year: "numeric" })}
            </p>
          </div>
          <div className="text-center">
            <MapPin className="h-6 w-6 text-accent mx-auto mb-2" />
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Location</p>
            <p className="font-heading font-semibold text-foreground">{event.location}</p>
          </div>
          <div className="text-center">
            <Clock className="h-6 w-6 text-accent mx-auto mb-2" />
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Time</p>
            <p className="font-heading font-semibold text-foreground">
              {event.time ? event.time : "See event details"}
            </p>
          </div>
        </div>

        {/* Category badge */}
        {event.category && (
          <div className="flex items-center gap-2 mb-6">
            <Tag className="h-4 w-4 text-accent" />
            <span className="text-sm text-muted-foreground capitalize">{event.category}</span>
          </div>
        )}

        {/* Registration CTA */}
        {event.registration_url && (
          <div className="bg-gold-light rounded-xl p-6 md:p-8 mb-10 text-center">
            <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
              Registration Required
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              Please register in advance to secure your spot for this event.
            </p>
            <Button asChild>
              <a href={event.registration_url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" /> Register Now
              </a>
            </Button>
          </div>
        )}

        {/* Share */}
        <div className="flex items-center gap-3 pt-6 border-t border-border mb-12">
          <span className="text-sm text-muted-foreground">Share this event:</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigator.share?.({ title: event.title, url: window.location.href })}
          >
            <Share2 className="h-4 w-4 mr-1" /> Share
          </Button>
        </div>

        {/* Other events */}
        {otherEvents.length > 0 && (
          <div>
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-6">
              Other Upcoming Events
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {otherEvents.map((e) => (
                <Link to={`/events/${e.id}`} key={e.id}>
                  <EventCard event={e} />
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </MainLayout>
  );
};

export default EventDetail;