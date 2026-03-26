import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue } from "framer-motion";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HeroScene } from "@/components/three/HeroScene";
import { useRef, Suspense, useEffect } from "react";
import { Logo } from "../layout/Logo";

const stats = [
  { value: "01", label: "Years of Experience", suffix: "+" },
  { value: "15", label: "Projects Completed", suffix: "+" },
  { value: "10", label: "Happy Clients", suffix: "+" },
  { value: "05", label: "Team Members", suffix: "+" },
];

function AnimatedCounter({ value, suffix }: { value: string; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 60, stiffness: 80 });
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const numericValue = parseInt(value.replace(/\D/g, ''));
      motionValue.set(numericValue);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        // Format with leading zero if original had it (simple check for length 2 and < 10)
        let formatted = Math.floor(latest).toString();
        if (value.startsWith('0') && latest < 10) {
          formatted = '0' + formatted;
        }
        ref.current.textContent = formatted + suffix;
      }
    });
    return () => unsubscribe();
  }, [springValue, suffix, value]);

  return (
    <span
      ref={ref}
      className="stat-number inline-block"
    >
      0{suffix}
    </span>
  );
}

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yValue = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacityValue = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  const y = useSpring(yValue, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const opacity = useSpring(opacityValue, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[100dvh] md:min-h-screen flex flex-col bg-black overflow-hidden"
    >
      {/* Dark midnight base layer */}
      <div className="absolute inset-0 w-full h-full bg-black z-0" />
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_rgba(14,165,233,0.15),transparent_70%)]" />
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_rgba(99,102,241,0.1),transparent_70%)]" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 w-full h-full opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* 3D Scene */}
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>

      {/* Main content */}
      <motion.div
        style={{ y, opacity }}
        className="flex-1 flex items-center justify-center w-full px-4 sm:px-6 lg:px-8 xl:px-16 relative z-10 pt-32 pb-8 md:pt-32 md:pb-12"
      >
        <div className="max-w-7xl mx-auto text-center">
          {/* Main Heading with 3D effect */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.15] mb-6 tracking-tight"
          >
            <span className="text-white/90">Empowering</span>
            <br />
            <span
              className="relative inline-block mt-3 text-white/95"
            >
              Digital Evolution
            </span>
          </motion.h1>


          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-base md:text-lg lg:text-xl text-white/60 max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed px-4"
          >
            We build reliable, scalable software and AI solutions that help ambitious businesses grow faster and smarter.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 px-4"
          >
            <Link to="/contact#contact-form">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="btn-gradient text-white border-0 rounded-full px-6 py-5 md:px-8 md:py-6 text-sm md:text-base font-semibold group hover:shadow-lg hover:shadow-sky/25 transition-all w-full sm:w-auto"
                >
                  Book a Free Consultation
                  <motion.span
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                  </motion.span>
                </Button>
              </motion.div>
            </Link>
            <Link to="/contact#contact-form">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-6 py-5 md:px-8 md:py-6 text-sm md:text-base font-semibold bg-white/5 border-white/20 text-white hover:bg-white/10 hover:text-white backdrop-blur-sm w-full sm:w-auto"
                >
                  Request a Demo
                </Button>
              </motion.div>
            </Link>
          </motion.div>

        </div>
      </motion.div>

      {/* Stats Section with glassmorphism */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="relative z-10 border-t border-white/5 w-full flex-shrink-0 pb-12"
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-16 py-8 md:py-6">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.05, y: -8 }}
                className="text-center p-4 sm:p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-sky/40 transition-all duration-300 hover:shadow-xl hover:shadow-sky/10 hover:bg-white/10 cursor-default group flex flex-col justify-center min-h-[100px] sm:min-h-[120px] overflow-hidden"
              >
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <p className="text-[10px] sm:text-xs md:text-sm text-slate-300 font-bold mt-2 md:mt-3 group-hover:text-white transition-colors uppercase tracking-widest leading-tight">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section >
  );
}
