
import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image_url: string;
  project_url?: string;
}

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

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
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className="group relative h-full perspective-1000"
    >
      {/* Glassy Card */}
      <div
        className="h-full rounded-3xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-md shadow-lg transition-all duration-200 flex flex-col"
        style={{ transform: "translateZ(50px)" }}
      >

        {/* Image Section */}
        <div className="relative aspect-video overflow-hidden" style={{ transform: "translateZ(20px)" }}>
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10 opacity-60" />
          {project.image_url.includes('/video/') || project.image_url.endsWith('.mp4') ? (
            <video
              src={project.image_url}
              className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
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
              className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
            />
          )}

          {/* Category Badge on Image */}
          <div className="absolute top-4 left-4 z-20" style={{ transform: "translateZ(30px)" }}>
            <span className="px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase bg-black/50 backdrop-blur-md text-white border border-white/10">
              {project.category}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5 md:p-6 flex flex-col flex-grow" style={{ transform: "translateZ(20px)" }}>
          <div className="mb-3">
            <h3 className="font-display text-[1rem] md:text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Actions */}
          <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
            {project.project_url ? (
              <a
                href={project.project_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-primary flex items-center gap-2 hover:underline"
              >
                Visit Live <ExternalLink className="w-3 h-3" />
              </a>
            ) : (
              <span className="text-xs text-muted-foreground">Case Study</span>
            )}

            <Link to={`/projects/${project.id}`}>
              <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full hover:bg-primary/20 hover:text-primary">
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export function ProjectsShowcase() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("id, title, category, description, image_url, project_url")
        .eq("is_featured", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-24 relative overflow-hidden" style={{ perspective: "2000px" }}>
      {/* Background Blobs for Glassy Effect */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky/20 rounded-full blur-[128px] -z-10" />

      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Latest <span className="gradient-text">Project</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Showcasing our latest successes and digital transformations.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 mb-12">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/projects">
            <Button
              variant="secondary"
              className="rounded-full px-6 bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 text-foreground"
            >
              View Full Portfolio
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
