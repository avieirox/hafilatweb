import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, CreditCard, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isPathActive = (href: string) => {
    try {
      // Consider only pathname from href (ignore hashes like /#about-hafilat)
      const url = new URL(href, "http://localhost");
      return url.pathname === location.pathname;
    } catch {
      // Fallback for non-URL hrefs
      return href === location.pathname;
    }
  };

  const navigation: (
    | { name: string; href: string }
    | {
        name: string;
        children: { name: string; href: string }[];
      }
  )[] = [
    { name: "About Hafilat", href: "/#about-hafilat" },
    {
      name: "Recharge",
      children: [
        { name: "Bus Card Recharge", href: "/bus-card-recharge" },
        { name: "Recharge Locations", href: "/locations-hafilat-recharge" },
        { name: "Check Balance Online", href: "/hafilat-balance-online" },
      ],
    },
    { name: "Routes & Schedules", href: "/abu-dhabi-bus-routes" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50 shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-smooth">
            <CreditCard className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-primary">Hafilat Guide</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => {
              if ("children" in item) {
                const active = item.children.some((c) => isPathActive(c.href));
                return (
                  <DropdownMenu key={item.name}>
                    <DropdownMenuTrigger className={`inline-flex items-center gap-1 text-foreground hover:text-primary transition-smooth font-medium pb-1 ${
                      active ? "underline decoration-2 underline-offset-8" : ""
                    }`}>
                      <span>{item.name}</span>
                      <ChevronDown className="h-4 w-4 opacity-70" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="rounded-xl border border-border/60 shadow-2xl backdrop-blur bg-background/95 min-w-[14rem] p-1">
                      {item.children.map((child) => {
                        const childActive = isPathActive(child.href);
                        return (
                          <DropdownMenuItem
                            key={child.name}
                            className={`rounded-md px-2 py-2.5 hover:bg-accent/60 focus:bg-accent/60 ${
                              childActive ? "bg-accent/60" : ""
                            }`}
                          >
                            <Link to={child.href} className="w-full block text-sm">
                              {child.name}
                            </Link>
                          </DropdownMenuItem>
                        );
                      })}
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              }
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-foreground hover:text-primary transition-smooth font-medium pb-1 ${
                    isPathActive(item.href) ? "underline decoration-2 underline-offset-8" : ""
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button variant="hero" size="lg">
              Check Balance
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => {
                if ("children" in item) {
                  return (
                    <div key={item.name} className="space-y-2">
                      <span className="text-foreground font-medium">{item.name}</span>
                      <div className="ml-4 flex flex-col space-y-2">
                        {item.children.map((child) => {
                          const childActive = isPathActive(child.href);
                          return (
                            <Link
                              key={child.name}
                              to={child.href}
                              className={`text-foreground/90 hover:text-primary transition-smooth ${
                                childActive ? "underline decoration-2 underline-offset-4" : ""
                              }`}
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {child.name}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  );
                }
                return (
                  <Link
                    key={item.name}
                    to={(item as { href: string }).href}
                    className={`text-foreground hover:text-primary transition-smooth font-medium ${
                      isPathActive((item as { href: string }).href)
                        ? "underline decoration-2 underline-offset-4"
                        : ""
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <Button variant="hero" size="lg" className="mt-4">
                Check Balance
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
