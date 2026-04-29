import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-star via-indigo-deep to-oxford" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Book your free<br />
              Consultation now
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-md leading-relaxed">
              Ready to elevate your brand with cutting-edge solutions? Schedule
              a call with our experts and take the first step toward success!
            </p>
            <Link to="/contact#contact-form">
              <Button
                size="lg"
                className="rounded-full px-8 py-6 bg-white text-oxford hover:bg-white/90 font-bold transition-all hover:scale-105 active:scale-95"
              >
                Schedule a Call
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>

          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="hidden lg:flex justify-center"
          >
            <div className="relative w-full max-w-md overflow-hidden">
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 shadow-2xl">
                {/* Mock calendar UI */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-6">
                    <div className="h-4 w-32 bg-white/20 rounded-full" />
                    <Calendar className="w-6 h-6 text-sky" />
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {[...Array(28)].map((_, i) => (
                      <div
                        key={i}
                        className={`aspect-square rounded-xl flex items-center justify-center text-sm ${i === 14
                          ? "bg-sky text-white font-bold shadow-lg shadow-sky/30 ring-4 ring-sky/10"
                          : "bg-white/5 text-white/40"
                          }`}
                      >
                        {i === 14 ? (
                          <span className="text-xs font-bold">15</span>
                        ) : (
                          <span className="text-[10px]">{i + 1}</span>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 space-y-2">
                    <div className="h-2 w-full bg-white/10 rounded-full" />
                    <div className="h-2 w-3/4 bg-white/10 rounded-full" />
                    <div className="h-2 w-1/2 bg-white/10 rounded-full" />
                  </div>
                </div>
              </div>
              {/* Floating element - now clipped by parent overflow */}
              <Link to="/contact#contact-form">
                <div className="absolute -right-4 top-8 bg-white rounded-2xl shadow-2xl p-4 border border-border transition-all hover:-rotate-2 hover:scale-105 hover:shadow-sky/20 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-sky/10 flex items-center justify-center">
                      <span className="text-lg">🗓️</span>
                    </div>
                    <div>
                      <p className="font-bold text-sm text-oxford">Click to Book</p>
                      <p className="text-xs text-star font-medium">10:00 AM</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
