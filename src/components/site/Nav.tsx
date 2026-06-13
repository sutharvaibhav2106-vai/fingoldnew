import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/#", label: "Home" },
  { href: "/#why", label: "Why Gold" },
  { href: "/#options", label: "Investments" },
  { href: "/#tools", label: "Calculators" },
  { href: "/#learn", label: "Learn" },
  { href: "/#faq", label: "FAQ" },
];

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto mt-4 max-w-7xl px-4 relative">
        <nav className="glass-light flex items-center justify-between rounded-full px-5 py-3">
          <Link to="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
            <span className="grid h-9 w-9 place-items-center rounded-full" style={{ background: "var(--gradient-gold)" }}>
              <span className="font-display text-sm font-bold text-[#1B1B1B]">F</span>
            </span>
            <span className="font-display text-lg font-bold tracking-tight">
              FIN<span className="text-gold-gradient">GOLD</span>
            </span>
          </Link>
          
          {/* Desktop Nav Links */}
          <ul className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-sm text-foreground/70 transition-colors hover:text-foreground">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA Button */}
          <div className="hidden md:block">
            <a href="#cta" className="btn-gold btn-gold-hover btn-shine rounded-full px-5 py-2.5 text-sm font-semibold inline-flex items-center justify-center">
              Start Investing
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="grid h-9 w-9 place-items-center rounded-full border border-border/40 bg-white/40 hover:bg-white/80 transition-colors md:hidden text-foreground/70 hover:text-foreground cursor-pointer"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {/* Mobile menu overlay */}
        {isOpen && (
          <div className="glass-light absolute top-full inset-x-4 mt-2 rounded-3xl p-6 shadow-soft md:hidden animate-fade-in border border-[#D4AF37]/25 z-50">
            <ul className="flex flex-col gap-4">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-base font-semibold text-foreground/80 hover:text-foreground py-1 transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="pt-4 border-t border-border/40">
                <a
                  href="#cta"
                  onClick={() => setIsOpen(false)}
                  className="btn-gold btn-gold-hover btn-shine rounded-2xl w-full py-3 text-sm font-semibold flex items-center justify-center"
                >
                  Start Investing
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
