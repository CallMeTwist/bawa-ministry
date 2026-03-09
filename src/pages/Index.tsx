import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Play, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import MainLayout from "@/layouts/MainLayout";
import DailyVerse from "@/components/DailyVerse";
import SectionHeader from "@/components/SectionHeader";
import DevotionalCard from "@/components/DevotionalCard";
import EventCard from "@/components/EventCard";
import MinistryCard from "@/components/MinistryCard";
import NewsletterSignup from "@/components/NewsletterSignup";
import heroImage from "@/assets/hero-church.jpg";
import { getDevotionals, getEvents, getMinistries } from "@/services/apiService";
import type { Devotional, ChurchEvent, Ministry } from "@/services/apiService";

const Index = () => {
  const [devotionals, setDevotionals] = useState<Devotional[]>([]);
  const [events, setEvents] = useState<ChurchEvent[]>([]);
  const [ministries, setMinistries] = useState<Ministry[]>([]);

  useEffect(() => {
    getDevotionals().then((res) => setDevotionals(res.data.slice(0, 3))).catch(() => {});
    getEvents().then((res) => setEvents(res.data.slice(0, 4))).catch(() => {});
    getMinistries().then((res) => setMinistries(res.data)).catch(() => {});
  }, []);

  return (
    <MainLayout>

      {/* Hero */}
      <section className="relative overflow-hidden min-h-[85vh] flex items-center">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroImage})` }} />
        <div className="absolute inset-0 gradient-navy opacity-75" />
        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <p className="text-accent font-body text-sm font-semibold tracking-widest uppercase mb-4 animate-fade-in">
            Welcome to Grace Church
          </p>
          <h1
            className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold leading-tight max-w-4xl mx-auto mb-6 animate-fade-in"
            style={{ color: "hsl(var(--primary-foreground))", animationDelay: "0.1s" }}
          >
            A Place of Faith, Hope & Love
          </h1>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-fade-in"
            style={{ color: "hsl(var(--primary-foreground) / 0.85)", animationDelay: "0.2s" }}
          >
            Join our community as we grow together in Christ through worship, fellowship, and service.
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Button
              asChild size="lg"
              className="gradient-gold font-semibold text-base"
              style={{ color: "hsl(var(--primary))" }}
            >
              <Link to="/devotionals">
                <BookOpen className="mr-2 h-4 w-4" /> Today's Devotional
              </Link>
            </Button>
            <Button
              asChild size="lg" variant="outline"
              className="border-primary-foreground/30 font-semibold text-base bg-transparent hover:bg-primary-foreground/10"
              style={{ color: "hsl(var(--primary-foreground))" }}
            >
              <Link to="/sermons">
                <Play className="mr-2 h-4 w-4" /> Watch Sermons
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Daily Verse — already handles its own fetch internally */}
      <DailyVerse />

      {/* Latest Devotionals */}
      <section className="page-container">
        <SectionHeader
          label="Daily Inspiration"
          title="Latest Devotionals"
          subtitle="Nourish your soul with daily reflections on God's Word."
        />

        {devotionals.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="rounded-xl bg-muted animate-pulse h-56" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {devotionals.map((d) => (
              <DevotionalCard key={d.id} devotional={d} />
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Button
            asChild variant="outline"
            className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
          >
            <Link to="/devotionals">
              View All Devotionals <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="bg-secondary">
        <div className="page-container">
          <SectionHeader
            label="Upcoming"
            title="Events & Gatherings"
            subtitle="Join us for worship, fellowship, and community events."
          />

          {events.length === 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="rounded-xl bg-muted animate-pulse h-32" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {events.map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <Button
              asChild variant="outline"
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
            >
              <Link to="/events">
                View All Events <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Ministries */}
      <section className="page-container">
        <SectionHeader
          label="Get Involved"
          title="Our Ministries"
          subtitle="Find your place to serve and grow in our church community."
        />

        {ministries.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="rounded-xl bg-muted animate-pulse h-52" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ministries.map((m) => (
              <MinistryCard key={m.id} ministry={m} />
            ))}
          </div>
        )}
      </section>

      {/* Newsletter */}
      <NewsletterSignup />

    </MainLayout>
  );
};

export default Index;