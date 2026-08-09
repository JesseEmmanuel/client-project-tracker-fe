"use client";

import { useEffect, useState } from "react";

import { Plus, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
    getProjects,
    createProject,
    updateProject,
    deleteProject,
} from "@/lib/projects";

import type { Project, ProjectFormData } from "@/types/project";

import {
    useAppDispatch,
    useAppSelector,
} from "@/store/hooks";

import { setPage } from "@/store/projectSlice";

import { ProjectFilters } from "./components/ProjectFilters";
import { ProjectTable } from "./components/ProjectTable";
import { ProjectPagination } from "./components/ProjectPagination";
import { ProjectDialog } from "./components/ProjectDialog";
import { DeleteProjectDialog } from "./components/DeleteProjectDialog";

export default function ProjectsPage() {
    const dispatch = useAppDispatch();

    const {
        search,
        status,
        priority,
        sort,
        direction,
        page,
    } = useAppSelector(
        (state) => state.projects
    );

    const [projects, setProjects] = useState<Project[]>(
        []
    );

    const [currentPage, setCurrentPage] =
        useState(1);

    const [lastPage, setLastPage] =
        useState(1);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState<string | null>(null);

    const [dialogOpen, setDialogOpen] =
        useState(false);

    const [selectedProject, setSelectedProject] =
        useState<Project | null>(null);

    const [mutationLoading, setMutationLoading] =
        useState(false);

    const [deleteDialogOpen, setDeleteDialogOpen] =
        useState(false);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await getProjects({
                search: search || undefined,
                status: status || undefined,
                priority: priority || undefined,
                sort,
                direction,
                page,
            });

            setProjects(response.data);

            setCurrentPage(
                response.meta.current_page
            );

            setLastPage(
                response.meta.last_page
            );
        } catch (error) {
            console.error(error);

            setError(
                "Unable to load projects. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, [
        search,
        status,
        priority,
        sort,
        direction,
        page,
    ]);

    const handleCreate = () => {
        setSelectedProject(null);
        setDialogOpen(true);
    };

    const handleEdit = (project: Project) => {
        setSelectedProject(project);
        setDialogOpen(true);
    };

    const handleDelete = (project: Project) => {
        setSelectedProject(project);
        setDeleteDialogOpen(true);
    };

    const handleSubmit = async (
        data: ProjectFormData
    ) => {
        try {
            setMutationLoading(true);
            setError(null);

            if (selectedProject) {
                await updateProject(
                    selectedProject.id,
                    data
                );
            } else {
                await createProject(data);
            }

            setDialogOpen(false);
            setSelectedProject(null);

            await fetchProjects();
        } catch (error) {
            console.error(error);

            setError(
                selectedProject
                    ? "Unable to update the project."
                    : "Unable to create the project."
            );
        } finally {
            setMutationLoading(false);
        }
    };

    const handleConfirmDelete = async () => {
        if (!selectedProject) {
            return;
        }

        try {
            setMutationLoading(true);
            setError(null);

            await deleteProject(selectedProject.id);

            setDeleteDialogOpen(false);
            setSelectedProject(null);

            await fetchProjects();
        } catch (error) {
            console.error(error);

            setError(
                "Unable to delete the project."
            );
        } finally {
            setMutationLoading(false);
        }
    };

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Projects
                        </h1>

                        <p className="text-muted-foreground">
                            Manage your client projects and track
                            their progress.
                        </p>
                    </div>

                    <Button onClick={handleCreate}>
                        <Plus className="mr-2 h-4 w-4" />
                        New Project
                    </Button>
                </div>

                {/* Filters */}
                <ProjectFilters />

                {/* Error */}
                {error && (
                    <div className="rounded-lg border border-destructive/50 bg-destructive/5 p-4 text-sm text-destructive">
                        {error}
                    </div>
                )}

                {/* Table */}
                {loading ? (
                    <div className="flex min-h-[300px] items-center justify-center rounded-lg border">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <RefreshCw className="h-4 w-4 animate-spin" />
                            Loading projects...
                        </div>
                    </div>
                ) : (
                    <ProjectTable
                        projects={projects}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                )}

                {/* Pagination */}
                <ProjectPagination
                    currentPage={currentPage}
                    lastPage={lastPage}
                    onPageChange={(newPage) =>
                        dispatch(setPage(newPage))
                    }
                />

                {/* Create / Edit */}
                <ProjectDialog
                    open={dialogOpen}
                    project={selectedProject}
                    loading={mutationLoading}
                    onOpenChange={(open) => {
                        setDialogOpen(open);

                        if (!open) {
                            setSelectedProject(null);
                        }
                    }}
                    onSubmit={handleSubmit}
                />

                {/* Delete */}
                <DeleteProjectDialog
                    open={deleteDialogOpen}
                    project={selectedProject}
                    loading={mutationLoading}
                    onOpenChange={(open) => {
                        setDeleteDialogOpen(open);

                        if (!open) {
                            setSelectedProject(null);
                        }
                    }}
                    onConfirm={handleConfirmDelete}
                />
            </div>
        </main>
    );
}