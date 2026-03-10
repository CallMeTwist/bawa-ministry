import { useEffect, useState } from "react";
import verseBg from "@/assets/verse-bg2.png";
import { getDailyVerse } from "@/services/apiService";
import type { DailyVerse as DailyVerseType } from "@/services/apiService";

interface DailyVerseProps {
  compact?: boolean;
}

const DailyVerse = ({ compact = false }: DailyVerseProps) => {
  const [verse, setVerse] = useState<DailyVerseType | null>(null);

  useEffect(() => {
    getDailyVerse()
      .then((res) => setVerse(res.data))
      .catch(() => setVerse(null));
  }, []);

  if (!verse) {
    return compact ? (
      <div className="bg-secondary rounded-xl p-6 text-center animate-pulse h-24" />
    ) : (
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${verseBg})` }}
        />
        <div className="absolute inset-0 gradient-navy opacity-80" />
        <div className="relative z-10 container mx-auto px-4 py-20 md:py-28 text-center">
          <div className="h-8 w-64 bg-white/20 rounded animate-pulse mx-auto mb-6" />
          <div className="h-16 w-2/3 bg-white/20 rounded animate-pulse mx-auto" />
        </div>
      </section>
    );
  }

  if (compact) {
    return (
      <div className="bg-secondary rounded-xl p-6 text-center">
        <p className="scripture-text text-foreground mb-3">"{verse.verse_text}"</p>
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
        <blockquote
          className="font-heading italic text-2xl md:text-4xl lg:text-5xl leading-relaxed max-w-4xl mx-auto mb-6"
          style={{ color: "hsl(var(--primary-foreground))" }}
        >
          "{verse.verse_text}"
        </blockquote>
        <p className="text-accent font-body text-lg font-semibold">
          — {verse.reference}
          {verse.translation && (
            <span className="text-sm font-normal opacity-70 ml-2">({verse.translation})</span>
          )}
        </p>
      </div>
    </section>
  );
};

export default DailyVerse;