import { Link } from "react-router-dom";
import { Church, Mail, Phone, MapPin, Facebook, Instagram, Youtube } from "lucide-react";
import tinalogo from "@/assets/tinalogo.png";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img
              src={tinalogo}
              alt="Tina Bawa Ministries"
              className="h-16 w-auto object-contain"
            />
            <span className="font-heading text-xl font-bold">Tina Bawa Ministries</span>
          </div>
          <p className="text-primary-foreground/70 text-sm leading-relaxed">
            A community of faith, hope, and love. Join us as we grow together in Christ.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-heading font-semibold text-lg mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2">
            {["Devotionals", "Sermons", "Events", "Ministries", "About", "Contact"].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

        {/* Service Times */}
        <div>
          <h4 className="font-heading font-semibold text-lg mb-4">Service Times</h4>
          <div className="space-y-2 text-sm text-primary-foreground/70">
            <p><span className="text-primary-foreground">Sunday Worship:</span> 9:00 AM & 11:00 AM</p>
            <p><span className="text-primary-foreground">Wednesday Bible Study:</span> 7:00 PM</p>
            <p><span className="text-primary-foreground">Friday Prayer Meeting:</span> 6:30 PM</p>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-heading font-semibold text-lg mb-4">Contact Us</h4>
          <div className="space-y-3 text-sm text-primary-foreground/70">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-accent shrink-0" />
              <span>Abuja, Nigeria <br />USA</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-accent shrink-0" />
              <span>08069743456</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-accent shrink-0" />
              <span>tinabawa.ministries@gmail.com</span>
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <a href="#" className="text-primary-foreground/60 hover:text-accent transition-colors"><Facebook className="h-5 w-5" /></a>
            <a href="#" className="text-primary-foreground/60 hover:text-accent transition-colors"><Instagram className="h-5 w-5" /></a>
            <a href="#" className="text-primary-foreground/60 hover:text-accent transition-colors"><Youtube className="h-5 w-5" /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center text-sm text-primary-foreground/50">
        <p>&copy; {new Date().getFullYear()} Tina Bawa Ministries International. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
