import { motion } from "framer-motion";
import { ArrowRight, MonitorPlay, Target, BarChart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const features = [
  { icon: MonitorPlay, title: "Digital Campaigns", desc: "End-to-end digital advertising campaigns engineered to capture attention and drive conversions." },
  { icon: Target, title: "Precision Targeting", desc: "Reach your exact demographic using hyper-targeted social, search, and programmatic media." },
  { icon: BarChart, title: "Analytics & Growth", desc: "Transparent reporting, rigorous A/B testing, and continuous ROI optimization." },
];

export default function IslandEdge() {
  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-[#020617] relative overflow-hidden flex flex-col pt-24 md:pt-32 pb-20">
      {/* Background Glows utilizing the IslandEdge Logo Colors: Dark Blue (#1d4ed8) and Teal (#0d9488) */}
      <div className="absolute top-0 right-0 w-full md:w-[800px] h-[500px] bg-gradient-to-br from-[#1d4ed8]/20 via-[#0d9488]/15 to-transparent blur-3xl rounded-full -z-10 pointer-events-none transform translate-x-1/4 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 w-full md:w-[600px] h-[600px] bg-gradient-to-tr from-[#0d9488]/20 via-[#1d4ed8]/10 to-transparent blur-3xl rounded-full -z-10 pointer-events-none transform -translate-x-1/4 translate-y-1/4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center space-y-8 mt-12 mb-20 md:mt-24 md:mb-32">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <div className="bg-white/50 dark:bg-white/5 backdrop-blur-md p-6 sm:p-8 md:p-12 rounded-3xl border border-white/20 dark:border-white/10 shadow-2xl shadow-[#1d4ed8]/10 mb-10 w-full max-w-lg md:max-w-2xl mx-auto flex justify-center">
              {/* IslandEdge Logo */}
              <img 
                src="/islandedge-logo.png" 
                alt="IslandEdge Media Logo" 
                className="h-24 md:h-32 w-auto object-contain drop-shadow-lg"
              />
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#1d4ed8]/10 to-[#0d9488]/10 border border-[#0d9488]/20 text-[#1d4ed8] dark:text-[#5eead4] text-sm font-semibold tracking-wide uppercase mb-6 shadow-sm">
              Digital Media Advertising Agency
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black tracking-tight text-slate-900 dark:text-white leading-[1.1] max-w-4xl mx-auto mb-6">
              Ignite Your Brand's <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1d4ed8] to-[#0d9488]">
                Digital Presence
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-center leading-relaxed mb-10">
              We are Starterd Islandedge Media. We blend creative strategy, data-driven targeting, and high-impact media placement to scale your business unreachably fast.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link to="/contact">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto rounded-full px-8 py-6 text-white text-base font-bold shadow-xl transition-all duration-300 border-0 bg-gradient-to-r from-[#1d4ed8] to-[#0d9488] hover:shadow-[#0d9488]/30 hover:-translate-y-1"
                >
                  Start Your Campaign
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="w-full sm:w-auto rounded-full px-8 py-6 text-slate-900 dark:text-white text-base font-bold bg-white/50 dark:bg-white/5 border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 backdrop-blur-sm transition-all"
                >
                  Book a Consultation
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-20">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="bg-white/60 dark:bg-[#0f172a]/60 backdrop-blur-lg border border-slate-200/50 dark:border-white/5 rounded-3xl p-8 hover:shadow-2xl hover:shadow-[#0d9488]/10 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1d4ed8]/10 to-[#0d9488]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-7 h-7 text-[#0d9488] dark:text-[#2dd4bf]" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm md:text-base">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Call to Action Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full bg-gradient-to-r from-[#1d4ed8] to-[#0d9488] rounded-[2rem] p-8 md:p-16 text-center shadow-2xl relative overflow-hidden"
        >
          {/* Decorative shapes inside CTA */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl transform -translate-x-1/2 translate-y-1/2" />
          
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-6 relative z-10">
            Ready to Dominate Your Market?
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-10 relative z-10">
            Join the countless brands scaling with IslandEdge Media's innovative advertising strategies.
          </p>
          <Link to="/contact">
            <Button size="lg" className="rounded-full px-10 py-7 bg-white text-[#1d4ed8] font-bold text-lg hover:bg-slate-50 hover:scale-105 transition-all duration-300 shadow-xl relative z-10 border-0">
              Let's Talk Growth
            </Button>
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
