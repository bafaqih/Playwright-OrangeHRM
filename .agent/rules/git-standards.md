---
trigger: always_on
---

# Git & GitHub Standards

**Branching Strategy:**
- NEVER push to `main` directly.
- Format: `feature/<module-name>` or `fix/<bug-name>`.
- Example: `feature/login-scenarios`, `fix/dashboard-widget`.

**Commit Messages (Conventional Commits):**
- Format: `type: description`
- Types:
  - `feat`: New test scenario.
  - `fix`: Bug fix in script.
  - `chore`: Config updates.
  - `docs`: Documentation updates.
- Example: `feat: implement login negative test cases`