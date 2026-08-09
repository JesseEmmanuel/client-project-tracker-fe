"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import type { Project } from "@/types/project";

interface DeleteProjectDialogProps {
    open: boolean;
    project?: Project | null;
    loading?: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => Promise<void>;
}

export function DeleteProjectDialog({
    open,
    project,
    loading = false,
    onOpenChange,
    onConfirm,
}: DeleteProjectDialogProps) {
    return (
        <AlertDialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Delete Project?
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                        Are you sure you want to delete{" "}
                        <strong>
                            {project?.project_name}
                        </strong>
                        ? This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel disabled={loading}>
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                        variant="destructive"
                        disabled={loading}
                        onClick={async (event) => {
                            event.preventDefault();
                            await onConfirm();
                        }}
                    >
                        {loading ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}