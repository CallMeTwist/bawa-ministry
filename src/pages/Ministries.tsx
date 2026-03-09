import { useEffect, useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import SectionHeader from "@/components/SectionHeader";
import MinistryCard from "@/components/MinistryCard";
import { getMinistries } from "@/services/apiService";
import type { Ministry } from "@/services/apiService";

const Ministries = () => {
  const [ministries, setMinistries] = useState<Ministry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getMinistries()
      .then((res) => setMinistries(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <MainLayout>
      <div className="page-container">
        <SectionHeader
          label="Get Involved"
          title="Our Ministries"
          subtitle="Find your place to serve and grow in our church community."
        />

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="rounded-xl bg-muted animate-pulse h-52" />
            ))}
          </div>
        )}

        {error && (
          <p className="text-center text-muted-foreground py-20">
            Unable to load ministries. Please try again later.
          </p>
        )}

        {!loading && !error && ministries.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ministries.map((m) => (
              <MinistryCard key={m.id} ministry={m} />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Ministries;