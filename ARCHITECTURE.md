# Open Ham Awards Architecture

## 1. Executive Summary
**Goal:** A lightweight, open-source contest and award management platform for Amateur Radio clubs — giving local clubs and contest managers a modern, frictionless way to host, track, and validate radio activity awards.

**Core Values:**
- **Simplicity:** Anti-bloat UI/UX for the modern operator. No confusing interfaces — just the tools you need to run a great event.
- **Transparency:** AGPLv3 open-source core. Club infrastructure should be extensible and free from vendor lock-in.

## 2. Project Roadmap
- **Phase 1 (Current):** Waitlist MVP & Product Discovery. Focus on user acquisition and domain validation.
- **Phase 2 (Upcoming):** Core Award Engine, Reference Management, and ADIF log ingestion. Automating the transition from raw logs (ADIF/Cabrillo) to verified award state via an asynchronous, rule-based engine.

## 3. Domain Model (Target State)
*Note: The following refers to the full engine implementation planned for Phase 2.*
See [`docs/DOMAIN_MODEL.md`](docs/DOMAIN_MODEL.md) for the complete domain model specification.

## 4. Architectural Principles
* **Hexagonal Architecture (Ports & Adapters):** The "Domain" layer contains all business logic and has **zero dependencies** on frameworks (NestJS) or database drivers (TypeORM).
* **Modular Monolith:** Strict logical separation between contexts (Identity, Ingestion, Scoring) to allow for future microservice extraction if needed.
* **Async-First Ingestion:** All log processing is handled via background workers (BullMQ) to maintain API responsiveness during contest peaks.

## 5. System Components

### 5.1. Module Boundaries

| Module | Responsibility |
| :--- | :--- |
| **Identity** | Manages Users, Stations (Callsigns), and "Upload-on-behalf" permissions. |
| **Ingestion** | Parses raw ADIF/Cabrillo files, normalizes data, and handles idempotency. |
| **Scoring** | The "Engine." Executes contest-specific rules against normalized logs. |
| **Public** | High-availability read-only APIs for leaderboards and public profiles. |

### 5.2. Technical Stack
* **Runtime:** Node.js (v22+) with pnpm workspaces.
* **Framework:** NestJS (API Layer only).
* **Database:** PostgreSQL (Relational) + Redis (Queues).
* **Communication:** Internal Events (EventEmitter2) and Background Jobs.

## 6. Critical Logic Patterns

### 6.1. The "Identity Delegation" Model
To solve the **Operator vs. Station** gap, the system uses a **Delegation Service**. 
* A `LogSubmission` is linked to an `Account` (the uploader) and a `Station` (the license).
* Uploads are rejected unless the `Account` has a valid `Delegation` record for the `Station`.

### 6.2. Scoring States (Claimed vs. Verified)
To handle $O(N^2)$ cross-checking without locking the database:
1.  **Claimed:** Immediate calculation based only on the uploaded log. Used for live scoreboards.
2.  **Verified:** Batch-processed cross-checking (Station A $\leftrightarrow$ Station B) triggered after contest close.

These scoring states represent the data integrity layer and are orthogonal to the `ProgressStatus` found in the Domain Model:
* **Claimed** contacts provide the raw data for `IN_PROGRESS` tracking and "unofficial" leaderboards.
* **Verified** contacts are the mandatory trigger for moving a `UserAwardProgress` record from `IN_PROGRESS` to `ACHIEVED`.
* An award is only `AWARDED` after the verification batch process completes the $O(N^2)$ cross-check.

### 6.3. Rule Snapshotting
Contest rules are stored as **Immutable Templates**. When an `AwardInstance` is created, it takes a **Deep Copy (JSON Snapshot)** of the rules. This ensures that changes to the 2026 rules do not retroactively break the scoring of 2025 logs.

## 7. Development Workflow (AI-Agentic)
* **Domain First:** Always implement logic in `packages/domain` before creating API endpoints.
* **Contract-Driven:** Shared types in `packages/contracts` must be updated before `web` and `api` implementations.
* **Test Requirements:** 100% coverage on the `ScoringEngine` core is mandatory.
