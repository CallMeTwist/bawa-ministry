import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");

  return (
    <section className="bg-secondary">
      <div className="container mx-auto px-4 py-16 md:py-20 text-center">
        <Mail className="h-10 w-10 text-accent mx-auto mb-4" />
        <h2 className="section-heading mb-3">Stay Connected</h2>
        <p className="section-subheading mx-auto mb-8">
          Subscribe to our newsletter for daily devotionals, event updates, and church news.
        </p>
        <form
          onSubmit={(e) => { e.preventDefault(); setEmail(""); }}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-card"
            required
          />
          <Button type="submit" className="gradient-gold font-semibold" style={{ color: 'hsl(var(--primary))' }}>
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSignup;
