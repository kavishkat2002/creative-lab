import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactSidebar } from "./ContactSidebar";
import { Logo } from "./Logo";
import { ModeToggle } from "@/components/ui/mode-toggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredHash, setHoveredHash] = useState<string | null>(null);
  const location = useLocation();

  // Check if we're on the home page
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      // Trigger "scrolled" state a bit earlier for a smoother feel
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Force scrolled state on non-home pages for better visibility
  const shouldShowScrolledState = !isHomePage || isScrolled;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 transition-all duration-300 pointer-events-none">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          width: shouldShowScrolledState ? "min(95%, 1280px)" : "100%",
          top: shouldShowScrolledState ? "1rem" : "0rem"
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} // smooth easeOutExpo-like
        className={`pointer-events-auto backdrop-blur-2xl transition-all duration-500 rounded-3xl ${shouldShowScrolledState
          ? "bg-white/95 dark:bg-black/95 shadow-2xl shadow-oxford/20 border border-white/30"
          : "bg-transparent border-transparent"
          }`}
      >
        <div className={`px-4 lg:px-8 transition-all duration-500 ${shouldShowScrolledState ? "py-3" : "py-4"}`}>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center group relative z-10">
              <Logo
                isLight={!shouldShowScrolledState}
                className="group-hover:scale-105 transition-transform duration-300"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/5 backdrop-blur-md">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onMouseEnter={() => setHoveredHash(link.href)}
                    onMouseLeave={() => setHoveredHash(null)}
                    className={`relative px-5 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 z-10 ${isActive
                      ? (shouldShowScrolledState ? "text-oxford dark:text-white" : "text-white")
                      : (shouldShowScrolledState ? "text-slate-600 dark:text-slate-300 hover:text-oxford dark:hover:text-white" : "text-slate-300 hover:text-white")
                      }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activePill"
                        className="absolute inset-0 bg-white/20 rounded-full dark:bg-white/10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    {hoveredHash === link.href && !isActive && (
                      <motion.div
                        layoutId="hoverPill"
                        className="absolute inset-0 bg-white/10 rounded-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center gap-3 relative z-10">
              <div className={!shouldShowScrolledState ? "text-white" : ""}>
                <ModeToggle />
              </div>

              <ContactSidebar
                trigger={
                  <Button variant="ghost" size="icon" className={`rounded-full transition-colors ${!shouldShowScrolledState && "text-white hover:bg-white/10"}`}>
                    <Phone className="w-4 h-4" />
                  </Button>
                }
              />

              <Link to="/contact">
                <Button className="rounded-full px-6 py-5 font-bold shadow-lg shadow-sky/20 hover:shadow-sky/40 hover:-translate-y-0.5 transition-all duration-300 bg-gradient-to-r from-sky to-star border-0 text-white">
                  Get Started
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button - Enhanced Tap Target */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden p-3 rounded-xl transition-colors active:scale-95 ${shouldShowScrolledState ? "hover:bg-slate-100 dark:hover:bg-white/10 text-slate-900 dark:text-white" : "hover:bg-white/10 text-white"
                }`}
              aria-label="Toggle Navigation Menu"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden border-t border-white/10"
            >
              <div className={`p-4 flex flex-col gap-2 ${shouldShowScrolledState ? "bg-white/50" : "bg-black/20"} backdrop-blur-xl`}>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between px-5 py-4 rounded-2xl text-[15px] font-bold transition-all active:scale-95 ${location.pathname === link.href
                      ? "bg-gradient-to-r from-sky/20 to-star/20 text-sky"
                      : shouldShowScrolledState
                        ? "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-oxford dark:hover:text-white"
                        : "text-white/70 hover:bg-white/10 hover:text-white"
                      }`}
                  >
                    {link.label}
                    {location.pathname === link.href && (
                      <motion.div layoutId="mobileActiveDot" className="w-2 h-2 rounded-full bg-sky" />
                    )}
                  </Link>
                ))}

                <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-2" />

                <Link to="/contact" onClick={() => setIsOpen(false)}>
                  <Button className="w-full rounded-xl font-bold bg-gradient-to-r from-sky to-star text-white border-0 shadow-lg shadow-sky/20">
                    Get Started
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}
