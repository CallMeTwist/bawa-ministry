import verseBg from "@/assets/verse-bg.jpg";
import { mockDailyVerse } from "@/services/apiService";

interface DailyVerseProps {
  compact?: boolean;
}

const DailyVerse = ({ compact = false }: DailyVerseProps) => {
  const verse = mockDailyVerse; // Replace with API call: useQuery({ queryKey: ['dailyVerse'], queryFn: getDailyVerse })

  if (compact) {
    return (
      <div className="bg-secondary rounded-xl p-6 text-center">
        <p className="scripture-text text-foreground mb-3">"{verse.verse}"</p>
        <p className="scripture-reference">— {verse.reference}</p>
      </div>
    );
  }

  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${verseBg})` }}
      />
      <div className="absolute inset-0 gradient-navy opacity-80" />
      <div className="relative z-10 container mx-auto px-4 py-20 md:py-28 text-center">
        <p className="text-accent font-body text-sm font-semibold tracking-widest uppercase mb-6">
          Daily Verse
        </p>
        <blockquote className="font-heading italic text-2xl md:text-4xl lg:text-5xl leading-relaxed max-w-4xl mx-auto mb-6" style={{ color: 'hsl(var(--primary-foreground))' }}>
          "{verse.verse}"
        </blockquote>
        <p className="text-accent font-body text-lg font-semibold">— {verse.reference}</p>
      </div>
    </section>
  );
};

export default DailyVerse;
