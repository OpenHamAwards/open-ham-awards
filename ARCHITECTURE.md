# ARCHITECTURE.md: Open Ham Awards (V2)

## 1. Executive Summary
**Goal:** A high-concurrency, open-source platform for Amateur Radio contest and award management.
**Core Value:** Automating the transition from raw logs (ADIF/Cabrillo) to verified award state via an asynchronous, rule-based engine.

## 2. Architectural Principles
* **Hexagonal Architecture (Ports & Adapters):** The "Domain" layer contains all business logic and has **zero dependencies** on frameworks (NestJS) or database drivers (TypeORM).
* **Modular Monolith:** Strict logical separation between contexts (Identity, Ingestion, Scoring) to allow for future microservice extraction if needed.
* **Async-First Ingestion:** All log processing is handled via background workers (BullMQ) to maintain API responsiveness during contest peaks.

## 3. System Components

### 3.1. Module Boundaries
| Module | Responsibility |
| :--- | :--- |
| **Identity** | Manages Users, Stations (Callsigns), and "Upload-on-behalf" permissions. |
| **Ingestion** | Parses raw ADIF/Cabrillo files, normalizes data, and handles idempotency. |
| **Scoring** | The "Engine." Executes contest-specific rules against normalized logs. |
| **Public** | High-availability read-only APIs for leaderboards and public profiles. |

### 3.2. Technical Stack
* **Runtime:** Node.js (v22+) with pnpm workspaces.
* **Framework:** NestJS (API Layer only).
* **Database:** PostgreSQL (Relational) + Redis (Queues).
* **Communication:** Internal Events (EventEmitter2) and Background Jobs.

## 4. Critical Logic Patterns

### 4.1. The "Identity Delegation" Model
To solve the **Operator vs. Station** gap, the system uses a **Delegation Service**. 
* A `LogSubmission` is linked to an `Account` (the uploader) and a `Station` (the license).
* Uploads are rejected unless the `Account` has a valid `Delegation` record for the `Station`.

### 4.2. Scoring States (Claimed vs. Verified)
To handle $O(N^2)$ cross-checking without locking the database:
1.  **Claimed:** Immediate calculation based only on the uploaded log. Used for live scoreboards.
2.  **Verified:** Batch-processed cross-checking (Station A $\leftrightarrow$ Station B) triggered after contest close.

### 4.3. Rule Snapshotting
Contest rules are stored as **Immutable Templates**. When a `ContestSession` is created, it takes a **Deep Copy (JSON Snapshot)** of the rules. This ensures that changes to the 2026 rules do not retroactively break the scoring of 2025 logs.

## 5. Development Workflow (AI-Agentic)
* **Domain First:** Always implement logic in `packages/domain` before creating API endpoints.
* **Contract-Driven:** Shared types in `packages/contracts` must be updated before `web` and `api` implementations.
* **Test Requirements:** 100% coverage on the `ScoringEngine` core is mandatory.
