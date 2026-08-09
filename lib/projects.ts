
import { Project, ProjectFormData } from "@/types/project";
import { api } from "./api";


interface ProjectResponse {
    data: Project;
}

interface ProjectListResponse {
    data: Project[];
    meta: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export interface ProjectFilters {
    search?: string;
    status?: string;
    priority?: string;
    sort?: string;
    direction?: "asc" | "desc";
    page?: number;
}

export async function getProjects(
    filters?: ProjectFilters
) {
    const response =
        await api.get<ProjectListResponse>(
            "/projects",
            {
                params: filters,
            }
        );

    return response.data;
}

export async function getProject(id: number) {
    const response =
        await api.get<ProjectResponse>(
            `/projects/${id}`
        );

    return response.data.data;
}

export async function createProject(
    data: ProjectFormData
) {
    const response =
        await api.post<ProjectResponse>(
            "/projects",
            data
        );

    return response.data.data;
}

export async function updateProject(
    id: number,
    data: Partial<ProjectFormData>
) {
    const response =
        await api.put<ProjectResponse>(
            `/projects/${id}`,
            data
        );

    return response.data.data;
}

export async function deleteProject(
    id: number
) {
    await api.delete(`/projects/${id}`);
}