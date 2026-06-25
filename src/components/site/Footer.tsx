import { Mail, Phone, Linkedin, Instagram, Facebook, Twitter } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Footer({ className = "" }: { className?: string }) {
  return (
    <footer id="footer" className={`hairline-t pt-16 pb-10 ${className}`}>
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2">
              <span
                className="grid h-10 w-10 place-items-center rounded-full"
                style={{ background: "var(--gradient-gold)" }}
              >
                <span className="font-display text-base font-bold text-[#1B1B1B]">F</span>
              </span>
              <span className="font-display text-2xl font-bold">
                FIN<span className="text-gold-gradient">GOLD</span>
              </span>
            </div>
            <p className="mt-6 max-w-sm text-display text-2xl text-foreground/75">
              Invest in gold. Secure your future.
            </p>
            <div className="mt-8 space-y-3 text-sm text-foreground/70">
              <a
                href="mailto:fingoldgdm@gmail.com"
                className="flex items-center gap-2 hover:text-foreground"
              >
                <Mail className="h-4 w-4" style={{ color: "var(--bronze)" }} />
                fingoldgdm@gmail.com
              </a>
              <a
                href="tel:+919879150287"
                className="flex items-center gap-2 hover:text-foreground"
              >
                <Phone className="h-4 w-4" style={{ color: "var(--bronze)" }} />
                +91 98791 50287
              </a>
            </div>
          </div>
          <div>
            <h4 className="eyebrow-tag">Navigate</h4>
            <ul className="mt-5 space-y-2.5 text-sm text-foreground/70">
              {[
                { label: "Home", href: "/" },
                { label: "Investment Options", href: "/#options" },
                { label: "Calculators", href: "/#tools" },
                { label: "Learning Center", href: "/#learn" },
                { label: "FAQ", href: "/#faq" },
                { label: "Contact", href: "/gold-etfs#contact-form" },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="hover:text-foreground">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="eyebrow-tag">Follow</h4>
            <div className="mt-5 flex gap-3">
              {[
                { Icon: Linkedin, href: "#" },
                {
                  Icon: Instagram,
                  href: "https://www.instagram.com/fingold.online?igsh=eWhhanlhZGVlb3ls",
                },
                { Icon: Facebook, href: "https://www.facebook.com/share/1EbEgxrHC5/" },
                { Icon: Twitter, href: "#" },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  {...(href !== "#" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  aria-label="social"
                  className="grid h-10 w-10 place-items-center rounded-full border border-border/50 transition-colors hover:border-foreground/60"
                >
                  <Icon className="h-4 w-4" style={{ color: "var(--bronze)" }} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="hairline-t mt-14 flex flex-col items-center justify-between gap-4 pt-6 text-xs text-foreground/55 sm:flex-row">
          <p>© {new Date().getFullYear()} Fingold. All rights reserved.</p>
          <p>Crafted for those who plan in generations.</p>
        </div>
      </div>
    </footer>
  );
}
