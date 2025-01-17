# Frontend - Candidate Referral Management System

## Overview

This is the frontend application for the Candidate Referral Management System. It is built using React.js and interacts with the backend to manage referrals and candidate data. It includes role-based functionality, allowing employees and managers to access different features.

---

## Tech Stack

- React.js
- Redux (for state management)
- Axios (for API requests)
- Bootstrap (for UI design)

---

## Features

- **Role-Based Access**:
    - Employees can:
        - Refer candidates through a form.
        - View the candidates they referred.
    - Managers can:
        - View all referred candidates.
        - Update candidate statuses (e.g., Pending, Reviewed, Hired).
        - View system metrics such as total candidates referred and breakdown by status.
- **Responsive Design**: Mobile-friendly user interface.
- **File Upload**: Allows resume uploads during candidate referral.

---

## Prerequisites

- Node.js (>= 14.x)
- NPM or Yarn

---

## Installation

1. Navigate to the `frontend` directory:
    
    ```bash
    cd client
    ```
    
2. Install dependencies:
    
    ```bash
    npm install
    ```
    
3. Start the development server:
    
    ```bash
    npm run dev
    ```
    
    The application will run on `http://localhost:3000`.

---

## Environment Variables

Create a `.env` file in the `frontend` directory and include the following variables:

```
VITE_API_URL=http://localhost:8080
```

Replace `http://localhost:8080` with the URL of your deployed backend if applicable.

---

## Key Components

### AddForm Component

- **Description**: Form to refer new candidates.
- **Features**:
    - Input fields: Name, Email, Phone, Job Title, and Resume.
    - Resume file upload with validation for PDF format.
    - Submits data to the backend.

### CandidateDashboard Component

- **Description**: Displays a list of referred candidates.
- **Features**:
    - Employee view: Shows candidates referred by the logged-in user.
    - Manager view: Shows all referred candidates.
    - Search and filter by job title and status.

### MetricsDashboard Component (Manager-Only)

- **Description**: Displays system metrics.
- **Features**:
    - Total number of candidates.
    - Breakdown of candidates by status (Pending, Reviewed, Hired).

---

## State Management

- Redux is used to manage global state.
- **Actions**:
    - `addCandidate`: Adds a new candidate.
    - `fetchCandidates`: Retrieves candidates based on user role.
    - `updateStatus`: Updates a candidate’s status (Manager-only).
    - `fetchMetrics`: Fetches system metrics (Manager-only).
