import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Users, Heart, HandHelping, BookOpen, Share2, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import MainLayout from "@/layouts/MainLayout";
import MinistryCard from "@/components/MinistryCard";
import { getMinistries } from "@/services/apiService";
import type { Ministry } from "@/services/apiService";
import ministryHero from "@/assets/ministry-hero.jpg";

const iconMap: Record<string, React.ReactNode> = {
    youth: <Users className="h-10 w-10" />,
    prayer: <Heart className="h-10 w-10" />,
    outreach: <HandHelping className="h-10 w-10" />,
    "bible-study": <BookOpen className="h-10 w-10" />,
};

const MinistryDetail = () => {
    const { slug } = useParams<{ slug: string }>();
    const [ministry, setMinistry] = useState<Ministry | null>(null);
    const [otherMinistries, setOtherMinistries] = useState<Ministry[]>([]);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        getMinistries()
            .then((res) => {
                const all = res.data;
                const current = all.find((m) => m.slug === slug);
                if (!current) {
                    setNotFound(true);
                } else {
                    setMinistry(current);
                    setOtherMinistries(all.filter((m) => m.slug !== slug));
                }
            })
            .catch(() => setNotFound(true))
            .finally(() => setLoading(false));
    }, [slug]);

    if (loading) {
        return (
            <MainLayout>
                <div className="page-container max-w-4xl mx-auto space-y-6">
                    <div className="h-80 bg-muted rounded-2xl animate-pulse" />
                    <div className="h-32 bg-muted rounded-xl animate-pulse" />
                    <div className="grid sm:grid-cols-2 gap-3">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-14 bg-muted rounded-lg animate-pulse" />
                        ))}
                    </div>
                </div>
            </MainLayout>
        );
    }

    if (notFound || !ministry) {
        return (
            <MainLayout>
                <div className="page-container text-center">
                    <h1 className="section-heading mb-4">Ministry Not Found</h1>
                    <Button asChild variant="outline">
                        <Link to="/ministries">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Ministries
                        </Link>
                    </Button>
                </div>
            </MainLayout>
        );
    }

    // Pull these out so JSX stays clean
    const heroImage = ministry.image ? ministry.image : ministryHero;
    const ministryIcon = iconMap[ministry.slug] ? iconMap[ministry.slug] : <Users className="h-8 w-8" />;

    return (
        <MainLayout>
            <div className="page-container max-w-4xl mx-auto">

                <Link
                    to="/ministries"
                    className="inline-flex items-center gap-1 text-accent text-sm font-medium mb-8 hover:underline"
                >
                    <ArrowLeft className="h-4 w-4" /> Back to Ministries
                </Link>

                {/* Hero */}
                <div className="relative rounded-2xl overflow-hidden mb-12">
                    <img
                        src={heroImage}
                        alt={ministry.name}
                        className="w-full h-64 md:h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
                    <div className="absolute inset-0 flex flex-col items-center justify-end p-8 md:p-12 text-center">
                        <div className="w-16 h-16 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center mb-4 text-accent">
                            {ministryIcon}
                        </div>
                        <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-3">
                            {ministry.name}
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            {ministry.description}
                        </p>
                    </div>
                </div>

                {/* Leader / Meeting Time / Email cards */}
                <div className="grid sm:grid-cols-3 gap-6 mb-10">
                    {ministry.leader && (
                        <div className="bg-secondary rounded-xl p-6 text-center">
                            <Users className="h-6 w-6 text-accent mx-auto mb-2" />
                            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                                Ministry Leader
                            </p>
                            <p className="font-heading font-semibold text-foreground">
                                {ministry.leader}
                            </p>
                        </div>
                    )}

                    {ministry.meeting_time && (
                        <div className="bg-secondary rounded-xl p-6 text-center">
                            <Clock className="h-6 w-6 text-accent mx-auto mb-2" />
                            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                                When We Meet
                            </p>
                            <p className="font-heading font-semibold text-foreground">
                                {ministry.meeting_time}
                            </p>
                        </div>
                    )}

                    {ministry.email && (
                        <div className="bg-secondary rounded-xl p-6 text-center">
                            <Mail className="h-6 w-6 text-accent mx-auto mb-2" />
                            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                                Contact
                            </p>
                            <a
                                href={`mailto:${ministry.email}`}
                                className="font-heading font-semibold text-accent hover:underline break-all"
                            >
                                {ministry.email}
                            </a>
                        </div>
                    )}
                </div>

                {/* Meeting time highlight */}
                {ministry.meeting_time && (
                    <div className="bg-gold-light rounded-xl p-6 md:p-8 mb-10 text-center">
                        <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                            📅 When We Meet
                        </h3>
                        <p className="font-body text-foreground/80">{ministry.meeting_time}</p>
                    </div>
                )}

                {/* Share & CTA */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border mb-12">
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground">Share this ministry:</span>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigator.share?.({ title: ministry.name, url: window.location.href })}
                        >
                            <Share2 className="h-4 w-4 mr-1" /> Share
                        </Button>
                    </div>
                    <Button asChild>
                        <Link to="/contact">Get Involved</Link>
                    </Button>
                </div>

                {/* Other ministries */}
                {otherMinistries.length > 0 && (
                    <div>
                        <h2 className="font-heading text-2xl font-semibold text-foreground mb-6">
                            Explore Other Ministries
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {otherMinistries.map((m) => (
                                <Link to={`/ministries/${m.slug}`} key={m.id}>
                                    <MinistryCard ministry={m} />
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </MainLayout>
    );
};

export default MinistryDetail;