# Domain Model — Open Ham Awards (V7 — P0/P1 Consumer MVP)

> Generalized, multi-tenant domain. Scoped to admin-driven MVP validation.
> Post-MVP features (automated cross-validation, PDF certificate generation) are excluded.

## Mermaid Class Diagram

```mermaid
classDiagram
    direction LR

    %% ──────────────────────────────────────
    %% IDENTITY CONTEXT
    %% ──────────────────────────────────────
    class Tenant {
        +uuid id
        +string name
        +string slug
        +boolean isActive
    }

    class Account {
        +uuid id
        +string email
        +string fullName
        +jsonb profileInfo
    }

    class TenantMembership {
        +uuid id
        +TenantRole role
        +boolean isActive
    }

    class Station {
        +uuid id
        +string callsign
        +string operatorName
        +string countryEntity
        +boolean isActive
    }

    class Delegation {
        +uuid id
        +boolean canAnnounce
        +boolean canLog
        +boolean isPrimary
        +string notes
    }

    Tenant "1" --> "*" TenantMembership : has
    Account "1" --> "*" TenantMembership : joins via
    Account "1" --> "*" Delegation : grants
    Station "1" --> "*" Delegation : for

    %% ──────────────────────────────────────
    %% AWARD DEFINITION CONTEXT
    %% ──────────────────────────────────────
    class AwardCategory {
        +serial id
        +string name
        +string description
    }

    class AwardDefinition {
        +uuid id
        +string name
        +string shortCode
        +string description
        +text rulesSummary
        +string rulesDocumentUrl
        +boolean isMetaAward
        +integer[] metaSourceDefinitionIds
        +boolean isActive
    }

    class AwardInstance {
        +uuid id
        +string name
        +timestamp startDate
        +timestamp? endDate
        +jsonb rulesSnapshot
        +string descriptionOverride
        +Account managedBy
    }

    class Reference {
        +uuid id
        +string referenceCode
        +string name
        +string description
        +jsonb regionalIdentifiers
        +decimal? latitude
        +decimal? longitude
        +decimal? altitude
        +string? boundaryFileUrl
        +ReferenceStatus status
    }

    Tenant "1" --> "*" AwardDefinition : hosts
    AwardCategory "1" --> "*" AwardDefinition : categorizes
    AwardDefinition "1" --> "*" AwardInstance : runs as
    AwardDefinition "1" --> "*" Reference : defines

    %% ──────────────────────────────────────
    %% ACTIVITY CONTEXT
    %% ──────────────────────────────────────
    class ActivityAnnouncement {
        +uuid id
        +uuid? affiliatedTenantId
        +timestamp startTime
        +timestamp endTime
        +string[] operatingModes
        +string[] frequencies
        +string notes
        +AnnouncementStatus status
        +Account approvedBy
        +timestamp approvedAt
        +text adminNotes
    }

    class ActivatedReference {
        +uuid id
    }

    class ActivityEvidence {
        +uuid id
        +EvidenceFileType fileType
        +string fileUrl
        +string description
        +EvidenceStatus status
        +Account validatedBy
        +timestamp validatedAt
    }

    Account "1" --> "*" ActivityAnnouncement : announces
    Station "1" --> "*" ActivityAnnouncement : activates as
    AwardInstance "1" --> "*" ActivityAnnouncement : scoped to
    ActivityAnnouncement "1" --> "*" ActivatedReference : at
    Reference "1" --> "*" ActivatedReference : targets
    ActivityAnnouncement "1" --> "*" ActivityEvidence : proves

    %% ──────────────────────────────────────
    %% INGESTION CONTEXT
    %% ──────────────────────────────────────

    class LogSubmission {
        +uuid id
        +timestamp uploadDate
        +string fileUrl
        +string version
        +boolean isActive
    }

    class QSOClaim {
        +uuid id
        +uuid submitterAccountId
        +uuid activatorStationId
        +string hunterCallsign
        +SubmissionMethod submissionMethod
        +uuid? affiliatedTenantId
        +string? hunterReferenceCode
        +timestamp contactTime
        +string band
        +decimal frequency
        +string mode
        +string rstSent
        +string rstReceived
        +jsonb exchangeInfo
        +string notes
        +ClaimStatus status
        +Account validatedBy
        +timestamp validatedAt
    }

    Account "1" --> "*" LogSubmission : submits
    Station "1" --> "*" LogSubmission : on behalf of
    ActivityAnnouncement "1" --> "*" LogSubmission : for
    LogSubmission "1" --> "*" QSOClaim : contains

    Account "1" --> "*" QSOClaim : submitter
    Station "1" --> "*" QSOClaim : activator station
    ActivityAnnouncement "1" --> "*" QSOClaim : against

    %% ──────────────────────────────────────
    %% SCORING CONTEXT (MVP: admin-driven)
    %% ──────────────────────────────────────
    class UserAwardProgress {
        +uuid id
        +integer currentScore
        +ProgressStatus status
        +jsonb progressDetails
        +timestamp achievedDate
        +timestamp claimedAt
        +timestamp awardedDate
    }

    Station "1" --> "*" UserAwardProgress : earned by
    AwardInstance "1" --> "*" UserAwardProgress : tracked in

    %% ──────────────────────────────────────
    %% SYSTEM / INFRASTRUCTURE CONTEXT
    %% ──────────────────────────────────────
    class AuditLog {
        +uuid id
        +uuid actorAccountId
        +string action
        +string targetEntityType
        +uuid targetEntityId
        +jsonb diff
        +timestamp createdAt
    }

    %% ──────────────────────────────────────
    %% ENUMS
    %% ──────────────────────────────────────
    class TenantRole {
        <<enumeration>>
        USER
        ACTIVATOR
        AWARD_MANAGER
        ADMIN
    }

    class AnnouncementStatus {
        <<enumeration>>
        PENDING_APPROVAL
        APPROVED
        REJECTED
        ACTIVE
        COMPLETED
        CANCELLED
    }

    class SubmissionMethod {
        <<enumeration>>
        ADIF_BULK
        MANUAL_HUNTER
    }

    class ClaimStatus {
        <<enumeration>>
        PENDING
        CONFIRMED
        REJECTED
    }

    class ProgressStatus {
        <<enumeration>>
        IN_PROGRESS
        ACHIEVED
        PENDING_CLAIM
        AWARDED
    }

    class EvidenceFileType {
        <<enumeration>>
        IMAGE_SETUP
        IMAGE_QSL
        VIDEO_PROOF
        OTHER
    }

    class ReferenceStatus {
        <<enumeration>>
        AVAILABLE
        CANCELLED
        DESTROYED
        RESERVED
    }

    class EvidenceStatus {
        <<enumeration>>
        PENDING
        VALIDATED
        REJECTED
    }
```

## Entity Glossary

| Entity | Context | Description |
|---|---|---|
| `Tenant` | Identity | An organization (club, association) that hosts award programs. Multi-tenancy root. |
| `Account` | Identity | A person who uses the platform. Has no global role — roles are per-tenant via `TenantMembership`. |
| `TenantMembership` | Identity | Join between Account and Tenant. Carries a `TenantRole` so the same person can be Admin in one tenant and User in another. |
| `Station` | Identity | A licensed callsign. Separate from Account (one operator may hold multiple licenses). |
| `Delegation` | Identity | Grants an Account permission to announce or log on behalf of a Station. |
| `AwardCategory` | Award Definition | Groups award definitions (e.g. "Castles", "Railways", "Monuments"). |
| `AwardDefinition` | Award Definition | The template for an award: name, rules summary, scoring rules. Replaces legacy-specific diplomas (DCE, DEFE, etc.). |
| `AwardInstance` | Award Definition | A concrete, temporal edition of a definition (e.g. "DCE 2026"). Snapshots the rules at creation time so future rule edits never retroactively break scoring. **Temporal pattern:** permanent awards use a `NULL` endDate — the instance stays open indefinitely. If the definition's rules change, the current instance is closed (endDate set) and a new instance is spawned from the same definition with the updated rules snapshot. Yearly/seasonal awards spawn a new instance annually from the same definition. |
| `Reference` | Award Definition | A geographic location tied to a definition. `referenceCode` is the primary textual identifier (e.g. "CZA-003"). `regionalIdentifiers` (JSONB) is a key-value store for arbitrary region- or program-specific codes (e.g. `{"dme": "CZA-003", "province": "Cádiz", "municipality": "Algeciras", "jcc": "2701"}`) — replaces hardcoded regional columns to support any locale or award system globally. `latitude`, `longitude`, and `altitude` are intentionally nullable to support the asynchronous admin workflow where a reference is created before physical GPS mapping is completed. `altitude` supports elevation-based award scoring (e.g. SOTA). `status` uses `ReferenceStatus`: `AVAILABLE` (can be activated), `RESERVED` (claimed but not yet activatable), `CANCELLED` (administratively withdrawn), `DESTROYED` (physically no longer exists — e.g. a demolished castle). A `DESTROYED` reference cannot be activated for new announcements but remains mathematically valid for past QSO claims and scoring. `boundaryFileUrl` is nullable — stores a URL to a spatial boundary file (KML, GPX, or GeoJSON) for frontend map rendering, supporting both polygon-based references (e.g. Parks) and point-based references (e.g. Summits). |
| `ActivityAnnouncement` | Activity | An activator's declared intent to operate at a reference. Lifecycle: `PENDING_APPROVAL` → `APPROVED` → `ACTIVE` → `COMPLETED`. Ends at `COMPLETED`; evidence and logs are separate contexts. `affiliatedTenantId` is nullable — used in V2 for club-level leaderboard aggregations (`SUM` by tenant). |
| `ActivatedReference` | Activity | Join linking an announcement to one or more references activated during the operation. |
| `ActivityEvidence` | Activity | Proof of activation (photos, video). Logs are **not** evidence — they are state in the Ingestion context. |
| `LogSubmission` | Ingestion | An uploaded ADIF file. Parsed into individual `QSOClaim` entries with `submissionMethod: ADIF_BULK`. A `QSOClaim` created via bulk upload **always** belongs to a `LogSubmission`. |
| `QSOClaim` | Ingestion | A single contact claim representing one QSO between an activator and a hunter. **No polymorphic ambiguity:** `activatorStationId` (FK → Station) always identifies the activating station, `hunterCallsign` (string) always identifies the hunter, and `submitterAccountId` (FK → Account) identifies who created the record — regardless of submission method. `submissionMethod` discriminates origin: `ADIF_BULK` (parsed from a `LogSubmission`) or `MANUAL_HUNTER` (submitted directly against an `ActivityAnnouncement`, `LogSubmission` is `NULL`). Admin-validated: `PENDING` → `CONFIRMED` / `REJECTED`. `hunterReferenceCode` is nullable — V2 Park-to-Park multiplier scoring. `affiliatedTenantId` is nullable — V2 club-level leaderboard aggregations. |
| `UserAwardProgress` | Scoring | Tracks a Station's cumulative progress toward an `AwardInstance`. `currentScore` is an integer that increments by 1 when a `QSOClaim` is marked `CONFIRMED` by an admin (MVP behavior). Named `currentScore` rather than `confirmedCount` to prevent API contract breakage when V2 introduces penalties (decrements) and multipliers (non-unit increments). |
| `AuditLog` | Infrastructure | Append-only ledger tracking "who did what, when" for critical domain mutations. `actorAccountId` identifies the person, `action` is the verb (e.g. `CREATED`, `UPDATED`, `STATUS_CHANGED`, `DELETED`), `targetEntityType` + `targetEntityId` identify what was affected, and `diff` (JSONB) captures the before/after snapshot. Loosely coupled — no foreign keys to domain entities; queried by type + id. |

## MVP Scoring Flow

```text
Admin confirms QSOClaim via API
        │
        ▼
QSOClaim.status = CONFIRMED
        │
        ▼ traverse: QSOClaim → ActivityAnnouncement → AwardInstance
        │
        ▼
UserAwardProgress.currentScore++ (for the claiming Station + AwardInstance)
        │
        ▼
Evaluate threshold: currentScore >= AwardInstance.rulesSnapshot.threshold?
        │
    ┌───┴───┐
    No      Yes → ProgressStatus = ACHIEVED
```

**Scoring route:** every `QSOClaim` is linked to an `ActivityAnnouncement`, which is scoped to exactly one `AwardInstance`. When an admin confirms a claim, the system resolves the target `UserAwardProgress` by following `QSOClaim` → `ActivityAnnouncement` → `AwardInstance` and matching the claiming `Station`. No fan-out or ambiguity.

**MVP behavior:** `currentScore` increments by 1 per confirmed claim. The field is intentionally named `currentScore` (not `confirmedCount`) so the API contract survives V2 changes — penalties will decrement it, Park-to-Park multipliers will increment by >1.

## Context Mapping to ARCHITECTURE.md Modules

| Module | Entities |
|---|---|
| **Identity** | `Tenant`, `Account`, `TenantMembership`, `Station`, `Delegation` |
| **Ingestion** | `LogSubmission`, `QSOClaim` |
| **Scoring** | `UserAwardProgress` |
| **Activity** | `ActivityAnnouncement`, `ActivatedReference`, `ActivityEvidence` |
| **Award Definition** | `AwardCategory`, `AwardDefinition`, `AwardInstance`, `Reference` |
| **Infrastructure** | `AuditLog` |
