import { Calendar, User, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import MainLayout from "@/layouts/MainLayout";
import SectionHeader from "@/components/SectionHeader";
import { mockSermons } from "@/services/apiService";

const Sermons = () => (
  <MainLayout>
    <div className="page-container">
      <SectionHeader label="Watch & Listen" title="Sermons" subtitle="Be encouraged by messages from God's Word." />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {mockSermons.map((sermon) => (
          <Card key={sermon.id} className="card-hover border-border/50 overflow-hidden">
            <div className="aspect-video bg-muted">
              <iframe
                src={sermon.video_url}
                title={sermon.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
            <CardContent className="p-5">
              <h3 className="font-heading text-xl font-semibold text-foreground mb-2">{sermon.title}</h3>
              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><User className="h-3 w-3" />{sermon.speaker}</span>
                <span className="flex items-center gap-1"><BookOpen className="h-3 w-3 text-accent" />{sermon.scripture_reference}</span>
                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(sermon.date).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </MainLayout>
);

export default Sermons;
