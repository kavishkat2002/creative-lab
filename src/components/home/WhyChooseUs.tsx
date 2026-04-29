import { motion } from "framer-motion";
import { Globe, BarChart2, Handshake, Lightbulb, TrendingUp, Settings } from "lucide-react";

const reasons = [
  {
    icon: Globe,
    number: "01",
    title: "Full-Spectrum Digital Expertise",
    description: "From web development to AI solutions — everything under one roof, so you never juggle multiple vendors.",
  },
  {
    icon: BarChart2,
    number: "02",
    title: "Data-Driven Approach",
    description: "Every decision is backed by real analytics and performance data — turning insight into business growth.",
  },
  {
    icon: Handshake,
    number: "03",
    title: "Transparent Communication",
    description: "Clear reporting, honest advice, and regular updates. You're always in the loop — no surprises.",
  },
  {
    icon: Lightbulb,
    number: "04",
    title: "Innovative Solutions",
    description: "We stay ahead of technology trends to deliver modern, future-proof solutions for your business.",
  },
  {
    icon: TrendingUp,
    number: "05",
    title: "Scalable Architecture",
    description: "Built to grow with you. Our systems scale seamlessly from startup to enterprise.",
  },
  {
    icon: Settings,
    number: "06",
    title: "Dedicated Support",
    description: "Ongoing maintenance and support to keep your systems running smoothly — every day.",
  },
];



export function WhyChooseUs() {
  return (
    <section className="relative w-full py-28 bg-[#0b1120] overflow-hidden">

      <div className="container mx-auto px-6 lg:px-8 max-w-6xl relative z-10">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16 pb-16 border-b border-white/10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-xl"
          >
            <p className="text-[#00c896] text-sm font-semibold tracking-widest uppercase mb-4">
              Why Choose Us
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight">
              Why Leading Brands{" "}
              <span className="text-[#00c896]">Choose Us</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-white/40 text-base leading-relaxed max-w-sm lg:text-right"
          >
            We help your business grow with proven, data-led strategies built for long-term impact.
          </motion.p>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06] rounded-2xl overflow-hidden mb-16">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: index * 0.07 }}
              className="group bg-[#0b1120] hover:bg-[#0f1a2e] transition-colors duration-300 p-8"
            >
              {/* Number + Icon row */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-bold tracking-widest text-white/20 group-hover:text-[#00c896]/60 transition-colors">
                  {reason.number}
                </span>
                <div className="w-10 h-10 rounded-lg border border-white/10 group-hover:border-[#00c896]/40 flex items-center justify-center transition-colors duration-300">
                  <reason.icon className="w-5 h-5 text-white/30 group-hover:text-[#00c896] transition-colors duration-300" strokeWidth={1.5} />
                </div>
              </div>

              <h3 className="text-white font-semibold text-base mb-2 leading-snug group-hover:text-[#00c896] transition-colors duration-300">
                {reason.title}
              </h3>
              <p className="text-white/40 text-sm leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>


      </div>
    </section>
  );
}
