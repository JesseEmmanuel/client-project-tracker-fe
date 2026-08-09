import { z } from "zod";

export const projectSchema = z
    .object({
        client_name: z
            .string()
            .min(1, "Client name is required.")
            .max(255, "Client name must not exceed 255 characters."),

        project_name: z
            .string()
            .min(1, "Project name is required.")
            .max(255, "Project name must not exceed 255 characters."),

        description: z
            .string()
            .optional(),

        status: z.enum([
            "Planning",
            "In Progress",
            "On Hold",
            "Completed",
        ]),

        priority: z.enum([
            "Low",
            "Medium",
            "High",
        ]),

        start_date: z
            .string()
            .optional(),

        due_date: z
            .string()
            .optional(),
    })
    .refine(
        (data) => {
            if (!data.start_date || !data.due_date) {
                return true;
            }

            return data.due_date >= data.start_date;
        },
        {
            message: "Due date cannot be earlier than start date.",
            path: ["due_date"],
        }
    );

export type ProjectFormValues =
    z.infer<typeof projectSchema>;