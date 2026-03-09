import MainLayout from "@/layouts/MainLayout";
import SectionHeader from "@/components/SectionHeader";
import MinistryCard from "@/components/MinistryCard";
import { mockMinistries } from "@/services/apiService";
import { Link } from "react-router-dom";

const Ministries = () => (
  <MainLayout>
    <div className="page-container">
      <SectionHeader label="Get Involved" title="Our Ministries" subtitle="Find your place to serve and grow in our church community." />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockMinistries.map((m) => (
          <Link to={`/ministries/${m.slug}`} key={m.id}>
            <MinistryCard ministry={m} />
          </Link>
        ))}
      </div>
    </div>
  </MainLayout>
);

export default Ministries;
