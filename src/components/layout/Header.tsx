import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Sun, Moon, X } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const sectionLinks = [
  { label: "Tool", id: "tool" },
  { label: "How It Works", id: "how-it-works" },
  { label: "FAQ", id: "faq" },
];

const pageLinks = [
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const scrollToSection = (id: string) => {
    if (location.pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    }
    setMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-4xl">
        <nav
          className={cn(
            "flex items-center justify-between px-4 sm:px-6 py-2.5 rounded-full border transition-all duration-300",
            "bg-background/70 backdrop-blur-xl",
            scrolled ? "shadow-lg border-border/50" : "border-transparent"
          )}
        >
          <Link to="/" className="text-lg font-extrabold tracking-tighter">
            WakeupAI
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {sectionLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-accent"
              >
                {item.label}
              </button>
            ))}
            {pageLinks.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-accent"
              >
                {item.label}
              </Link>
            ))}
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-8 w-8 relative ml-1"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full h-8 w-8 md:hidden"
            onClick={() => setMenuOpen(true)}
          >
            <Menu className="h-4 w-4" />
          </Button>
        </nav>
      </header>

      {/* Mobile Menu Popup Overlay */}
      {menuOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setMenuOpen(false)}
        >
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-sm bg-background rounded-2xl border shadow-2xl p-6 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <span className="text-lg font-extrabold tracking-tighter">Menu</span>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-8 w-8"
                onClick={() => setMenuOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-col gap-1">
              {sectionLinks.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left px-4 py-3 text-sm font-medium hover:bg-accent rounded-lg transition-colors"
                >
                  {item.label}
                </button>
              ))}
              {pageLinks.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-3 text-sm font-medium hover:bg-accent rounded-lg transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="border-t mt-4 pt-4">
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium hover:bg-accent rounded-lg transition-colors"
              >
                <div className="relative h-4 w-4">
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 absolute" />
                  <Moon className="h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 absolute" />
                </div>
                <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
              </button>
            </div>

            <div className="border-t pt-4 mt-4 space-y-1">
              <Link to="/privacy" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link to="/disclaimer" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
                Disclaimer
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
