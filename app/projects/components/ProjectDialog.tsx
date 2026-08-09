"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import type { Project, ProjectFormData } from "@/types/project";

import { ProjectForm } from "./ProjectForm";

interface ProjectDialogProps {
    open: boolean;
    project?: Project | null;
    loading?: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: ProjectFormData) => Promise<void>;
}

export function ProjectDialog({
    open,
    project,
    loading = false,
    onOpenChange,
    onSubmit,
}: ProjectDialogProps) {
    const isEditing = Boolean(project);

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>
                        {isEditing
                            ? "Edit Project"
                            : "Create Project"}
                    </DialogTitle>

                    <DialogDescription>
                        {isEditing
                            ? "Update the project information below."
                            : "Enter the details for the new project."}
                    </DialogDescription>
                </DialogHeader>

                <ProjectForm
                    project={project}
                    onSubmit={onSubmit}
                    onCancel={() => onOpenChange(false)}
                    loading={loading}
                />
            </DialogContent>
        </Dialog>
    );
}