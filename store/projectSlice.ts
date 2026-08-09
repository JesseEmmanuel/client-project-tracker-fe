import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProjectState {
    search: string;
    status: string;
    priority: string;
    sort: string;
    direction: "asc" | "desc";
    page: number;
    selectedProjectId: number | null;
    isFormOpen: boolean;
    isDeleteDialogOpen: boolean;
}

const initialState: ProjectState = {
    search: "",
    status: "",
    priority: "",
    sort: "created_at",
    direction: "desc",
    page: 1,
    selectedProjectId: null,
    isFormOpen: false,
    isDeleteDialogOpen: false,
};

const projectSlice = createSlice({
    name: "projects",

    initialState,

    reducers: {
        setSearch(
            state,
            action: PayloadAction<string>
        ) {
            state.search = action.payload;
            state.page = 1;
        },

        setStatus(
            state,
            action: PayloadAction<string>
        ) {
            state.status = action.payload;
            state.page = 1;
        },

        setPriority(
            state,
            action: PayloadAction<string>
        ) {
            state.priority = action.payload;
            state.page = 1;
        },

        setSort(
            state,
            action: PayloadAction<string>
        ) {
            state.sort = action.payload;
        },

        setDirection(
            state,
            action: PayloadAction<"asc" | "desc">
        ) {
            state.direction = action.payload;
        },

        setPage(
            state,
            action: PayloadAction<number>
        ) {
            state.page = action.payload;
        },

        setSelectedProject(
            state,
            action: PayloadAction<number | null>
        ) {
            state.selectedProjectId =
                action.payload;
        },

        openForm(state) {
            state.isFormOpen = true;
        },

        closeForm(state) {
            state.isFormOpen = false;
            state.selectedProjectId = null;
        },

        openDeleteDialog(
            state,
            action: PayloadAction<number>
        ) {
            state.selectedProjectId =
                action.payload;

            state.isDeleteDialogOpen = true;
        },

        closeDeleteDialog(state) {
            state.isDeleteDialogOpen = false;
            state.selectedProjectId = null;
        },
    },
});

export const {
    setSearch,
    setStatus,
    setPriority,
    setSort,
    setDirection,
    setPage,
    setSelectedProject,
    openForm,
    closeForm,
    openDeleteDialog,
    closeDeleteDialog,
} = projectSlice.actions;

export default projectSlice.reducer;