export const PROJECT_STATUSES = [
    "Planning",
    "In Progress",
    "On Hold",
    "Completed",
] as const;

export const PROJECT_PRIORITIES = [
    "Low",
    "Medium",
    "High",
] as const;

export type ProjectStatus =
    (typeof PROJECT_STATUSES)[number];

export type ProjectPriority =
    (typeof PROJECT_PRIORITIES)[number];

export interface Project {
    id: number;
    client_name: string;
    project_name: string;
    description: string | null;
    status: ProjectStatus;
    priority: ProjectPriority;
    start_date: string | null;
    due_date: string | null;
    created_at: string;
    updated_at: string;
}

export interface ProjectFormData {
    client_name: string;
    project_name: string;
    description?: string;
    status: ProjectStatus;
    priority: ProjectPriority;
    start_date?: string;
    due_date?: string;
}