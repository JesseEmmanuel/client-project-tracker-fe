import { Badge } from "@/components/ui/badge";
import type { ProjectPriority } from "@/types/project";

interface ProjectPriorityBadgeProps {
    priority: ProjectPriority;
}

const priorityStyles: Record<ProjectPriority, string> = {
    Low:
        "border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300",

    Medium:
        "border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-800 dark:bg-orange-950 dark:text-orange-300",

    High:
        "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300",
};

export function ProjectPriorityBadge({
    priority,
}: ProjectPriorityBadgeProps) {
    return (
        <Badge
            variant="outline"
            className={priorityStyles[priority]}
        >
            {priority}
        </Badge>
    );
}