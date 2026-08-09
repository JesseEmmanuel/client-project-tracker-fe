# Client Project Tracker — Frontend

A frontend application for managing and tracking client projects for a digital agency.

The application provides project CRUD functionality, search, filtering, sorting, pagination, and form validation.

---

## Setup Instructions

### Prerequisites

Make sure the following are installed:

- Node.js
- npm
- Git

The frontend also requires the Laravel backend to be running and accessible.

### 1. Clone the Repository

```bash
git clone <repository-url>
cd client-project-tracker-fe
```

Replace `<repository-url>` with the URL of the frontend repository.

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
```

Update the URL if the Laravel backend is running on a different host or port.

---

## Technology Choices

### Next.js

**Next.js 16** is used as the primary frontend framework.

It provides routing, React integration, and a structured application architecture.

### React

**React 19** is used for building the user interface and managing interactive components.

### TypeScript

**TypeScript** is used throughout the application to provide static typing and improve maintainability.

### Tailwind CSS

**Tailwind CSS** is used for styling the application through utility classes.

### shadcn/ui

**shadcn/ui** is used for reusable UI components such as:

- Buttons
- Tables
- Dropdown menus
- Dialogs
- Forms
- Badges

The components are customizable and keep the UI consistent.

### Redux Toolkit

**Redux Toolkit** is used for application-level state management.

The project list state includes:

- Search
- Status filter
- Priority filter
- Sorting
- Sort direction
- Pagination

Local component state is used for UI-specific state such as loading indicators and dialog visibility.

### React Hook Form

**React Hook Form** is used to manage project forms and their submission state.

### Zod

**Zod** is used for client-side validation of project form data.

Validation includes:

- Required client name
- Required project name
- Valid status
- Valid priority
- Due date must not be earlier than the start date

### Axios

**Axios** is used for communication with the Laravel REST API.

### date-fns

**date-fns** is used to format project dates into human-readable values.

For example:

```text
2026-08-09
```

is displayed as:

```text
Aug 9, 2026
```

### Lucide React

**Lucide React** is used for interface icons such as edit, delete, refresh, and project actions.

---

## How to Run the Application

### Development

Start the Next.js development server:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

Open the project tracker at:

```text
http://localhost:3000/projects
```

### Production Build

Create a production build:

```bash
npm run build
```

Then start the production server:

```bash
npm run start
```

The application will be available at:

```text
http://localhost:3000
```

### Backend Requirement

The frontend communicates with the Laravel backend through the configured API URL.

The backend should be running before using the project CRUD functionality.

Expected local API:

```text
http://127.0.0.1:8000/api
```

The frontend consumes the following endpoints:

```text
GET    /projects
GET    /projects/:id
POST   /projects
PUT    /projects/:id
DELETE /projects/:id
```

---

## Assumptions Made

### Authentication

Authentication was not implemented because it was listed as an optional requirement and was not necessary for the core project tracker functionality.

### Authorization

The application assumes that users accessing the project tracker are authorized to perform CRUD operations.

### Client Management

Clients are represented by the `client_name` field on each project.

A separate client management feature or `clients` table was not implemented because it was outside the required scope.

### API Availability

The frontend assumes that the Laravel backend is available at the URL configured through:

```env
NEXT_PUBLIC_API_URL
```

### API Response

The frontend assumes that the project list API returns paginated data together with pagination metadata.

For example:

```json
{
  "data": [],
  "meta": {
    "current_page": 1,
    "last_page": 1,
    "per_page": 10,
    "total": 0
  }
}
```

### Date Format

The frontend assumes that project dates returned by the API use an ISO-compatible format such as:

```text
YYYY-MM-DD
```

These dates are formatted for display using `date-fns`.

### Backend Validation

Client-side validation is provided for a better user experience, but backend validation remains the final source of truth for data integrity.

### Pagination

Pagination is handled by the backend API. The frontend sends the requested page and displays the pagination metadata returned by the API.

### Search, Filtering, and Sorting

Search, filtering, and sorting are performed through the API rather than entirely on the client.

This allows the application to remain efficient as the number of projects increases.

---

## Project Structure

Project-specific components are organized under the project feature:

```text
app/
└── projects/
    ├── components/
    │   ├── ProjectTable.tsx
    │   ├── ProjectFilters.tsx
    │   ├── ProjectPagination.tsx
    │   ├── ProjectStatusBadge.tsx
    │   └── ProjectPriorityBadge.tsx
    │
    └── page.tsx

components/
└── ui/
    └── ...

lib/
└── projects.ts

store/
├── hooks.ts
├── provider.tsx
├── projectSlice.ts
└── store.ts

types/
└── project.ts
```

Project-specific components are kept inside:

```text
app/projects/components
```

to keep feature-related code together and avoid unnecessarily placing project-specific components in the global components directory.