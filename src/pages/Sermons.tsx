import { useEffect, useState } from "react";
import { Calendar, User, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import MainLayout from "@/layouts/MainLayout";
import SectionHeader from "@/components/SectionHeader";
import { getSermons } from "@/services/apiService";
import type { Sermon } from "@/services/apiService";

const Sermons = () => {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(false);

  useEffect(() => {
    getSermons()
      .then((res) => setSermons(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <MainLayout>
      <div className="page-container">
        <SectionHeader
          label="Watch & Listen"
          title="Sermons"
          subtitle="Be encouraged by messages from God's Word."
        />

        {/* Loading skeletons */}
        {loading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="rounded-xl bg-muted animate-pulse">
                <div className="aspect-video bg-muted/70 rounded-t-xl" />
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-muted-foreground/20 rounded w-3/4" />
                  <div className="h-4 bg-muted-foreground/20 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <p className="text-center text-muted-foreground py-20">
            Unable to load sermons. Please try again later.
          </p>
        )}

        {!loading && !error && sermons.length === 0 && (
          <p className="text-center text-muted-foreground py-20">
            No sermons published yet.
          </p>
        )}

        {!loading && !error && sermons.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {sermons.map((sermon) => (
              <Card key={sermon.id} className="card-hover border-border/50 overflow-hidden">

                {/* Video embed */}
                <div className="aspect-video bg-muted">
                  {sermon.embed_url ? (
                    <iframe
                      src={sermon.embed_url}
                      title={sermon.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                      Video unavailable
                    </div>
                  )}
                </div>

                <CardContent className="p-5">
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                    {sermon.title}
                  </h3>
                  {sermon.series && (
                    <p className="text-accent text-xs font-semibold uppercase tracking-wider mb-2">
                      {sermon.series}
                    </p>
                  )}
                  {sermon.description && (
                    <p className="text-muted-foreground text-sm leading-relaxed mb-3 line-clamp-2">
                      {sermon.description}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" /> {sermon.speaker}
                    </span>
                    {sermon.scripture_reference && (
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-3 w-3 text-accent" /> {sermon.scripture_reference}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(sermon.date).toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>

              </Card>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Sermons;