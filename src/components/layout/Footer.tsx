import { Link } from "react-router-dom";

export const Footer = () => (
  <footer className="border-t py-12 px-4">
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-extrabold tracking-tighter text-lg mb-4">WakeupAI</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            AI-powered cinematic scene prompt generator for video creators.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-3">Product</h4>
          <nav className="flex flex-col gap-2">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Scene Generator
            </Link>
            <Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Blog
            </Link>
          </nav>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-3">Company</h4>
          <nav className="flex flex-col gap-2">
            <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <a href="mailto:hello@wakeupai.in" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
          </nav>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-3">Legal</h4>
          <nav className="flex flex-col gap-2">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link to="/disclaimer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Disclaimer
            </Link>
          </nav>
        </div>
      </div>
      <div className="border-t mt-8 pt-8 text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} WakeupAI. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);
