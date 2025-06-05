# Open Ham Awards

Open Ham Awards is an open-source platform designed to help ham radio clubs and operators manage, participate in, and track progress for various radio activity awards.

**Status**: Early Development :construction:

## Project Goal

The main goal is to provide a modern, user-friendly, and extensible system for:

*   Defining and managing different types of ham radio awards.
*   Allowing activators to announce their planned operations for specific award references.
*   Enabling hunters (participants) to log their contacts against these activations.
*   Tracking progress towards achieving awards.
*   Facilitating the validation of activities and contacts.

This project aims to consolidate existing systems and provide new functionalities for the benefit of radio amateurs.

## Core Features (MVP Focus)

*   **User Registration & Authentication:** Secure access for radio operators.
*   **Award Management:**
    *   Defining award categories.
    *   Defining specific award types.
    *   Managing award "instances".
    *   Defining and managing references (locations, entities) associated with awards.
*   **Activity Lifecycle:**
    *   Activators can announce planned activities for an award instance at a specific reference.
    *   Announcements are reviewed and approved/rejected by administrators/award managers.
    *   Approved activities are visible to all users.
    *   Activators can submit evidence (logs, photos) for their completed activities.
    *   Administrators/award managers validate submitted evidence.
*   **Participation & Logging:**
    *   Registered users (hunters) can submit their contact logs against validated activities.
    *   Users can view their submitted logs and their validation status.
*   **Award Progress Tracking:**
    *   Users can view their progress towards achieving specific award instances based on confirmed contacts.

## Tech Stack (Initial)

*   **Frontend:** Next.js (React)
*   **Backend API:** Nest.JS (Node.js, TypeScript)
*   **Database:** PostgreSQL (planned)
*   **Monorepo Management:** pnpm workspaces

## Getting Started (Development)

This is a monorepo managed with pnpm.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/OpenHamAwards/open-ham-awards.git
    cd open-ham-awards
    ```
2.  **Install dependencies:**
    ```bash
    pnpm install
    ```
3.  **Run development servers:**
    *   To run both frontend and backend concurrently:
        ```bash
        pnpm dev
        ```
    *   To run frontend (Next.js) only:
        ```bash
        pnpm dev:web
        ```
    *   To run backend (Nest.JS) only:
        ```bash
        pnpm dev:api
        ```

(Further details on database setup, environment variables, etc., will be added as development progresses.)

## Contributing

This project is open source and contributions are welcome. Please refer to `CONTRIBUTING.md` (to be created) for guidelines.

## License

This project will be licensed under the [AGPLv3](https://www.gnu.org/licenses/agpl-3.0.en.html#license-text) license.