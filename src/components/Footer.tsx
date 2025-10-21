import { Link } from "react-router-dom";
import { CreditCard, MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <CreditCard className="h-8 w-8" />
              <span className="text-xl font-bold">Hafilat Guide</span>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Your complete guide to Abu Dhabi's public transportation system. Get all the information you need about the Hafilat Card.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/#about-hafilat" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth text-sm">
                About Hafilat Card
              </Link>
              <Link to="/bus-card-recharge" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth text-sm">
                How to Recharge
              </Link>
              <Link to="/abu-dhabi-bus-routes" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth text-sm">
                Routes & Schedules
              </Link>
              <Link to="/locations-hafilat-recharge" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth text-sm">
                Recharge Locations
              </Link>
            </nav>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Resources</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/blog" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth text-sm">
                Blog & Guides
              </Link>
              <a href="#faq" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth text-sm">
                FAQ
              </a>
              <Link to="/contact" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth text-sm">
                Contact Support
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="h-4 w-4 text-primary-foreground/60" />
                <span className="text-primary-foreground/80">Abu Dhabi, UAE</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4 text-primary-foreground/60" />
                <span className="text-primary-foreground/80">+971 800 4235</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4 text-primary-foreground/60" />
                <span className="text-primary-foreground/80">info@hafilatguide.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/60 text-sm">
            Â© {currentYear} Hafilat Guide. All rights reserved. Not affiliated with DoT Abu Dhabi.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

