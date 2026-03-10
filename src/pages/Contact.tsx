import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import MainLayout from "@/layouts/MainLayout";
import SectionHeader from "@/components/SectionHeader";
import { submitContactForm } from "@/services/apiService";

const WHATSAPP_NUMBER = import.meta.env.VITE_CHURCH_WHATSAPP ?? "2348012345678";

type Status = "idle" | "sending" | "success" | "error";

const Contact = () => {
  const [form, setForm]     = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");

  const update = (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  // ── Send via email (API) ─────────────────────────────────────────────────
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setFeedback("");

    try {
      const res = await submitContactForm(form);
      setStatus("success");
      setFeedback(res.message);
      setForm({ name: "", email: "", message: "" });
    } catch (err: any) {
      setStatus("error");
      setFeedback(err?.message ?? "Something went wrong. Please try again.");
    }
  };

  // ── Send via WhatsApp ────────────────────────────────────────────────────
  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello, my name is ${form.name || "[your name]"}.\n\n${form.message || "[your message]"}\n\nEmail: ${form.email || "[your email]"}`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
  };

  return (
    <MainLayout>
      <div className="page-container">
        <SectionHeader
          label="Get in Touch"
          title="Contact Us"
          subtitle="We'd love to hear from you. Reach out to us anytime."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">

          {/* ── Form ─────────────────────────────────────────────────────── */}
          <Card className="border-border/50">
            <CardContent className="p-6 md:p-8">
              <h3 className="font-heading text-xl font-semibold mb-6">Send a Message</h3>

              {/* Success banner */}
              {status === "success" && (
                <div className="flex items-start gap-3 bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 mb-6">
                  <CheckCircle className="h-5 w-5 shrink-0 mt-0.5" />
                  <p className="text-sm">{feedback}</p>
                </div>
              )}

              {/* Error banner */}
              {status === "error" && (
                <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 mb-6">
                  <p className="text-sm">{feedback}</p>
                </div>
              )}

              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Name</label>
                  <Input
                    value={form.name}
                    onChange={update("name")}
                    placeholder="Your name"
                    required
                    disabled={status === "sending"}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    placeholder="Your email"
                    required
                    disabled={status === "sending"}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Message</label>
                  <Textarea
                    rows={5}
                    value={form.message}
                    onChange={update("message")}
                    placeholder="Your message"
                    required
                    disabled={status === "sending"}
                  />
                </div>

                {/* Two submit options */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button
                    type="submit"
                    className="flex-1 gradient-gold font-semibold"
                    style={{ color: "hsl(var(--primary))" }}
                    disabled={status === "sending"}
                  >
                    {status === "sending" ? (
                      <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Sending...</>
                    ) : (
                      <><Send className="h-4 w-4 mr-2" /> Send via Email</>
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 border-green-500 text-green-600 hover:bg-green-50"
                    onClick={handleWhatsApp}
                    disabled={status === "sending"}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" /> Send via WhatsApp
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground text-center pt-1">
                  WhatsApp will open with your message pre-filled — just tap Send.
                </p>
              </form>
            </CardContent>
          </Card>

          {/* ── Info ─────────────────────────────────────────────────────── */}
          <div className="space-y-6">
            {[
              { icon: <MapPin className="h-5 w-5" />, title: "Address",   text: "Abuja, Nigeria. USA" },
              { icon: <Phone className="h-5 w-5" />,  title: "Phone",     text: "" },
              { icon: <Mail className="h-5 w-5" />,   title: "Email",     text: "info@gracechurch.org" },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gold-light flex items-center justify-center text-accent shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-foreground">{item.title}</h4>
                  <p className="text-muted-foreground text-sm">{item.text}</p>
                </div>
              </div>
            ))}

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-gold-light flex items-center justify-center text-accent shrink-0">
                <Clock className="h-5 w-5" />
              </div>
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