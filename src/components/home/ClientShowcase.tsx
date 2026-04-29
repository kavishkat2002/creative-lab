import { motion } from "framer-motion";

const clients = [
  {
    name: "ClientPlus",
    logo: (
      <div className="flex items-center justify-center h-full w-full opacity-70 hover:opacity-100 transition-all duration-300 grayscale hover:grayscale-0 p-4">
        <img src="/client-plus.jpg" alt="Client+" className="h-10 md:h-12 w-auto object-contain mix-blend-multiply dark:invert dark:mix-blend-screen" />
      </div>
    ),
  },
  {
    name: "MohanTrader",
    logo: (
      <div className="flex items-center justify-center h-full w-full opacity-70 hover:opacity-100 transition-all duration-300 grayscale hover:grayscale-0 p-4">
        <img src="/mohan-trader.png" alt="MohanTrader" className="h-14 md:h-16 w-auto object-contain mix-blend-screen" />
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
  {
    name: "IslandEdge",
    logo: (
      <div className="flex items-center justify-center h-full w-full opacity-70 hover:opacity-100 transition-all duration-300 grayscale hover:grayscale-0 p-4">
        <img src="/islandedge-logo.png" alt="IslandEdge" className="h-10 md:h-12 w-auto object-contain" />
      </div>
    ),
  },
  {
    name: "AKKAYA",
    logo: (
      <div className="flex items-center gap-1 opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 text-foreground">
        <span className="font-black text-[24px] tracking-[0.3em] uppercase flex items-center">
          AKKAYA
        </span>
      </div>
    ),
  },
  {
    name: "AGrupe",
    logo: (
      <div className="flex items-center justify-center h-full w-full opacity-70 hover:opacity-100 transition-all duration-300 grayscale hover:grayscale-0 p-4">
        <img src="/a-grupe-logo.png" alt="A Grupe" className="h-16 md:h-20 w-auto object-contain" />
      </div>
    ),
  },
  {
    name: "Keystone",
    logo: (
      <div className="flex items-center justify-center h-full w-full opacity-70 hover:opacity-100 transition-all duration-300 grayscale hover:grayscale-0 p-4">
        <img src="/keystone-logo.png" alt="Keystone Capital" className="h-14 md:h-16 w-auto object-contain" />
      </div>
    ),
  },
  {
    name: "USCarSales",
    logo: (
      <div className="flex items-center justify-center h-full w-full opacity-70 hover:opacity-100 transition-all duration-300 grayscale hover:grayscale-0 p-4">
        <img src="/us-car-sales-logo.png" alt="US Car Sales" className="h-16 md:h-20 w-auto object-contain" />
      </div>
    ),
  },
  {
    name: "JohnstonPrams",
    logo: (
      <div className="flex items-center justify-center h-full w-full opacity-70 hover:opacity-100 transition-all duration-300 grayscale hover:grayscale-0 p-4">
        <img src="/johnston-prams-logo.png" alt="Johnston Prams" className="h-12 md:h-14 w-auto object-contain" />
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
