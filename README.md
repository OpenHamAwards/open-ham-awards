# 📻 Open Ham Awards
**The lightweight, open-source contest and award management platform for Amateur Radio clubs.**

*Project Status: Early Development 🚧 | [Join the Waitlist for Early Access](http://openhamawards.com)*

## **The Problem**
Running a club contest or award program today usually means wrestling with bloated, legacy enterprise software or drowning in messy Excel sheets and emailed ADIF files. 

## **The Solution**
**Open Ham Awards** is built from the ground up to give local clubs and contest managers a modern, frictionless way to host, track, and validate radio activity awards. No bloat, no confusing UI—just the tools you need to run a great event. 

## **Core MVP Features**
* **🏁 Custom Award Engine:** Easily define award parameters, locations (references), and scoring criteria for your specific club event.
* **📡 Activator Announcements:** Operators can schedule and announce their planned activations directly on the platform, building hype for the hunters.
* **✅ Painless Validation:** Activators submit logs/evidence, and hunters submit their contacts. The platform provides a streamlined dashboard for managers to validate activities and cross-check logs without the headache.
* **🏆 Live Progress Tracking:** Hunters get a dedicated dashboard to track their validated contacts and see their real-time progress toward the award.

## **Why Open Source?**
Built by engineers and ham operators. We believe club infrastructure should be transparent, extensible, and free from vendor lock-in.

## 💻 For Developers & Contributors

This repository is structured as a pnpm monorepo, separating the Next.js frontend client from the Nest.JS backend API.

### **Tech Stack**
* **Frontend:** Next.js (React), Tailwind CSS
* **Backend API:** Nest.JS (Node.js, TypeScript)
* **Database:** PostgreSQL (planned)
* **Monorepo Management:** pnpm workspaces

### **Domain Model**
The proposed domain model and API contracts can be found in the [`/docs`](docs/) folder.

### **Getting Started (Development)**
Clone the repository:

```bash
git clone https://github.com/OpenHamAwards/open-ham-awards.git
cd open-ham-awards
```

Install dependencies:
```bash
pnpm install
```

Run development servers:
```bash
# Run both frontend and backend concurrently
pnpm dev

# Run frontend (Next.js) only
pnpm dev:web

# Run backend (Nest.JS) only
pnpm dev:api
```
*(Further details on database setup, environment variables, etc., will be added as development progresses.)*

### **Contributing & License**

This project is open source. Please refer to `CONTRIBUTING.md` (to be created) for guidelines. 
Licensed under the **AGPLv3** license.
