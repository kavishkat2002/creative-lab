
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Calendar, User, Tag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

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
    created_at: string;
}

const renderContent = (text: string | undefined) => {
    if (!text) return null;

    // Check if the text has our custom list structure: e.g. containing emojis with dashes/colons.
    const emojiPattern = /(\p{Emoji_Presentation})/gu;
    const parts = text.split(emojiPattern);

    if (parts.length > 1) {
        const intro = parts[0].trim();
        const listItems: { emoji: string; content: string }[] = [];
        
        for (let i = 1; i < parts.length; i += 2) {
            const emoji = parts[i];
            let content = parts[i + 1] || "";
            listItems.push({ emoji, content });
        }

        // Clean up the last item if it has trailing paragraphs/conclusion text
        let conclusion = "";
        if (listItems.length > 0) {
            const lastItem = listItems[listItems.length - 1];
            // Split by ")" if it is followed by a capitalized sentence, or period, or a space followed by a capitalized sentence starter
            const match = lastItem.content.match(/(.*?\))\s+([A-Z].*)/s) || 
                          lastItem.content.match(/(.*?\.)\s+([A-Z].*)/s) ||
                          lastItem.content.match(/(.*?[a-z0-9])\s+((?:The|This|Our|We|With|All|It|Everything|Every|System|They|In|As|By|For|To|At|Each|Your|These)\b.*)/s);
            if (match) {
                lastItem.content = match[1];
                conclusion = match[2];
            }
        }

        // Clean up leading/trailing spaces and commas
        listItems.forEach(item => {
            item.content = item.content.trim().replace(/,\s*$/, '').replace(/\s*,\s*$/, '').trim();
        });

        return (
            <div className="space-y-4">
                {intro && <p className="mb-4">{intro}</p>}
                <ul className="space-y-4 my-4 pl-1">
                    {listItems.map((item, idx) => {
                        // Look for a dash or colon separating the bullet point title from description
                        const dashIndex = item.content.indexOf('–') !== -1 ? item.content.indexOf('–') : item.content.indexOf('-');
                        if (dashIndex !== -1) {
                            const title = item.content.substring(0, dashIndex).trim();
                            const desc = item.content.substring(dashIndex + 1).trim();
                            return (
                                <li key={idx} className="flex items-start gap-3 text-base md:text-lg">
                                    <span className="text-xl shrink-0 mt-0.5">{item.emoji}</span>
                                    <span>
                                        <strong className="text-foreground font-semibold">{title}</strong>
                                        {desc && <span className="text-muted-foreground"> – {desc}</span>}
                                    </span>
                                </li>
                            );
                        }
                        return (
                            <li key={idx} className="flex items-start gap-3 text-base md:text-lg">
                                <span className="text-xl shrink-0 mt-0.5">{item.emoji}</span>
                                <span className="text-muted-foreground">{item.content}</span>
                            </li>
                        );
                    })}
                </ul>
                {conclusion && <p className="mt-4">{conclusion}</p>}
            </div>
        );
    }

    // Default: split by double newlines to make paragraphs
    return text.split('\n\n').map((para, i) => (
        <p key={i} className="mb-4 last:mb-0">{para}</p>
    ));
};

const STATIC_PROJECTS: Record<string, Project> = {
  "meta-tech-provider": {
    id: "meta-tech-provider",
    title: "Meta Tech Provider",
    category: "Partnership & Certification",
    description: "CreativeX Technology is recognized as a Meta Tech Provider, offering hyper-optimized Facebook & Instagram advertising tech integrations, marketing API setups, and data-driven targeting strategies.",
    image_url: "/meta-tech-provider-badge.png",
    challenge: "Developing and maintaining advanced API integrations with Meta's ad platforms to support enterprise clients.",
    solution: "Built a robust, direct API connection and data pipelines with Meta Business Manager to automate campaigns, track conversions with pixel/conversion APIs, and optimize performance.",
    results: [
      "Certified Meta Tech Provider",
      "Direct Conversion API integrations",
      "Enhanced tracking accuracy by 40%",
      "Faster campaign automation"
    ],
    created_at: "2026-05-22T00:00:00.000Z",
  }
};

const ProjectDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [project, setProject] = useState<Project | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetchProject(id);
        }
    }, [id]);

    const fetchProject = async (projectId: string) => {
        if (STATIC_PROJECTS[projectId]) {
            setProject(STATIC_PROJECTS[projectId]);
            setIsLoading(false);
            return;
        }
        try {
            const { data, error } = await supabase
                .from("projects")
                .select("*")
                .eq("id", projectId)
                .single();

            if (error) throw error;
            setProject(data);
        } catch (error) {
            console.error("Error fetching project:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <>
                <div className="min-h-screen flex items-center justify-center">
                    <Loader2 className="w-10 h-10 animate-spin text-primary" />
                </div>
            </>
        );
    }

    if (!project) {
        return (
            <>
                <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
                    <h1 className="text-2xl font-bold">Project Not Found</h1>
                    <Link to="/projects">
                        <Button>Return to Portfolio</Button>
                    </Link>
                </div>
            </>
        );
    }

    return (
        <>
            <article className="min-h-screen pt-24 pb-20 relative overflow-hidden">
                {/* Background Gradients */}
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary/5 to-transparent -z-10" />

                <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
                    {/* Back Button */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="mb-8"
                    >
                        <Link to="/projects">
                            <Button variant="ghost" className="hover:bg-primary/10 group">
                                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                                Back to Projects
                            </Button>
                        </Link>
                    </motion.div>

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mb-8"
                    >
                        <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1 bg-secondary/50 px-3 py-1 rounded-full">
                                <Tag className="w-3 h-3" />
                                {project.category}
                            </span>
                            <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(project.created_at).toLocaleDateString()}
                            </span>
                        </div>
                        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground leading-tight">
                            {project.title}
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
                            {project.description}
                        </p>
                    </motion.div>

                    {/* Actions */}
                    {project.project_url && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mb-12"
                        >
                            <a href={project.project_url} target="_blank" rel="noopener noreferrer">
                                <Button size="lg" className="rounded-full shadow-lg shadow-primary/20">
                                    Visit Live Project <ExternalLink className="w-4 h-4 ml-2" />
                                </Button>
                            </a>
                        </motion.div>
                    )}

                    {/* Featured Image */}
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="rounded-3xl overflow-hidden shadow-2xl mb-16 border border-white/10 aspect-video bg-black/50"
                    >
                        {project.image_url.includes('/video/') || project.image_url.endsWith('.mp4') ? (
                            <video
                                src={project.image_url}
                                className="w-full h-full object-contain"
                                controls
                                autoPlay
                                muted
                                loop
                            />
                        ) : (
                            <img
                                src={project.image_url}
                                alt={project.title}
                                className="w-full h-full object-cover"
                            />
                        )}
                    </motion.div>

                    {/* Case Study Content */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="grid md:grid-cols-3 gap-12"
                    >
                        {/* Left Column: Challenge & Solution */}
                        <div className="md:col-span-2 space-y-12">
                            {(project.challenge) && (
                                <section className="space-y-4">
                                    <h2 className="font-display text-2xl font-bold flex items-center gap-3">
                                        <span className="w-8 h-1 bg-primary rounded-full" />
                                        The Challenge
                                    </h2>
                                    <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed text-lg">
                                        {renderContent(project.challenge)}
                                    </div>
                                </section>
                            )}

                            {(project.solution) && (
                                <section className="space-y-4">
                                    <h2 className="font-display text-2xl font-bold flex items-center gap-3">
                                        <span className="w-8 h-1 bg-sky rounded-full" />
                                        Our Solution
                                    </h2>
                                    <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed text-lg">
                                        {renderContent(project.solution)}
                                    </div>
                                </section>
                            )}
                        </div>

                        {/* Right Column: Results & Testimonial */}
                        <div className="space-y-8">
                            {project.results && project.results.length > 0 && (
                                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
                                    <h3 className="font-bold text-lg mb-6 uppercase tracking-wider">Key Results</h3>
                                    <ul className="space-y-4">
                                        {project.results.map((result, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center shrink-0 mt-0.5">
                                                    <span className="text-xs font-bold">✓</span>
                                                </div>
                                                <span className="text-foreground/90 leading-tight">{result}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {project.testimonial_quote && (
                                <div className="bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 rounded-2xl p-8 relative overflow-hidden">
                                    <div className="absolute top-4 right-6 text-6xl text-primary/20 font-serif leading-none">"</div>
                                    <p className="relative z-10 text-lg italic mb-6 text-foreground/90 leading-relaxed">
                                        {project.testimonial_quote}
                                    </p>
                                    <div className="flex items-center gap-3 relative z-10">
                                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                                            <User className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm">{project.testimonial_author}</p>
                                            <p className="text-xs text-muted-foreground uppercase">{project.testimonial_role}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>

                </div>
            </article>
        </>
    );
};

export default ProjectDetails;
