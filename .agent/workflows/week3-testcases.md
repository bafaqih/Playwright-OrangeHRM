---
description: 
---

# Week 3: Functional Test Cases Specification

Use this document as the "Source of Truth" for generating automation scripts. Implement strictly according to these scenarios.

## 1. Authentication Module
**File Target:** `tests/auth.spec.ts`
**Link Login:** https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
**Link Dashboard (After Login):**https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index

| ID | Type | Summary | Test Data | Expected Result |
| :--- | :--- | :--- | :--- | :--- |
| **TC-AUTH-001** | Positive | Verify login with valid Admin credentials | User: `Admin`<br>Pass: `admin123` | Redirect to Dashboard page. |
| **TC-AUTH-002** | Negative | Verify login with invalid Password | User: `Admin`<br>Pass: `salah123` | Error message: "Invalid credentials". |
| **TC-AUTH-003** | Negative | Verify login with invalid Username | User: `Unknown`<br>Pass: `admin123` | Error message: "Invalid credentials". |
| **TC-AUTH-004** | Negative | Verify login with empty fields | User: `<empty>`<br>Pass: `<empty>` | Error message: "Required" under input fields. |
| **TC-AUTH-005** | Positive | Verify Logout functionality | - | Redirect to Login page. |

---

## 2. PIM (Employee Management) Module
**File Target:** `tests/pim.spec.ts`
**Pre-condition:** User logged in as Admin.

| ID | Type | Summary | Steps / Data | Expected Result |
| :--- | :--- | :--- | :--- | :--- |
| **TC-PIM-001** | Positive | Add Employee (Standard) | 1. Go to PIM > Add Employee<br>2. Fill First/Last Name<br>3. Save | Profile saved successfully. Personal Details displayed. |
| **TC-PIM-002** | Positive | Add Employee WITH Login Details | 1. Toggle 'Create Login Details' ON<br>2. Fill User/Pass/Status<br>3. Save | Employee and User Account created simultaneously. |
| **TC-PIM-003** | Negative | Add Employee without Last Name | 1. Fill First Name only<br>2. Leave Last Name empty<br>3. Save | Error "Required" under Last Name field. |
| **TC-PIM-004** | Negative | Create Login Details with Password Mismatch | 1. Toggle Login ON<br>2. Pass: `Abc123`, Conf: `Xyz123` | Error "Passwords do not match". |
| **TC-PIM-005** | Negative | Add Employee with existing Employee ID | 1. Use existing ID (e.g., "0024") | Error "Employee Id already exists". |

---

## 3. Admin (User Management) Module
**File Target:** `tests/admin.spec.ts`
**Pre-condition:** User logged in as Admin.

| ID | Type | Summary | Steps / Data | Expected Result |
| :--- | :--- | :--- | :--- | :--- |
| **TC-ADM-001** | Positive | Add User for Existing Employee | 1. Admin > Add User<br>2. Role: ESS<br>3. Employee: Type & Select existing name<br>4. Fill User/Pass | User successfully added to the list. |
| **TC-ADM-002** | Negative | Add User for Unregistered Employee | 1. Employee Name: "Ghost User" | Validation error "Invalid" / No autocomplete suggestion. |
| **TC-ADM-003** | Negative | Add User with Duplicate Username | 1. Username: "Admin" (existing) | Error "Already exists" under Username field. |
| **TC-ADM-004** | Negative | Add User with Weak Password | 1. Password: "12345" | Error "Very Weak" or password requirements hint displayed. |
| **TC-ADM-005** | Positive | Search System User by Username | 1. Search Username: "Admin" | Table only shows user "Admin". |

---

## 4. Dashboard & My Info Module
**File Target:** `tests/dashboard.spec.ts`
**Pre-condition:** User logged in as Admin.

| ID | Type | Summary | Steps / Data | Expected Result |
| :--- | :--- | :--- | :--- | :--- |
| **TC-DASH-001** | Positive | Verify Quick Launch Widget | 1. Click "Assign Leave" icon in Quick Launch | Redirects to Assign Leave page. |
| **TC-DASH-002** | Positive | Check My Actions Widget | 1. Check "My Actions" card visibility | Widget is visible (Validation of specific count is optional). |
| **TC-DASH-003** | Positive | Check Side Menu Collapse | 1. Click the '<' arrow button in the sidebar | The sidebar menu collapses to just an icon. |
| **TC-INFO-001** | Negative | Update My Info with invalid Email | 1. Go to My Info > Contact<br>2. Email: "hasan.com" (no @) | Error message indicating invalid format. |
| **TC-INFO-002** | Negative | Upload Profile Picture > 1MB | 1. Click Profile Image<br>2. Upload file > 1MB | Error message "Attachment Size Exceeded" (or similar). |