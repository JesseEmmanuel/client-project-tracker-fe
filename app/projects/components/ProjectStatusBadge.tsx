import { Badge } from "@/components/ui/badge";
import type { ProjectStatus } from "@/types/project";

interface ProjectStatusBadgeProps {
    status: ProjectStatus;
}

const statusStyles: Record<ProjectStatus, string> = {
    Planning:
        "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-800 dark:bg-violet-950 dark:text-violet-300",

    "In Progress":
        "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300",

    "On Hold":
        "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-300",

    Completed:
        "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300",
};

export function ProjectStatusBadge({
    status,
}: ProjectStatusBadgeProps) {
    return (
        <Badge
            variant="outline"
            className={statusStyles[status]}
        >
            {status}
        </Badge>
    );
}