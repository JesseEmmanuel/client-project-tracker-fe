"use client";

import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    PROJECT_PRIORITIES,
    PROJECT_STATUSES,
} from "@/types/project";

import {
    setPriority,
    setSearch,
    setStatus,
} from "@/store/projectSlice";

import {
    useAppDispatch,
    useAppSelector,
} from "@/store/hooks";

export function ProjectFilters() {
    const dispatch = useAppDispatch();

    const {
        search,
        status,
        priority,
    } = useAppSelector(
        (state) => state.projects
    );

    return (
        <div className="flex flex-col gap-3 md:flex-row">
            <Input
                placeholder="Search projects, clients, etc..."
                value={search}
                onChange={(event) =>
                    dispatch(
                        setSearch(event.target.value)
                    )
                }
                className="md:max-w-sm"
            />

            <Select
                value={status || "All Status"}
                onValueChange={(value) =>
                    dispatch(
                        setStatus(
                            value === "All Status" || value === null
                                ? ""
                                : value
                        )
                    )
                }
            >
                <SelectTrigger className="md:w-[180px]">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="All Status">
                        All Statuses
                    </SelectItem>

                    {PROJECT_STATUSES.map((status) => (
                        <SelectItem
                            key={status}
                            value={status}
                        >
                            {status}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Select
                value={priority || "All Priorities"}
                onValueChange={(value) =>
                    dispatch(
                        setPriority(
                            value === "all" || value === null
                                ? ""
                                : value
                        )
                    )
                }
            >
                <SelectTrigger className="md:w-[180px]">
                    <SelectValue placeholder="Priority" />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="all">
                        All Priorities
                    </SelectItem>

                    {PROJECT_PRIORITIES.map(
                        (priority) => (
                            <SelectItem
                                key={priority}
                                value={priority}
                            >
                                {priority}
                            </SelectItem>
                        )
                    )}
                </SelectContent>
            </Select>
        </div>
    );
}