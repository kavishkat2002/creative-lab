import { Link } from "react-router-dom";
import { Linkedin, Twitter, Mail, Facebook, Instagram, ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";
import { ContactSidebar } from "./ContactSidebar";

const footerLinks = {
  quickLinks: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Portfolio", href: "/projects" },
    { label: "Contact", href: "/contact" },
  ],
  services: [
    { label: "Custom Software", href: "/services" },
    { label: "AI & Machine Learning", href: "/services" },
    { label: "Mobile Development", href: "/services" },
    { label: "Web Development", href: "/services" },
    { label: "Cloud & DevOps", href: "/services" },
  ],
  connect: [
    { label: "Schedule a Call", href: "/contact" },
    { label: "Partner with us", href: "/contact" },
    { label: "Contact Us", href: "/contact" },
    { label: "Careers", href: "#", disabled: true },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
];

export function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center mb-6 group">
              <Logo className="scale-110 origin-left" />
            </Link>
            <p className="text-muted-foreground max-w-sm mb-6 leading-relaxed">
              A premium tech consultancy that delivers highly innovative and strategic
              solutions to help businesses scale and thrive.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-xl border border-border hover:border-sky hover:text-sky flex items-center justify-center transition-all hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-foreground mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-coral text-sm transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-display font-bold text-foreground mb-6">Connect Us</h4>
            <ul className="space-y-4">
              {footerLinks.connect.map((link) => (
                <li key={link.label}>
                  {link.label === "Schedule a Call" ? (
                    <Link
                      to="/contact#contact-form"
                      className="text-muted-foreground hover:text-coral text-sm transition-colors inline-flex items-center gap-1 group"
                    >
                      {link.label}
                    </Link>
                  ) : link.label === "Careers" ? (
                    <span className="text-muted-foreground/60 text-sm cursor-default">
                      {link.label}
                    </span>
                  ) : (
                    <ContactSidebar trigger={
                      <button
                        className="text-muted-foreground hover:text-coral text-sm transition-colors inline-flex items-center gap-1 group"
                      >
                        {link.label}
                      </button>
                    } />
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-bold text-foreground mb-6">Our Services</h4>
            <ul className="space-y-4">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-star text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Creativex Technology. All rights reserved
              <Link
                to="/auth"
                className="hover:text-star transition-colors cursor-default ml-[1px]"
              >
                .
              </Link>
            </p>
          </div>
          <div className="flex gap-6">
            <Link to="#" className="text-sm text-muted-foreground hover:text-star transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="text-sm text-muted-foreground hover:text-star transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
