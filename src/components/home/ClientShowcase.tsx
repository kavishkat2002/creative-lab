import { motion } from "framer-motion";
import { Youtube, Box, PenTool, Smartphone, Monitor, Database, Cloud } from "lucide-react";

const clients = [
  {
    name: "amazon",
    logo: (
      <div className="flex items-center gap-1 opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
        <span className="font-bold text-[28px] tracking-tighter lowercase leading-none mt-1">
          amazon
        </span>
      </div>
    ),
  },
  {
    name: "android",
    logo: (
      <div className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 text-foreground">
        <span className="font-semibold text-[26px] tracking-tight lowercase">
          android
        </span>
        <Smartphone className="w-8 h-8 -ml-1 text-[#3DDC84]" />
      </div>
    ),
  },
  {
    name: "WordPress",
    logo: (
      <div className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 text-foreground">
        <div className="w-8 h-8 rounded-full border-[3px] border-current flex items-center justify-center text-[#21759b]">
          <span className="font-serif font-bold text-xl leading-none italic pr-0.5">W</span>
        </div>
        <span className="font-serif italic font-bold text-[26px] tracking-tight">
          WordPress
        </span>
      </div>
    ),
  },
  {
    name: "Dropbox",
    logo: (
      <div className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 text-foreground">
        <Box className="w-8 h-8 text-[#0061FF]" />
        <span className="font-bold text-[26px] tracking-tight">Dropbox</span>
      </div>
    ),
  },
  {
    name: "YouTube",
    logo: (
      <div className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 text-foreground">
        <Youtube className="w-9 h-9 text-[#FF0000]" />
        <span className="font-bold text-[26px] tracking-tighter">YouTube</span>
      </div>
    ),
  },
  // Add some generic high-tech ones to fill the loop out
  {
    name: "Microsoft",
    logo: (
      <div className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 text-foreground">
        <div className="grid grid-cols-2 gap-0.5 w-6 h-6 mr-1">
          <div className="bg-[#f35325] w-full h-full"></div>
          <div className="bg-[#81bc06] w-full h-full"></div>
          <div className="bg-[#05a6f0] w-full h-full"></div>
          <div className="bg-[#ffba08] w-full h-full"></div>
        </div>
        <span className="font-semibold text-[26px] tracking-tight">Microsoft</span>
      </div>
    ),
  },
  {
    name: "Slack",
    logo: (
      <div className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 text-foreground">
        <span className="font-black text-[28px] tracking-tight text-foreground">
          #slack
        </span>
      </div>
    ),
  },
];

// Double array for seamless infinite marquee loop
const extendedClients = [...clients, ...clients];

export function ClientShowcase() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
        
        {/* Header Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="text-muted-foreground font-bold text-xs uppercase tracking-widest mb-4">
            Our Clients
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Trusted by over <span className="text-sky">10+</span> clients.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Our clients are our top priority, and we are committed to providing them with the highest level of service and innovative digital solutions.
          </p>
        </motion.div>

        {/* Endless Marquee Wrapper */}
        <div className="relative mt-20">
          
          {/* Gradient fading edges for smooth enter/exit of the marquee */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          {/* Scrolling Marquee */}
          <div className="flex overflow-hidden relative">
            <motion.div
              className="flex items-center gap-8 md:gap-16 lg:gap-24 w-max pr-8 md:pr-16 lg:pr-24"
              animate={{
                x: ["0%", "-50%"],
              }}
              transition={{
                duration: 25,
                ease: "linear",
                repeat: Infinity,
              }}
            >
              {extendedClients.map((client, i) => (
                <div 
                  key={`${client.name}-${i}`} 
                  className="flex items-center justify-center shrink-0 min-w-[200px] h-28 rounded-2xl modern-card border border-white/5 hover:border-sky/40 hover:bg-muted/30 transition-all duration-300 cursor-pointer"
                >
                  {client.logo}
                </div>
              ))}
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
