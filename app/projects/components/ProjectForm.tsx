"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";



import type { Project, ProjectFormData } from "@/types/project";
import { projectSchema } from "@/schemas/project";

interface ProjectFormProps {
    project?: Project | null;
    onSubmit: (data: ProjectFormData) => Promise<void>;
    onCancel: () => void;
    loading?: boolean;
}

export function ProjectForm({
    project,
    onSubmit,
    onCancel,
    loading = false,
}: ProjectFormProps) {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm<ProjectFormData>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            client_name: "",
            project_name: "",
            description: "",
            status: "Planning",
            priority: "Medium",
            start_date: "",
            due_date: "",
        },
    });

    useEffect(() => {
        if (project) {
            reset({
                client_name: project.client_name,
                project_name: project.project_name,
                description: project.description ?? "",
                status: project.status,
                priority: project.priority,
                start_date: project.start_date ?? "",
                due_date: project.due_date ?? "",
            });
        } else {
            reset({
                client_name: "",
                project_name: "",
                description: "",
                status: "Planning",
                priority: "Medium",
                start_date: "",
                due_date: "",
            });
        }
    }, [project, reset]);

    const status = watch("status");
    const priority = watch("priority");

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
        >
            <div className="space-y-2">
                <label
                    htmlFor="client_name"
                    className="text-sm font-medium"
                >
                    Client Name
                </label>

                <Input
                    id="client_name"
                    placeholder="Acme Corporation"
                    {...register("client_name")}
                />

                {errors.client_name && (
                    <p className="text-sm text-destructive">
                        {errors.client_name.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <label
                    htmlFor="project_name"
                    className="text-sm font-medium"
                >
                    Project Name
                </label>

                <Input
                    id="project_name"
                    placeholder="Website Redesign"
                    {...register("project_name")}
                />

                {errors.project_name && (
                    <p className="text-sm text-destructive">
                        {errors.project_name.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <label
                    htmlFor="description"
                    className="text-sm font-medium"
                >
                    Description
                </label>

                <Textarea
                    id="description"
                    placeholder="Describe the project..."
                    rows={4}
                    {...register("description")}
                />

                {errors.description && (
                    <p className="text-sm text-destructive">
                        {errors.description.message}
                    </p>
                )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <label className="text-sm font-medium">
                        Status
                    </label>

                    <Select
                        value={status}
                        onValueChange={(value) =>
                            setValue(
                                "status",
                                value as ProjectFormData["status"],
                                {
                                    shouldValidate: true,
                                }
                            )
                        }
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="Planning">
                                Planning
                            </SelectItem>

                            <SelectItem value="In Progress">
                                In Progress
                            </SelectItem>

                            <SelectItem value="On Hold">
                                On Hold
                            </SelectItem>

                            <SelectItem value="Completed">
                                Completed
                            </SelectItem>
                        </SelectContent>
                    </Select>

                    {errors.status && (
                        <p className="text-sm text-destructive">
                            {errors.status.message}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">
                        Priority
                    </label>

                    <Select
                        value={priority}
                        onValueChange={(value) =>
                            setValue(
                                "priority",
                                value as ProjectFormData["priority"],
                                {
                                    shouldValidate: true,
                                }
                            )
                        }
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select priority" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="Low">
                                Low
                            </SelectItem>

                            <SelectItem value="Medium">
                                Medium
                            </SelectItem>

                            <SelectItem value="High">
                                High
                            </SelectItem>
                        </SelectContent>
                    </Select>

                    {errors.priority && (
                        <p className="text-sm text-destructive">
                            {errors.priority.message}
                        </p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <label
                        htmlFor="start_date"
                        className="text-sm font-medium"
                    >
                        Start Date
                    </label>

                    <Input
                        id="start_date"
                        type="date"
                        {...register("start_date")}
                    />

                    {errors.start_date && (
                        <p className="text-sm text-destructive">
                            {errors.start_date.message}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <label
                        htmlFor="due_date"
                        className="text-sm font-medium"
                    >
                        Due Date
                    </label>

                    <Input
                        id="due_date"
                        type="date"
                        {...register("due_date")}
                    />

                    {errors.due_date && (
                        <p className="text-sm text-destructive">
                            {errors.due_date.message}
                        </p>
                    )}
                </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    disabled={loading}
                >
                    Cancel
                </Button>

                <Button
                    type="submit"
                    disabled={loading}
                >
                    {loading
                        ? "Saving..."
                        : project
                            ? "Update Project"
                            : "Create Project"}
                </Button>
            </div>
        </form>
    );
}