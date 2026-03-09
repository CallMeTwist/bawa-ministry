import MainLayout from "@/layouts/MainLayout";
import SectionHeader from "@/components/SectionHeader";
import DevotionalCard from "@/components/DevotionalCard";
import { mockDevotionals } from "@/services/apiService";

const Devotionals = () => (
  <MainLayout>
    <div className="page-container">
      <SectionHeader label="Daily Inspiration" title="Devotionals" subtitle="Grow deeper in your faith with our daily devotional reflections." />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockDevotionals.map((d) => (
          <DevotionalCard key={d.id} devotional={d} />
        ))}
      </div>
    </div>
  </MainLayout>
);

export default Devotionals;
