import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, User, Share2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import MainLayout from "@/layouts/MainLayout";
import { mockDevotionals } from "@/services/apiService";

const DevotionalDetail = () => {
  const { slug } = useParams();
  const devotional = mockDevotionals.find((d) => d.slug === slug);

  if (!devotional) {
    return (
      <MainLayout>
        <div className="page-container text-center">
          <h1 className="section-heading mb-4">Devotional Not Found</h1>
          <Button asChild variant="outline"><Link to="/devotionals"><ArrowLeft className="mr-2 h-4 w-4" />Back to Devotionals</Link></Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <article className="page-container max-w-3xl mx-auto">
        <Link to="/devotionals" className="inline-flex items-center gap-1 text-accent text-sm font-medium mb-8 hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to Devotionals
        </Link>

        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="h-4 w-4 text-accent" />
          <span className="scripture-reference text-xs">{devotional.scripture_reference}</span>
        </div>

        <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">{devotional.title}</h1>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-10">
          <span className="flex items-center gap-1"><User className="h-4 w-4" />{devotional.author}</span>
          <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{new Date(devotional.date).toLocaleDateString('en', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>

        {/* Scripture */}
        <div className="bg-secondary rounded-xl p-6 md:p-8 mb-10 border-l-4 border-accent">
          <p className="scripture-text text-foreground mb-3">"{devotional.verse_text}"</p>
          <p className="scripture-reference">— {devotional.scripture_reference}</p>
        </div>

        {/* Message */}
        <div className="prose-custom font-body text-foreground/90 leading-relaxed text-base md:text-lg space-y-4 mb-12">
          {devotional.message.split('\n\n').map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {/* Prayer */}
        <div className="bg-gold-light rounded-xl p-6 md:p-8 mb-10">
          <h3 className="font-heading text-xl font-semibold text-foreground mb-3">🙏 Prayer</h3>
          <p className="font-body italic text-foreground/80 leading-relaxed">{devotional.prayer}</p>
        </div>

        {/* Share */}
        <div className="flex items-center gap-3 pt-6 border-t">
          <span className="text-sm text-muted-foreground">Share this devotional:</span>
          <Button variant="outline" size="sm" onClick={() => navigator.share?.({ title: devotional.title, url: window.location.href })}>
            <Share2 className="h-4 w-4 mr-1" /> Share
          </Button>
        </div>
      </article>
    </MainLayout>
  );
};

export default DevotionalDetail;
