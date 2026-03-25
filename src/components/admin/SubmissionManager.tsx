
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Calendar, User, MessageSquare, Trash2, Loader2, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ContactSubmission {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    created_at: string;
    scheduled_date?: string;
    scheduled_time?: string;
}

export const SubmissionManager = () => {
    const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        fetchSubmissions();
    }, []);

    const fetchSubmissions = async () => {
        try {
            const { data, error } = await supabase
                .from("contact_submissions")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;
            setSubmissions(data || []);
        } catch (error: any) {
            toast({
                title: "Error loading submissions",
                description: error.message,
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        setDeletingId(id);
        try {
            const { error } = await supabase
                .from("contact_submissions")
                .delete()
                .eq("id", id);

            if (error) throw error;

            setSubmissions((prev) => prev.filter((s) => s.id !== id));
            toast({
                title: "Submission deleted",
                description: "The contact submission has been removed.",
            });
        } catch (error: any) {
            toast({
                title: "Error deleting submission",
                description: error.message,
                variant: "destructive",
            });
        } finally {
            setDeletingId(null);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    if (isLoading) {
        return <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />;
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold font-display">Contact Submissions</h2>
            {submissions.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16"
                >
                    <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-display text-xl font-semibold mb-2 text-foreground">
                        No submissions yet
                    </h3>
                    <p className="text-muted-foreground">
                        Contact form submissions will appear here.
                    </p>
                </motion.div>
            ) : (
                <div className="grid gap-4">
                    {submissions.map((submission, index) => (
                        <motion.div
                            key={submission.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                            <Card className="modern-card overflow-hidden">
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between">
                                        <div className="space-y-1">
                                            <CardTitle className="text-lg font-semibold">
                                                {submission.subject}
                                            </CardTitle>
                                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                                <span className="flex items-center gap-1.5">
                                                    <User className="w-3.5 h-3.5" />
                                                    {submission.name}
                                                </span>
                                                <a
                                                    href={`mailto:${submission.email}`}
                                                    className="flex items-center gap-1.5 hover:text-coral transition-colors"
                                                >
                                                    <Mail className="w-3.5 h-3.5" />
                                                    {submission.email}
                                                </a>
                                                <span className="flex items-center gap-1.5">
                                                    <Calendar className="w-3.5 h-3.5" />
                                                    {formatDate(submission.created_at)}
                                                </span>
                                                {(submission.scheduled_date || submission.scheduled_time) && (
                                                    <span className="flex items-center gap-1.5 px-2 py-0.5 bg-sky/10 text-sky rounded-md font-semibold animate-pulse">
                                                        <Clock className="w-3.5 h-3.5" />
                                                        Meeting: {submission.scheduled_date || "Any date"} at {submission.scheduled_time || "Any time"}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-muted-foreground hover:text-destructive"
                                                >
                                                    {deletingId === submission.id ? (
                                                        <Loader2 className="w-4 h-4 animate-spin" />
                                                    ) : (
                                                        <Trash2 className="w-4 h-4" />
                                                    )}
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Delete submission?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action cannot be undone. This will permanently delete the
                                                        contact submission from {submission.name}.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction
                                                        onClick={() => handleDelete(submission.id)}
                                                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                    >
                                                        Delete
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-foreground whitespace-pre-wrap">
                                        {submission.message}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};
