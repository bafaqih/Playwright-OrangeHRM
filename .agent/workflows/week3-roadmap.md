---
description: 
---

# Week 3: Automation Implementation Plan

We are automating OrangeHRM Demo. Implement these strictly module by module.

## Workflow 1: Authentication Module (`tests/auth.spec.ts`)
- [ ] TC-AUTH-001: Positive Login (Valid Credentials)
- [ ] TC-AUTH-002: Negative Login (Invalid Password)
- [ ] TC-AUTH-003: Negative Login (Invalid Username)
- [ ] TC-AUTH-004: Negative Login (Empty Fields)
- [ ] TC-AUTH-005: Logout Functionality

## Workflow 2: PIM Module (`tests/pim.spec.ts`)
- [ ] TC-PIM-001: Add Employee (Standard)
- [ ] TC-PIM-002: Add Employee WITH Login Details
- [ ] TC-PIM-003: Add Employee without Last Name (Negative)
- [ ] TC-PIM-004: Password Mismatch on Creation (Negative)
- [ ] TC-PIM-005: Existing Employee ID (Negative)

## Workflow 3: Admin Module (`tests/admin.spec.ts`)
- [ ] TC-ADM-001: Add User for Existing Employee
- [ ] TC-ADM-002: Add User for Unregistered Employee (Negative)
- [ ] TC-ADM-003: Duplicate Username (Negative)
- [ ] TC-ADM-004: Weak Password Validation (Negative)
- [ ] TC-ADM-005: Search System User

## Workflow 4: Dashboard Module (`tests/dashboard.spec.ts`)
- [ ] TC-DASH-001: Quick Launch Widget Check
- [ ] TC-DASH-002: My Actions Widget Check
- [ ] TC-DASH-003: Side Menu Collapse Check
- [ ] TC-INFO-001: Update Info with Invalid Email
- [ ] TC-INFO-002: Upload Profile Picture > 1MB