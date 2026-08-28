import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  Twitter,
  Facebook,
  Linkedin,
  Instagram,
  Mail,
  Send,
  CheckCircle2,
  Clock,
  Sparkles,
  Phone,
  MapPin,
  X
} from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Maintenance() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSendingContact, setIsSendingContact] = useState(false);

  // Target Date: September 7, 2026 00:00:00
  const targetDate = new Date("2026-09-07T00:00:00");

  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      toast.success("Thank you! You'll be notified when we are live.");
    }, 800);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      toast.error("Please fill in all fields.");
      return;
    }

    setIsSendingContact(true);
    setTimeout(() => {
      setIsSendingContact(false);
      toast.success("Message sent! Our team will get back to you shortly.");
      setIsContactOpen(false);
      setContactForm({ name: "", email: "", message: "" });
    }, 900);
  };

  const pad = (num: number) => String(num).padStart(2, "0");

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between items-center text-white overflow-hidden select-none bg-slate-950">
      {/* Background Image with Parallax / Zoom styling */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{
          backgroundImage: `url('/maintenance-bg.jpg')`,
        }}
      >
        {/* Soft overlay gradient to ensure readability and match the template reference */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/75 backdrop-blur-[0.5px]" />
      </div>


      {/* Company Logo on side */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-6 left-6 sm:top-8 sm:left-10 z-20 flex items-center gap-3"
      >
        <img
          src="/creativex-logo.png"
          alt="Company Logo"
          className="h-20 sm:h-24 md:h-28 lg:h-32 w-auto object-contain drop-shadow-2xl brightness-110"
        />
      </motion.div>
      <main className="relative z-10 w-full max-w-3xl mx-auto px-4 py-8 flex flex-col items-center justify-center text-center my-auto">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-white drop-shadow-lg mb-4"
        >
          Maintenance Mode
        </motion.h1>

        {/* Subtitle / Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-white/90 text-base sm:text-lg md:text-xl font-light space-y-1 mb-8 sm:mb-10 drop-shadow max-w-xl"
        >
          <p>Creativex Technology is undergoing scheduled maintenance.</p>
          <p className="text-white/80">Sorry for the inconvenience.</p>
        </motion.div>

        {/* Countdown Timer Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full max-w-xl mx-auto mb-10"
        >
          <div className="bg-black/30 backdrop-blur-md rounded-2xl border border-white/20 p-4 sm:p-6 shadow-2xl">
            {/* Primary numeric countdown matching reference style */}
            <div className="flex items-center justify-center gap-2 sm:gap-4 text-3xl sm:text-5xl md:text-6xl font-extralight tracking-wider text-white drop-shadow-md">
              <div className="flex flex-col items-center">
                <span className="font-mono">{pad(timeLeft.days)}</span>
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-white/70 mt-1 font-sans">
                  Days
                </span>
              </div>
              <span className="text-white/50 -translate-y-2 font-mono">:</span>
              <div className="flex flex-col items-center">
                <span className="font-mono">{pad(timeLeft.hours)}</span>
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-white/70 mt-1 font-sans">
                  Hours
                </span>
              </div>
              <span className="text-white/50 -translate-y-2 font-mono">:</span>
              <div className="flex flex-col items-center">
                <span className="font-mono">{pad(timeLeft.minutes)}</span>
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-white/70 mt-1 font-sans">
                  Minutes
                </span>
              </div>
              <span className="text-white/50 -translate-y-2 font-mono">:</span>
              <div className="flex flex-col items-center">
                <span className="font-mono">{pad(timeLeft.seconds)}</span>
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-white/70 mt-1 font-sans">
                  Seconds
                </span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-center gap-1.5 text-xs text-white/70 font-light">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Target Launch: September 7, 2026</span>
            </div>
          </div>
        </motion.div>

        {/* Notify Me & Email Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="w-full max-w-lg mx-auto mb-10"
        >
          <p className="text-sm sm:text-base text-white/90 font-light mb-3 drop-shadow">
            Notify me when it's ready
          </p>

          {isSubscribed ? (
            <div className="flex items-center justify-center gap-2 p-3 bg-emerald-500/20 border border-emerald-400/40 rounded-xl backdrop-blur-md text-emerald-200 text-sm font-medium">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>You're all set! We will notify you once we are back online.</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row items-stretch overflow-hidden rounded-xl border border-white/30 bg-black/30 backdrop-blur-md shadow-2xl focus-within:border-white/70 transition-all"
            >
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your e-mail..."
                  className="w-full h-12 px-4 py-2 bg-transparent text-white placeholder-white/50 text-sm focus:outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="h-12 px-7 bg-white hover:bg-white/90 active:bg-white/80 text-slate-900 font-medium text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-75 cursor-pointer shadow-md"
              >
                {isSubmitting ? (
                  <span className="inline-block w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                ) : (
                  "Subscribe"
                )}
              </button>
            </form>
          )}
        </motion.div>

        {/* Social Icons matching reference */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex items-center justify-center gap-6 mb-8"
        >
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-white hover:scale-110 transition-transform p-2"
            aria-label="Twitter"
          >
            <Twitter className="w-5 h-5 drop-shadow" />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-white hover:scale-110 transition-transform p-2"
            aria-label="Facebook"
          >
            <Facebook className="w-5 h-5 drop-shadow" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-white hover:scale-110 transition-transform p-2"
            aria-label="Instagram"
          >
            <Instagram className="w-5 h-5 drop-shadow" />
          </a>
          <a
            href="https://www.linkedin.com/company/creativex-technology/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-white hover:scale-110 transition-transform p-2"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5 drop-shadow" />
          </a>
        </motion.div>

        {/* Contact Us Button matching reference */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <button
            onClick={() => setIsContactOpen(true)}
            className="px-8 py-2.5 rounded-lg border border-white/80 bg-black/20 hover:bg-white hover:text-slate-900 text-white font-medium text-sm tracking-wide backdrop-blur-sm transition-all duration-300 shadow-lg active:scale-95 cursor-pointer"
          >
            Contact Us
          </button>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full py-6 px-4 text-center text-xs text-white/60">
        <p>© 2026 Creativex Technology. All rights reserved.</p>
      </footer>

      {/* Contact Us Modal Dialog */}
      <AnimatePresence>
        {isContactOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsContactOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-slate-900/90 border border-white/20 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl z-10 text-white"
            >
              <button
                onClick={() => setIsContactOpen(false)}
                className="absolute top-4 right-4 p-2 text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <h3 className="text-2xl font-light text-white mb-2">Get in Touch</h3>
                <p className="text-sm text-white/70">
                  Have an urgent inquiry? Send us a direct message.
                </p>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-white/80 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, name: e.target.value })
                    }
                    placeholder="John Doe"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-white/60 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/80 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, email: e.target.value })
                    }
                    placeholder="john@example.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-white/60 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/80 mb-1">
                    Message
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={contactForm.message}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, message: e.target.value })
                    }
                    placeholder="How can we help you?"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-white/60 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSendingContact}
                  className="w-full py-3 bg-white text-slate-900 rounded-lg font-medium text-sm hover:bg-white/90 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-75"
                >
                  {isSendingContact ? (
                    <span className="inline-block w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
