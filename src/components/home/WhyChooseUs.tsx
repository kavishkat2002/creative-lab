import { motion } from "framer-motion";
import { Globe, BarChart2, Handshake, Lightbulb, TrendingUp, Settings } from "lucide-react";

const reasons = [
  {
    icon: Globe,
    title: "Full-Spectrum Digital Expertise",
    description: "From web development to AI solutions — we deliver comprehensive digital services under one roof.",
  },
  {
    icon: BarChart2,
    title: "Data-Driven Approach",
    description: "We don't guess. Every solution is powered by real data, analytics, and performance insights.",
  },
  {
    icon: Handshake,
    title: "Transparent Communication",
    description: "You're always in the loop. Clear reporting, regular updates, and honest advice come standard.",
  },
  {
    icon: Lightbulb,
    title: "Innovative Solutions",
    description: "We stay ahead of technology trends to deliver cutting-edge solutions for your business.",
  },
  {
    icon: TrendingUp,
    title: "Scalable Architecture",
    description: "Built to grow with you. Our solutions scale seamlessly as your business expands.",
  },
  {
    icon: Settings,
    title: "Dedicated Support",
    description: "24/7 support and maintenance to ensure your systems run smoothly at all times.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="relative w-full py-24 overflow-hidden">
      {/* Darker, Richer Background Layers */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#0a0e27] via-[#0f1535] to-[#050816]" />
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-sky/30 via-transparent to-transparent" />
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-indigo-deep/40 via-transparent to-transparent" />

      {/* Grid Pattern Overlay - More Visible */}
      <div
        className="absolute inset-0 w-full h-full opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 bracket-heading">
            Why Leading Brands{" "}
            <span className="gradient-text">Choose Us</span>
          </h2>
          <p className="text-lg text-white/70 leading-relaxed">
            We help your business grow with proven, data-led strategies.
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white/[0.08] backdrop-blur-md border border-white/20 rounded-3xl p-6 md:p-8 hover:border-sky/50 transition-all hover:bg-white/[0.12] hover:shadow-2xl hover:shadow-sky/20 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky/30 to-star/30 border border-sky/30 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-sky/40 transition-all duration-300">
                <reason.icon className="w-7 h-7 text-sky group-hover:text-white" strokeWidth={2} />
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-sky transition-colors">
                {reason.title}
              </h3>
              <p className="text-white/70 leading-relaxed group-hover:text-white/90 transition-colors">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
