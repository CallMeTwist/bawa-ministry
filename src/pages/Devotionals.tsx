import { useEffect, useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import SectionHeader from "@/components/SectionHeader";
import DevotionalCard from "@/components/DevotionalCard";
import { getDevotionals } from "@/services/apiService";
import type { Devotional } from "@/services/apiService";

const Devotionals = () => {
  const [devotionals, setDevotionals] = useState<Devotional[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getDevotionals()
      .then((res) => setDevotionals(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <MainLayout>
      <div className="page-container">
        <SectionHeader
          label="Daily Inspiration"
          title="Devotionals"
          subtitle="Grow deeper in your faith with our daily devotional reflections."
        />

        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-xl bg-muted animate-pulse h-56" />
            ))}
          </div>
        )}

        {error && (
          <p className="text-center text-muted-foreground py-20">
            Unable to load devotionals. Please try again later.
          </p>
        )}

        {!loading && !error && devotionals.length === 0 && (
          <p className="text-center text-muted-foreground py-20">
            No devotionals published yet.
          </p>
        )}

        {!loading && !error && devotionals.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {devotionals.map((d) => (
              <DevotionalCard key={d.id} devotional={d} />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Devotionals;
