"use client";

import { Button } from "@/components/ui/button";

interface ProjectPaginationProps {
    currentPage: number;
    lastPage: number;
    onPageChange: (page: number) => void;
}

export function ProjectPagination({
    currentPage,
    lastPage,
    onPageChange,
}: ProjectPaginationProps) {
    if (lastPage <= 1) {
        return null;
    }

    return (
        <div className="flex items-center justify-end gap-2">
            <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() =>
                    onPageChange(currentPage - 1)
                }
            >
                Previous
            </Button>

            <span className="text-sm text-muted-foreground">
                Page {currentPage} of {lastPage}
            </span>

            <Button
                variant="outline"
                size="sm"
                disabled={currentPage === lastPage}
                onClick={() =>
                    onPageChange(currentPage + 1)
                }
            >
                Next
            </Button>
        </div>
    );
}