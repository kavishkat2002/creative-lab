
import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";

import { supabase } from "@/integrations/supabase/client";
import { Loader2, ExternalLink, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image_url: string;
  challenge?: string;
  solution?: string;
  results?: string[];
  testimonial_quote?: string;
  testimonial_author?: string;
  testimonial_role?: string;
  project_url?: string;
}

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className="group relative h-full perspective-1000 min-h-[350px]"
    >
      <div
        className="h-full rounded-2xl overflow-hidden bg-card border border-border shadow-soft hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
        style={{ transform: "translateZ(20px)" }}
      >
        <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-900">
          {project.image_url.includes('/video/') || project.image_url.endsWith('.mp4') ? (
            <video
              src={project.image_url}
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
              muted
              loop
              playsInline
              onMouseOver={event => (event.target as HTMLVideoElement).play()}
              onMouseOut={event => (event.target as HTMLVideoElement).pause()}
            />
          ) : (
            <img
              src={project.image_url}
              alt={project.title}
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
            />
          )}

          <div className="absolute top-4 left-4 z-20">
            <span className="px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase bg-black/60 backdrop-blur-md text-white border border-white/10">
              {project.category}
            </span>
          </div>
        </div>

        <div className="p-5 md:p-6 flex flex-col flex-grow relative z-20 bg-card">
          <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 md:line-clamp-3 mb-4 leading-relaxed">
            {project.description}
          </p>

          <div className="mt-auto flex items-center justify-between pt-4 border-t border-border">
            {project.project_url ? (
              <a
                href={project.project_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-primary flex items-center gap-2 hover:underline"
              >
                Visit Live <ExternalLink className="w-3 h-3" />
              </a>
            ) : (
              <span className="text-xs font-semibold text-muted-foreground">View Case Study</span>
            )}
            <Link to={`/projects/${project.id}`}>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-primary/20 hover:text-primary">
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(p => p.category === activeCategory));
    }
  }, [activeCategory, projects]);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProjects(data || []);
      setFilteredProjects(data || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const categories = ["All", ...Array.from(new Set(projects.map(p => p.category)))];

  return (
    <>
      <SEO 
        title="Portfolio & Case Studies | Creativex Technology"
        description="Discover our latest AI products, scalable web apps, and enterprise software solutions. See how we drive digital transformation for global clients."
        url="https://creativex.technology/projects"
      />
      <section className="py-24 pt-32 min-h-screen relative overflow-hidden">
        {/* Ambient Background */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-[128px] -z-10" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-sky/10 rounded-full blur-[128px] -z-10" />

        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <p className="text-sky font-bold text-xs uppercase tracking-widest mb-3">Our Portfolio</p>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 text-foreground">
              Selected <span className="gradient-text">Works</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Explore our diverse range of projects, from web applications and brand identities
              to digital marketing campaigns.
            </p>
          </motion.div>

          {/* Filter Categories */}
          {!isLoading && projects.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${activeCategory === category
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105"
                    : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}

          {/* Projects Grid */}
          <div className="min-h-[400px]">
            {isLoading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">No projects found.</p>
              </div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                <AnimatePresence>
                  {filteredProjects.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;
