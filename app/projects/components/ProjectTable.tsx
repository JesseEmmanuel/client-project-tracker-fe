"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

import {
    MoreHorizontal,
    Pencil,
    Trash2,
} from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { Project } from "@/types/project";

import { ProjectStatusBadge } from "./ProjectStatusBadge";
import { ProjectPriorityBadge } from "./ProjectPriorityBadge";
import { format, parseISO } from "date-fns";

interface ProjectTableProps {
    projects: Project[];
    onEdit: (project: Project) => void;
    onDelete: (project: Project) => void;
}

export function ProjectTable({
    projects,
    onEdit,
    onDelete,
}: ProjectTableProps) {
    if (projects.length === 0) {
        return (
            <div className="flex min-h-[300px] items-center justify-center rounded-lg border">
                <div className="text-center">
                    <h3 className="font-medium">
                        No projects found
                    </h3>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Try changing your search or filters.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-lg border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Client</TableHead>
                        <TableHead>Project</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead className="w-[60px]" />
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {projects.map((project) => (
                        <TableRow key={project.id}>
                            <TableCell className="font-medium">
                                {project.client_name}
                            </TableCell>

                            <TableCell>
                                <div>
                                    <div className="font-medium">
                                        {project.project_name}
                                    </div>

                                    {project.description && (
                                        <div className="max-w-[300px] truncate text-sm text-muted-foreground">
                                            {project.description}
                                        </div>
                                    )}
                                </div>
                            </TableCell>

                            <TableCell>
                                <ProjectStatusBadge
                                    status={project.status}
                                />
                            </TableCell>

                            <TableCell>
                                <ProjectPriorityBadge
                                    priority={project.priority}
                                />
                            </TableCell>

                            <TableCell>
                                {project.start_date
                                    ? format(parseISO(project.start_date), "MMM d, yyyy")
                                    : "—"}
                            </TableCell>

                            <TableCell>
                                {project.due_date
                                    ? format(parseISO(project.due_date), "MMM d, yyyy")
                                    : "—"}
                            </TableCell>

                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger
                                        render={
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                            />
                                        }
                                    >
                                        <MoreHorizontal />
                                        <span className="sr-only">
                                            Open project actions
                                        </span>
                                    </DropdownMenuTrigger>

                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem
                                            onClick={() =>
                                                onEdit(project)
                                            }
                                        >
                                            <Pencil className="mr-2 h-4 w-4" />
                                            Edit
                                        </DropdownMenuItem>

                                        <DropdownMenuItem
                                            variant="destructive"
                                            onClick={() =>
                                                onDelete(project)
                                            }
                                        >
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}