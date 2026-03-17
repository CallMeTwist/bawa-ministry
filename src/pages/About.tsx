

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
import bishopImage from "@/assets/BISHOP.jpeg"; // ← update filename

// ── Featured member card — controls its own expanded/collapsed layout ─────
// ── Bishop card — hardcoded, image never distorts ─────────────────────────
const BISHOP_PARAGRAPHS = [
  `Rt. Rev. (Mrs.) Tina Bawa-Shitgurum is the progenitor of the Tina Bawa Ministries International Inc. She is a seasoned Christian homemaking mentor and passionate intercessor with unique prophetic gifting and calling. She was called into ministry in 1999. Since then, she has grown remarkably as a conference speaker, leader and author.`,
  `The theme of her message centres on unveiling the spirituality, genius and purpose of the woman as a foreground for optimizing her divine role as a help mate for the man. Her teachings create a biblical niche for the role of the woman as an individual, wife and mother in the light of the modern concept of gender rights.`,
  `Her ministry and message has taken her across Africa, Europe and America. She has been opportune to reach out to thousands of women through her annual Extraordinary Woman Conference. The Conference which began in 2001 has become reputable for building the capacity and orientating the values of the modern Christian woman. Other programs organized by her include The Extraordinary Life Conference, the Movement to Eden Series, Stand by Your Man Prayer Summit and WHITE Worship (Worship Him In The Evening). Recently, she established the Home Finishing Academy (HOFA), a training program for just married and young ladies aspiring to marry.`,
  `Beside conference speaking, Bishop Tina Bawa is a grass root evangelist. Her periodic rural-urban crusades have drawn thousands of souls into the kingdom. An added value to her evangelistic calling is her practical approach to Christianity. She believes and advocates charity as one of the most effective means to demonstrate the love of Christ. Women of Compassion, a charity platform she has coordinated even before she was called into ministry, plays a key role in her evangelistic outreaches. The organization has been responsible for guaranteeing the basic necessities of life, including food, education, shelter and medical access for many.`,
  `An experienced teacher and leader, she has authored eight books including the best-selling cover, The Extraordinary Woman. Her 2006 book, Unveiling the African Woman remains a useful tool for gender policy makers in Africa. She is a gender advocate and a national prayer leader. She coordinates the organization, Nigeria Woman Awake (NIWA). Extraordinary Women Fellowship International (the Gathering of Deborah) which she began in 1999 as her entry into the ministry has kept the fire of intercession burning amongst women at the community level.`,
  `Rt. Rev. (Mrs.) Tina Bawa-Shitgurum was consecrated as the Apostolic Bishop of the Urban Marketplace, Nigeria on the 16th of September, 2017 by the College of Bishops of the International Communion of Charismatic Churches (ICCC) led by the Prelate His Eminence, Archbishop Kirby Clements and the 2nd Prelate, Her Eminence, Archbishop Margaret Benson-Idahosa. Making her the 1st Apostolic Female Bishop in the college and Nigeria.`,
  `Besides being gifted and called, Bishop Tina Bawa also received adequate preparation for Ministry. She is a certified member of the Canadian Institute of Christian Counsellors (CICC). She obtained her Pastoral degree from Pan African Christian University, Abuja. She is a Business and Management Study Graduate and a qualified Microsoft System Engineer (M.C.S.E). Alongside ministry, Bishop Tina Bawa is a successful entrepreneur and businesswoman. She is the President of a highly successful business conglomerate, the Duncan Group of Companies and Chairs many other organizations and businesses.`,
  `She is happily married for over 30 years to a business magnate, Dr. Godfrey Bawa-Shitgurum MON. The marriage is blessed with five children. Rt. Rev. (Mrs.) Tina Bawa-Shitgurum is not only a mother to her children, but also to the tens of women and young people who have adopted her as their mentor.`,
];

const BishopCard = () => {
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <Card className="border-border/50 overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-stretch">

        {/* ── Image ── */}
        <div
          className="w-full md:w-72 shrink-0 bg-secondary overflow-hidden h-80 md:h-auto md:self-stretch"
          style={!isMobile ? {
            maxWidth: expanded ? "0px" : "288px",
            height: expanded ? "0px" : "380px",
            opacity: expanded ? 0 : 1,
            transition: "max-width 0.6s ease-in-out, height 0.6s ease-in-out, opacity 0.4s ease-in-out",
            overflow: "hidden",
          } : {}}
        >
          <img
            src={bishopImage}
            alt="Bishop Tina Bawa-Shitgurum"
            className="w-full h-full object-cover object-top"
            style={!isMobile ? { minWidth: "288px" } : {}}
          />
        </div>

        {/* ── Text content ── */}
        <CardContent
          className="p-8 flex-1 flex flex-col justify-start"
          style={!isMobile ? { minHeight: expanded ? "auto" : "380px" } : {}}
        >
          <p className="text-accent text-xs font-semibold uppercase tracking-widest mb-2">
            The Progenitor
          </p>
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-5">
            Bishop Tina Bawa-Shitgurum
          </h3>

          {/* First paragraph — always visible */}
          <p className="text-foreground/90 text-sm md:text-base leading-relaxed mb-4">
            {BISHOP_PARAGRAPHS[0]}
          </p>

          {/* Expandable paragraphs */}
          <div
            className="overflow-hidden"
            style={{
              maxHeight: expanded ? `${BISHOP_PARAGRAPHS.length * 400}px` : "0px",
              opacity: expanded ? 1 : 0,
              transform: expanded ? "translateY(0)" : "translateY(-6px)",
              transition: "max-height 0.7s ease-in-out, opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
            }}
          >
            <div className="space-y-4 pt-1">
              {BISHOP_PARAGRAPHS.slice(1).map((para, i) => (
                <p key={i} className="text-foreground/90 text-sm md:text-base leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </div>

          {/* Fade hint when collapsed */}
          {!expanded && (
            <div className="h-8 bg-gradient-to-t from-card to-transparent -mt-2 mb-2 pointer-events-none" />
          )}

          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="mt-4 self-start inline-flex items-center gap-1.5 bg-accent text-accent-foreground text-sm font-semibold px-5 py-2 rounded-full hover:opacity-90 transition-opacity focus:outline-none"
          >
            {expanded ? "Show less ↑" : "Read more ↓"}
          </button>
        </CardContent>
      </div>
    </Card>
  );
};

// ── Main page ─────────────────────────────────────────────────────────────
const About = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTeamMembers()
      .then((res) => setTeam(res.data))
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  const rest = team;
  return (
    <MainLayout>
      <div className="page-container">

        <SectionHeader
          label="Our Story"
          title="Tina Bawa Ministries International Inc"
          subtitle="A community built on faith, love, and service since 2010."
        />

        {/* Story */}
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

        {/* Vision, Mission, Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {[
            { icon: <Eye className="h-7 w-7" />, title: "Our Vision", text: "Building lives, Impacting Nations" },
            { icon: <Target className="h-7 w-7" />, title: "Our Mission", text: "Bringing humanity back to Eden — the original and perfect intention of God in creation — through dedicated ministries." },
            { icon: <Heart className="h-7 w-7" />, title: "Our Core Values", text: "Family, Love, Faith, Sacrifice, Partnership" },
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
        <SectionHeader label="Leadership" title="Meet Our Leader" />

        {loading && (
          <div className="max-w-4xl mx-auto mb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="rounded-xl bg-muted animate-pulse h-72" />
              ))}
            </div>
          </div>
        )}

        <div className="max-w-4xl mx-auto mb-12">
          <BishopCard />
        </div>


        {!loading && team.length > 0 && (
          <div className="max-w-4xl mx-auto space-y-12 mb-24">

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

        {/* Partners & Volunteers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">

          <div className="bg-secondary rounded-2xl p-8 md:p-10 flex flex-col">
            <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-6 text-accent">
              <Handshake className="h-7 w-7" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-foreground mb-4">Our Partners</h2>
            <div className="space-y-4 text-foreground/80 leading-relaxed text-base flex-1">
              <p>Tina Bawa Ministries is a broad and diversified vision. In whatever aspect you are interacting with us, you will see that we are passionate about what we do. We are committed to our vision and inspired by the need to make a difference in the lives of people.</p>
              <p>Our crave for tangible and measurable results is the reason why we take a very practical approach to our commitments. Whether meeting your spiritual, social or economic needs, our drive is the same — to help people appreciate the love of God and yearn for a deeper relationship with him.</p>
              <p>We cannot do this alone. That's why we're asking you to join our family of partners. So long as you share our vision, our hands and hearts are wide open to you. Our operation is standardized for transparency and accountability.</p>
              <p className="font-medium text-foreground">Thank you for partnering with us. Be assured that your support is reaching people — majorly women and children — in Nigeria, Africa and around the world who are in desperate need of support, mentoring and help. Together, we are going to make a difference!</p>
            </div>
            <div className="mt-8">
              <Button asChild className="gradient-gold font-semibold" style={{ color: "hsl(var(--primary))" }}>
                <Link to="/contact">Become a Partner</Link>
              </Button>
            </div>
          </div>

          <div className="bg-primary rounded-2xl p-8 md:p-10 flex flex-col">
            <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center mb-6 text-accent">
              <Users2 className="h-7 w-7" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-primary-foreground mb-4">Our Volunteers</h2>
            <div className="space-y-4 text-primary-foreground/80 leading-relaxed text-base flex-1">
              <p>In TBMi, the work load is demanding — particularly because of the multifaceted nature of the vision, coupled with our commitment to excellence in ministry. Though as a highly functional organization we have built a culture of multitasking, we know that we will certainly do better with more hands.</p>
              <p>This is why we have built TBMi as a learning organization that is open to new insight and thinking. For those seeking to contribute to the advancement of the cause of the woman and humanity, TBMi is the place to volunteer.</p>
              <p>The vision is broad and inclusive. It does not matter your training or background. So long as you have a passion, you are welcome.</p>
              <p className="font-medium text-primary-foreground">You will find the work environment challenging, inspiring and fulfilling. As part of our policy, we provide basic training and orientation for all volunteers. We don't just want you to contribute to us — we also want to contribute to you.</p>
            </div>
            <div className="mt-8">
              <Button asChild variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground font-semibold">
                <Link to="/contact">Volunteer With Us</Link>
              </Button>
            </div>
            <div className="mt-6 border-t border-border/40 pt-6 space-y-4">
              <p className="text-sm font-semibold text-muted-foreground">Partnership & Sponsorship enquiries:</p>
              <div className="space-y-1">
                <a
                  href="mailto:tinabawa.ministries@gmail.com"
                  className="text-sm text-accent hover:underline block"
                >
                  ✉ tinabawa.ministries@gmail.com
                </a>
                <a href="tel:08069743456" className="text-sm text-accent hover:underline block">
                  📞 08069743456
                </a>
              </div>
              <div className="bg-background/60 rounded-xl px-4 py-3 border border-border/50">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Send Donations To</p>
                <p className="font-semibold text-foreground text-sm">Tina Bawa Ministries International Inc.</p>
                <p className="font-heading font-bold text-foreground text-lg tracking-widest mt-1">1006588860</p>
                <p className="text-xs text-muted-foreground">Keystone Bank</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </MainLayout>
  );
};

export default About;