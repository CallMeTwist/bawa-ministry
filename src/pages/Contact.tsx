import { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import MainLayout from "@/layouts/MainLayout";
import SectionHeader from "@/components/SectionHeader";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  return (
    <MainLayout>
      <div className="page-container">
        <SectionHeader label="Get in Touch" title="Contact Us" subtitle="We'd love to hear from you. Reach out to us anytime." />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Form */}
          <Card className="border-border/50">
            <CardContent className="p-6 md:p-8">
              <h3 className="font-heading text-xl font-semibold mb-6">Send a Message</h3>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Name</label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" required />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
                  <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Your email" required />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Message</label>
                  <Textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Your message" required />
                </div>
                <Button type="submit" className="w-full gradient-gold font-semibold" style={{ color: 'hsl(var(--primary))' }}>
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Info */}
          <div className="space-y-6">
            {[
              { icon: <MapPin className="h-5 w-5" />, title: "Address", text: "123 Faith Avenue, Grace City, GC 12345" },
              { icon: <Phone className="h-5 w-5" />, title: "Phone", text: "(555) 123-4567" },
              { icon: <Mail className="h-5 w-5" />, title: "Email", text: "info@gracechurch.org" },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gold-light flex items-center justify-center text-accent shrink-0">{item.icon}</div>
                <div>
                  <h4 className="font-heading font-semibold text-foreground">{item.title}</h4>
                  <p className="text-muted-foreground text-sm">{item.text}</p>
                </div>
              </div>
            ))}

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-gold-light flex items-center justify-center text-accent shrink-0"><Clock className="h-5 w-5" /></div>
              <div>
                <h4 className="font-heading font-semibold text-foreground">Service Times</h4>
                <div className="text-muted-foreground text-sm space-y-1">
                  <p>Sunday Worship: 9:00 AM & 11:00 AM</p>
                  <p>Wednesday Bible Study: 7:00 PM</p>
                  <p>Friday Prayer Meeting: 6:30 PM</p>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="rounded-xl overflow-hidden border h-52 bg-muted flex items-center justify-center">
              <p className="text-muted-foreground text-sm">Map integration coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Contact;
