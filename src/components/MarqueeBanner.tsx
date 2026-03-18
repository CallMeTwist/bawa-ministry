import { Mail, Phone, Heart } from "lucide-react";

const ITEMS = [
  {
    icon: <Mail className="h-3.5 w-3.5 shrink-0" />,
    text: "Partnership & Sponsorship:",
    highlight: "tinabawa.ministries@gmail.com",
    href: "mailto:tinabawa.ministries@gmail.com",
  },
  {
    icon: <Phone className="h-3.5 w-3.5 shrink-0" />,
    text: "Call us:",
    highlight: "08069743456",
    href: "tel:08069743456",
  },
  {
    icon: <Heart className="h-3.5 w-3.5 shrink-0" />,
    text: "Send Donations — Tina Bawa Ministries International Inc.",
    highlight: "1006588860 · Keystone Bank",
    href: null,
  },
];

// Duplicate items so the scroll feels seamless
const REPEATED = [...ITEMS, ...ITEMS, ...ITEMS];

const Separator = () => (
  <span className="mx-8 text-accent/40 select-none">✦</span>
);

const MarqueeBanner = () => {
  return (
    
    <div className="w-full bg-primary border-b border-primary-foreground/10 overflow-hidden py-2.5 select-none">
      <div
        className="flex items-center whitespace-nowrap"
        style={{
          animation: "marquee 40s linear infinite",
        }}
      >
        {REPEATED.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-2 text-xs font-medium">
            <span className="text-accent/70">{item.icon}</span>
            <span className="text-primary-foreground/60">{item.text}</span>
            {item.href ? (
              <a
                href={item.href}
                className="text-accent font-semibold hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                {item.highlight}
              </a>
            ) : (
              <span className="text-accent font-semibold">{item.highlight}</span>
            )}
            <Separator />
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-inner { animation: none; }
        }
      `}</style>
    </div>
  );
};

export default MarqueeBanner;