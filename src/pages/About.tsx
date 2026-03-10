import { useEffect, useState } from "react";
import { Heart, Eye, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import MainLayout from "@/layouts/MainLayout";
import SectionHeader from "@/components/SectionHeader";
import { getTeamMembers } from "@/services/apiService";
import type { TeamMember } from "@/services/apiService";

const About = () => {
  const [team, setTeam]     = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTeamMembers()
      .then((res) => setTeam(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <MainLayout>
      <div className="page-container">
        <SectionHeader
          label="Our Story"
          title="About Grace Church"
          subtitle="A community built on faith, love, and service since 1995."
        />

        {/* Story */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <p className="text-foreground/80 leading-relaxed text-lg">
            Grace Church was founded with a simple yet powerful vision: to be a house of prayer
            for all nations. For over 30 years, we have remained committed to preaching the Gospel,
            serving our community, and raising generations of believers who walk in the love and
            power of Christ.
          </p>
        </div>

        {/* Vision, Mission, Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {[
            {
              icon: <Eye className="h-7 w-7" />,
              title: "Our Vision",
              text: "To be a light to the nations, raising disciples who transform communities through the love of Christ.",
            },
            {
              icon: <Target className="h-7 w-7" />,
              title: "Our Mission",
              text: "To worship God, equip believers, and reach the lost through biblical teaching, fellowship, and compassionate service.",
            },
            {
              icon: <Heart className="h-7 w-7" />,
              title: "Our Values",
              text: "Faith, Love, Integrity, Community, Excellence, and Servant Leadership guide everything we do.",
            },
          ].map((item) => (
            <Card key={item.title} className="text-center border-border/50">
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-full bg-gold-light flex items-center justify-center mx-auto mb-4 text-accent">
                  {item.icon}
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Leadership */}
        <SectionHeader label="Leadership" title="Meet Our Team" />

        {/* Loading skeletons */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="rounded-xl bg-muted animate-pulse h-72" />
            ))}
          </div>
        )}

        {/* Team cards — 2 columns so photos have room to breathe */}
        {!loading && team.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {team.map((member) => {
              const initials = member.name
                .split(" ")
                .map((n) => n[0])
                .join("");

              return (
                <Card key={member.id} className="text-center border-border/50 overflow-hidden">
                  {/* Photo area */}
                  <div className="w-full h-56 bg-secondary overflow-hidden">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                        <span className="text-5xl font-heading font-bold text-accent">
                          {initials}
                        </span>
                      </div>
                    )}
                  </div>

                  <CardContent className="p-6">
                    <h3 className="font-heading text-xl font-semibold text-foreground mb-1">
                      {member.name}
                    </h3>
                    <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-3">
                      {member.role}
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {member.bio}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

      </div>
    </MainLayout>
  );
};

export default About;