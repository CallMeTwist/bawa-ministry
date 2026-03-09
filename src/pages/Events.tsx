import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import SectionHeader from "@/components/SectionHeader";
import EventCard from "@/components/EventCard";
import { getEvents } from "@/services/apiService";
import type { ChurchEvent } from "@/services/apiService";

const Events = () => {
  const [events, setEvents]   = useState<ChurchEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(false);

  useEffect(() => {
    getEvents()
      .then((res) => setEvents(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <MainLayout>
      <div className="page-container">
        <SectionHeader
          label="Upcoming"
          title="Events & Gatherings"
          subtitle="Join us for worship, fellowship, and community events."
        />

        {loading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="rounded-xl bg-muted animate-pulse h-32" />
            ))}
          </div>
        )}

        {error && (
          <p className="text-center text-muted-foreground py-20">
            Unable to load events. Please try again later.
          </p>
        )}

        {!loading && !error && events.length === 0 && (
          <p className="text-center text-muted-foreground py-20">
            No upcoming events at the moment. Check back soon.
          </p>
        )}

        {!loading && !error && events.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {events.map((e) => (
              <Link to={`/events/${e.id}`} key={e.id} className="block">
                <EventCard event={e} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Events;