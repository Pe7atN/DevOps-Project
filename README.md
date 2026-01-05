# City Explorer – DevOps Project

## Overview

**City Explorer** is a full-stack city information application designed to demonstrate a complete, automated DevOps software delivery lifecycle — from local development to a production-ready Kubernetes cluster.

The project follows a **T‑shaped DevOps approach**, covering a broad set of DevOps practices while providing a deep dive into **automated security (SAST)** and **database migrations**.

The application consists of:

* **React frontend**
* **Node.js backend** (REST API)
* **PostgreSQL database** for persistent city data

---

## DevOps Topics Covered (9 Topics)

This project exceeds the mandatory requirement of 7 DevOps topics.

| Topic                  | Implementation Details                                           |
| ---------------------- | ---------------------------------------------------------------- |
| Phases of SDLC         | Managed through an automated Git-based workflow                  |
| Source Control         | Git repository with branching strategies                         |
| Continuous Integration | Automated unit tests, linting, and style checks                  |
| Continuous Delivery    | Automated Docker image build and push to a central registry      |
| Security (SAST)        | Deep dive using GitHub CodeQL vulnerability scanning             |
| Docker                 | Multi-stage builds for frontend and backend images               |
| Kubernetes             | Orchestration via Deployments, Services, ConfigMaps, and Secrets |
| Database Changes       | Automated SQL delta testing and initialization scripts           |
| Infrastructure as Code | Kubernetes manifests and automation scripts                      |

---

## Architecture

### Application Design

* React frontend communicates with the Node.js backend via REST API
* Backend persists and retrieves data from PostgreSQL
* Stateless services deployed in Kubernetes

### DevOps Pipeline Design

The CI/CD pipeline follows a modern automated flow:

```
Git Push → CI (Lint & Tests) → SQL Delta Test → Docker Build → SAST Scan → Kubernetes Deploy
```

---

## Project Structure

```
.github/workflows/ci.yml   # CI/CD automation pipeline
k8s/                       # Kubernetes manifests
src/db/                    # SQL delta files for database versioning
  ├── 01_init.sql
  └── 02_delta_add_country.sql
src/server/                # Node.js backend source code and tests
src/client/                # React frontend application
k8s-start.sh               # Local Kubernetes (Minikube) automation script
```

---

## Development & Implementation Details

### Database Initialization

* Uses a **Code-as-Config** approach
* SQL files located in `src/db/` are dynamically converted into Kubernetes ConfigMaps
* Database schema is initialized and versioned automatically

### Self-Healing

* Kubernetes **Liveness** and **Readiness** probes
* Backend only becomes ready after the database is fully initialized

### Secret Management

* Database credentials are stored as **Kubernetes Secrets**
* Secrets are injected securely as environment variables

---

## Getting Started

### Local Deployment (Minikube)

1. Clone the repository:

   ```bash
   git clone https://github.com/Pe7atN/DevOps-Project
   ```

2. Start the local Kubernetes cluster:

   ```bash
   chmod +x k8s-start.sh
   ./k8s-start.sh
   ```

The script:

* Creates ConfigMaps from SQL files
* Applies all Kubernetes manifests
* Waits for all services to become ready

---

### Running Tests Locally

```bash
cd src/server
npm install
npm test
```

---

## Security & Quality Assurance

### SAST (Deep Dive)

* GitHub **CodeQL** scans on every push
* Detects common vulnerabilities such as:

  * Cross-Site Scripting (XSS)
  * Injection flaws

### SQL Delta Testing

* CI pipeline spins up a temporary PostgreSQL container
* Validates SQL syntax and migration order before deployment

---

## Summary

City Explorer demonstrates a production-grade DevOps workflow combining automation, security, scalability, and infrastructure-as-code principles. It serves as a complete example of how modern DevOps practices can be applied to a real-world full-stack application.
