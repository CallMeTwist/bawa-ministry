import { Heart, Eye, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import MainLayout from "@/layouts/MainLayout";
import SectionHeader from "@/components/SectionHeader";

const leaders = [
  { name: "Pastor James Okafor", role: "Senior Pastor", bio: "Leading Grace Church with a heart for worship and community transformation." },
  { name: "Sister Grace Adeyemi", role: "Associate Pastor", bio: "Passionate about teaching God's Word and raising leaders in the church." },
  { name: "Brother David Eze", role: "Youth Director", bio: "Committed to mentoring the next generation through faith and fellowship." },
];

const About = () => (
  <MainLayout>
    <div className="page-container">
      <SectionHeader label="Our Story" title="About Grace Church" subtitle="A community built on faith, love, and service since 1995." />

      {/* Story */}
      <div className="max-w-3xl mx-auto text-center mb-20">
        <p className="text-foreground/80 leading-relaxed text-lg">
          Grace Church was founded with a simple yet powerful vision: to be a house of prayer for all nations.
          For over 30 years, we have remained committed to preaching the Gospel, serving our community, and raising
          generations of believers who walk in the love and power of Christ.
        </p>
      </div>

      {/* Vision & Mission */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        {[
          { icon: <Eye className="h-7 w-7" />, title: "Our Vision", text: "To be a light to the nations, raising disciples who transform communities through the love of Christ." },
          { icon: <Target className="h-7 w-7" />, title: "Our Mission", text: "To worship God, equip believers, and reach the lost through biblical teaching, fellowship, and compassionate service." },
          { icon: <Heart className="h-7 w-7" />, title: "Our Values", text: "Faith, Love, Integrity, Community, Excellence, and Servant Leadership guide everything we do." },
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {leaders.map((leader) => (
          <Card key={leader.name} className="text-center border-border/50">
            <CardContent className="p-8">
              <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4 text-2xl font-heading font-bold text-accent">
                {leader.name.split(' ').map(n => n[0]).join('')}
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground">{leader.name}</h3>
              <p className="text-accent text-sm font-medium mb-2">{leader.role}</p>
              <p className="text-muted-foreground text-sm">{leader.bio}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </MainLayout>
);

export default About;
