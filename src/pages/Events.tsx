import MainLayout from "@/layouts/MainLayout";
import SectionHeader from "@/components/SectionHeader";
import EventCard from "@/components/EventCard";
import { mockEvents } from "@/services/apiService";
import { Link } from "react-router-dom";

const Events = () => (
  <MainLayout>
    <div className="page-container">
      <SectionHeader label="Upcoming" title="Events & Gatherings" subtitle="Join us for worship, fellowship, and community events." />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {mockEvents.map((e) => (
          <Link to={`/events/${e.id}`} key={e.id}>
            <EventCard event={e} />
          </Link>
        ))}
      </div>
    </div>
  </MainLayout>
);

export default Events;
