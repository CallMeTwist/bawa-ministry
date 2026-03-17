import { useEffect, useState } from "react";
import { Heart, Eye, Target, Handshake, Users2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import SectionHeader from "@/components/SectionHeader";
import { getTeamMembers } from "@/services/apiService";
import type { TeamMember } from "@/services/apiService";
import { sanitizeHtml } from "@/lib/sanitize";

// ── Read-more block ───────────────────────────────────────────────────────
const ReadMoreHtml = ({
  html,
  image,
  name,
  role,
}: {
  html: string;
  image: string | null;
  name: string;
  role: string;
}) => {
  const [expanded, setExpanded] = useState(false);
  const initials = name.split(" ").map((n) => n[0]).join("");

  return (
    <div className="flex flex-col">

      {/* When expanded — image moves above text */}
      {expanded && (
        <div className="w-full h-80 bg-secondary overflow-hidden rounded-xl mb-6">
          {image ? (
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover object-top"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
              <span className="text-6xl font-heading font-bold text-accent">{initials}</span>
            </div>
          )}
        </div>
      )}

      {/* Name + role repeat when expanded */}
      {expanded && (
        <div className="mb-4">
          <p className="text-accent text-xs font-semibold uppercase tracking-widest mb-1">{role}</p>
          <h3 className="font-heading text-2xl font-bold text-foreground">{name}</h3>
        </div>
      )}

      {/* Prose */}
      <div className="relative">
        <div
          className={`prose prose-sm md:prose-base max-w-none text-left
            prose-headings:font-heading prose-headings:text-foreground
            prose-p:text-foreground/90 prose-p:leading-relaxed
            prose-strong:text-foreground
            prose-ul:text-foreground/90 prose-li:text-foreground/90
            prose-ol:text-foreground/90
            prose-blockquote:border-accent prose-blockquote:text-muted-foreground
            prose-a:text-accent prose-a:underline
            transition-all duration-500
            ${!expanded ? "max-h-64 overflow-hidden" : "max-h-none"}`}
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(html) }}
        />
        {!expanded && (
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-card to-transparent pointer-events-none" />
        )}
      </div>

      <button
        onClick={() => setExpanded((prev) => !prev)}
        className="mt-4 self-start inline-flex items-center gap-1.5 bg-accent text-accent-foreground text-sm font-semibold px-5 py-2 rounded-full hover:opacity-90 transition-opacity focus:outline-none"
      >
        {expanded ? "Show less ↑" : "Read more ↓"}
      </button>
    </div>
  );
};

// ── Main page ─────────────────────────────────────────────────────────────
const About = () => {
  const [team, setTeam]       = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTeamMembers()
      .then((res) => setTeam(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const [featured, ...rest] = team;

  return (
    <MainLayout>
      <div className="page-container">

        {/* ── Header ── */}
        <SectionHeader
          label="Our Story"
          title="Tina Bawa Ministries International Inc"
          subtitle="A community built on faith, love, and service since 2010."
        />

        {/* ── Story ── */}
        <div className="max-w-3xl mx-auto text-left mb-20 space-y-4">
          {[
            `Tina Bawa Ministries Int'l. (TBM) is a non-denominational faith based initiative, commissioned to impact nations by building lives. The focus centres on providing the resources and support that will enable women and young people to actualize their divine purpose.`,
            `The vision first began in July 1999, as a non-denominational prayer fellowship, "The Gathering of Deborah". The Gathering had the sole objective of coordinating Christian women to stand in the gap in the place of prayers for their family, the church and society at large.`,
            `Outstanding miracles of healing, fruitfulness, deliverance and prosperity marked the gathering. As the testimonies went far and wide, in no time, what began as a small neighbourhood prayer meeting, sprawled into a mighty prayer revival. This drew women from different walks of life to the gathering.`,
            `As the gathering expanded, so also was the need to diversify in order to meet the various requests of the growing membership. It is in view of this that Tina Bawa Ministries Int'l. (TBMi) was established to serve as the umbrella body for the different components of the vision. Today, TBMi has grown into a multifaceted ministry, with specialized aspects that address the specific needs.`,
          ].map((para, i) => (
            <p key={i} className="text-foreground/80 leading-relaxed text-lg">{para}</p>
          ))}
        </div>

        {/* ── Vision, Mission, Values ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {[
            { icon: <Eye className="h-7 w-7" />,    title: "Our Vision",      text: "Building lives, Impacting Nations" },
            { icon: <Target className="h-7 w-7" />, title: "Our Mission",     text: "Bringing humanity back to Eden — the original and perfect intention of God in creation — through dedicated ministries." },
            { icon: <Heart className="h-7 w-7" />,  title: "Our Core Values", text: "Family, Love, Faith, Sacrifice, Partnership" },
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

        {/* ── Leadership ── */}
        <SectionHeader label="Leadership" title="Meet Our Leader" />

        {loading && (
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="rounded-xl bg-muted animate-pulse h-[500px]" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="rounded-xl bg-muted animate-pulse h-72" />
              ))}
            </div>
          </div>
        )}

        {!loading && team.length > 0 && (
          <div className="max-w-4xl mx-auto space-y-12 mb-24">

            {/* Featured member */}
            {featured && (
              <Card className="border-border/50 overflow-hidden">
                <div className={`flex ${featured.full_info ? "flex-col" : "flex-col md:flex-row"}`}>

                  {/* Side image — only when no full_info (collapsed state handled inside ReadMoreHtml) */}
                  {!featured.full_info && (
                    <div className="w-full md:w-80 shrink-0 h-96 md:h-auto bg-secondary overflow-hidden">
                      {featured.image ? (
                        <img
                          src={featured.image}
                          alt={featured.name}
                          className="w-full h-full object-cover object-top"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                          <span className="text-6xl font-heading font-bold text-accent">
                            {featured.name.split(" ").map((n) => n[0]).join("")}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* When has full_info — initial collapsed view shows image on left */}
                  {featured.full_info && (
                    <div className="flex flex-col md:flex-row">
                      <div className="w-full md:w-80 shrink-0 h-96 md:h-auto bg-secondary overflow-hidden md:rounded-tl-xl md:rounded-bl-xl overflow-hidden
                        [.expanded_&]:hidden">
                      </div>
                    </div>
                  )}

                  {featured.full_info ? (
                    <CardContent className="p-8">
                      {/* Collapsed state: show side-by-side feel with image */}
                      <div className="flex flex-col md:flex-row gap-8 mb-2">
                        <ReadMoreHtml
                          html={featured.full_info}
                          image={featured.image}
                          name={featured.name}
                          role={featured.role}
                        />
                      </div>
                    </CardContent>
                  ) : (
                    <CardContent className="p-8 flex-1 flex flex-col justify-start">
                      <p className="text-accent text-xs font-semibold uppercase tracking-widest mb-2">
                        {featured.role}
                      </p>
                      <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
                        {featured.name}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed text-left">
                        {featured.bio}
                      </p>
                    </CardContent>
                  )}
                </div>
              </Card>
            )}

            {/* Rest of team */}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {rest.map((member) => {
                  const initials = member.name.split(" ").map((n) => n[0]).join("");
                  return (
                    <Card key={member.id} className="text-center border-border/50 overflow-hidden">
                      <div className="w-full h-96 bg-secondary overflow-hidden">
                        {member.image ? (
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover object-center"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                            <span className="text-5xl font-heading font-bold text-accent">{initials}</span>
                          </div>
                        )}
                      </div>
                      <CardContent className="p-6">
                        <h3 className="font-heading text-xl font-semibold text-foreground mb-1">{member.name}</h3>
                        <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-3">{member.role}</p>
                        <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ── Partners & Volunteers ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">

          {/* Partners */}
          <div className="bg-secondary rounded-2xl p-8 md:p-10 flex flex-col">
            <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-6 text-accent">
              <Handshake className="h-7 w-7" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-foreground mb-4">Our Partners</h2>
            <div className="space-y-4 text-foreground/80 leading-relaxed text-base flex-1">
              <p>
                Tina Bawa Ministries is a broad and diversified vision. In whatever aspect you are
                interacting with us, you will see that we are passionate about what we do. We are
                committed to our vision and inspired by the need to make a difference in the lives
                of people.
              </p>
              <p>
                Our crave for tangible and measurable results is the reason why we take a very
                practical approach to our commitments. Whether meeting your spiritual, social or
                economic needs, our drive is the same — to help people appreciate the love of God
                and yearn for a deeper relationship with him.
              </p>
              <p>
                We cannot do this alone. That's why we're asking you to join our family of partners.
                So long as you share our vision, our hands and hearts are wide open to you. Our
                operation is standardized for transparency and accountability.
              </p>
              <p className="font-medium text-foreground">
                Thank you for partnering with us. Be assured that your support is reaching people
                — majorly women and children — in Nigeria, Africa and around the world who are in
                desperate need of support, mentoring and help. Together, we are going to make a
                difference!
              </p>
            </div>
            <div className="mt-8">
              <Button asChild className="gradient-gold font-semibold" style={{ color: "hsl(var(--primary))" }}>
                <Link to="/contact">Become a Partner</Link>
              </Button>
            </div>
          </div>

          {/* Volunteers */}
          <div className="bg-primary rounded-2xl p-8 md:p-10 flex flex-col">
            <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center mb-6 text-accent">
              <Users2 className="h-7 w-7" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-primary-foreground mb-4">Our Volunteers</h2>
            <div className="space-y-4 text-primary-foreground/80 leading-relaxed text-base flex-1">
              <p>
                In TBMi, the work load is demanding — particularly because of the multifaceted
                nature of the vision, coupled with our commitment to excellence in ministry. Though
                as a highly functional organization we have built a culture of multitasking, we
                know that we will certainly do better with more hands.
              </p>
              <p>
                This is why we have built TBMi as a learning organization that is open to new
                insight and thinking. For those seeking to contribute to the advancement of the
                cause of the woman and humanity, TBMi is the place to volunteer.
              </p>
              <p>
                The vision is broad and inclusive. It does not matter your training or background.
                So long as you have a passion, you are welcome.
              </p>
              <p className="font-medium text-primary-foreground">
                You will find the work environment challenging, inspiring and fulfilling. As part
                of our policy, we provide basic training and orientation for all volunteers. We
                don't just want you to contribute to us — we also want to contribute to you.
              </p>
            </div>
            <div className="mt-8">
              <Button asChild variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground font-semibold">
                <Link to="/contact">Volunteer With Us</Link>
              </Button>
            </div>
          </div>

        </div>

      </div>
    </MainLayout>
  );
};

export default About;