 # CbCR Risk Analyzer

  A full-stack web application for analyzing Country-by-Country Reporting (CbCR) data and assessing transfer pricing risks for multinational companies.

  🔗 **Live Demo:** [cbcrriskanalyzer.onrender.com](https://cbcrriskanalyzer.onrender.com)

  ⚠️ **Note:** This project is hosted on a free-tier Render server. The site takes ~45s to go live after clicking the link.

  ---

  ## 📊 Code Quality

  ### Backend
[![Quality gate](https://sonarcloud.io/api/project_badges/quality_gate?project=ropold_CbCRRiskAnalyzer-backend)](https://sonarcloud.io/summary/new_code?id=ropold_CbCRRiskAnalyzer-backend)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ropold_CbCRRiskAnalyzer-backend&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ropold_CbCRRiskAnalyzer-backend)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=ropold_CbCRRiskAnalyzer-backend&metric=bugs)](https://sonarcloud.io/summary/new_code?id=ropold_CbCRRiskAnalyzer-backend)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=ropold_CbCRRiskAnalyzer-backend&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=ropold_CbCRRiskAnalyzer-backend)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=ropold_CbCRRiskAnalyzer-backend&metric=coverage)](https://sonarcloud.io/summary/new_code?id=ropold_CbCRRiskAnalyzer-backend)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=ropold_CbCRRiskAnalyzer-backend&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=ropold_CbCRRiskAnalyzer-backend)


  ### Frontend
  
[![Quality gate](https://sonarcloud.io/api/project_badges/quality_gate?project=ropold_CbCRRiskAnalyzer-frontend)](https://sonarcloud.io/summary/new_code?id=ropold_CbCRRiskAnalyzer-frontend)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ropold_CbCRRiskAnalyzer-frontend&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ropold_CbCRRiskAnalyzer-frontend)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=ropold_CbCRRiskAnalyzer-frontend&metric=bugs)](https://sonarcloud.io/summary/new_code?id=ropold_CbCRRiskAnalyzer-frontend)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=ropold_CbCRRiskAnalyzer-frontend&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=ropold_CbCRRiskAnalyzer-frontend)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=ropold_CbCRRiskAnalyzer-frontend&metric=coverage)](https://sonarcloud.io/summary/new_code?id=ropold_CbCRRiskAnalyzer-frontend)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=ropold_CbCRRiskAnalyzer-frontend&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=ropold_CbCRRiskAnalyzer-frontend)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=ropold_CbCRRiskAnalyzer-frontend&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=ropold_CbCRRiskAnalyzer-frontend)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=ropold_CbCRRiskAnalyzer-frontend&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=ropold_CbCRRiskAnalyzer-frontend)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=ropold_CbCRRiskAnalyzer-frontend&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=ropold_CbCRRiskAnalyzer-frontend)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=ropold_CbCRRiskAnalyzer-frontend&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=ropold_CbCRRiskAnalyzer-frontend)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=ropold_CbCRRiskAnalyzer-frontend&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=ropold_CbCRRiskAnalyzer-frontend)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=ropold_CbCRRiskAnalyzer-frontend&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=ropold_CbCRRiskAnalyzer-frontend)


  ---

  ## 🛠️ Tech Stack

  ### Backend
  - **Java 21** - Modern LTS version with latest features
  - **Spring Boot 3.x** - Enterprise application framework
  - **Spring Security** - OAuth2 authentication and authorization
  - **Spring Data JPA** - Database abstraction layer
  - **PostgreSQL** - Relational database with full SQL support
  - **Hibernate** - ORM with automatic schema generation
  - **Maven** - Dependency management and build tool

  ### Frontend
  - **React 18** - Modern UI library with hooks
  - **TypeScript** - Type-safe JavaScript
  - **React Router 6** - Client-side routing
  - **Axios** - HTTP client for API calls
  - **Vite** - Fast build tool and dev server
  - **CSS3** - Custom styling with responsive design

  ### DevOps & Tools
  - **Docker** - Containerization for deployment
  - **GitHub Actions** - CI/CD pipeline automation
  - **Render** - Cloud platform for hosting
  - **SonarCloud** - Code quality and security analysis
  - **H2 Database** - In-memory database for testing

  ---
  ## 🗄️ Database Schema

  <p>
    <a href="https://dbdiagram.io/d/CbCr-RiskAnalyzer-Db-68d653f7d2b621e4220890de">
      <img src="https://github.com/Ropold/CbCRRiskAnalyzer/blob/master/frontend/src/assets/PostgreSQL-Elephant.png?raw=true" alt="PostgreSQL Logo"
  width="30"/>&nbsp;
      View Interactive Database Diagram
    </a>
  </p>

  ### Main Entities

  **Companies**
  - Multinational group information
  - Headquarters country, LEI code, tax IDs
  - Reporting currency and consolidation method
  - Industry classification

  **CbCR Reports**
  - Country-specific financial data per reporting year
  - Revenue (related/unrelated party, total)
  - Profit/loss before tax
  - Income tax paid and accrued
  - Stated capital, accumulated earnings, tangible assets
  - Number of employees and revenue per employee
  - Effective vs. statutory tax rates
  - Main business activities per jurisdiction

  **Countries**
  - ISO country codes and names
  - Geographic regions
  - Current and minimum statutory tax rates
  - EU membership status
  - OECD/EU blacklist status
  - Jurisdiction types (country, territory, tax haven)

  **Subsidiaries**
  - Legal entity information
  - Parent company relationship
  - Country of incorporation
  - LEI codes and tax IDs
  - Entity types (subsidiary, branch, PE, etc.)
  - Main business activities
  - Active/inactive status

  **Risk Assessments**
  - Linked to CbCR reports
  - Automated risk severity calculation
  - Risk score (0-100)
  - Tax rate deviation analysis
  - Profit margin per employee metrics
  - Detailed risk explanation text
  - Assessment timestamps

  **Audit Logs**
  - Complete change history
  - Table name, record ID, operation type
  - Field-level old/new values
  - Username and IP address
  - Timestamp tracking
  - Read-only for compliance

  ### Relationships
  - Companies → CbCR Reports (one-to-many)
  - Companies → Subsidiaries (one-to-many)
  - Countries → CbCR Reports (one-to-many)
  - Countries → Subsidiaries (one-to-many)
  - Countries → Companies (headquarters)
  - CbCR Reports → Risk Assessments (one-to-one)

  ---
   ## 📁 Project Structure

  ```
  CbCRRiskAnalyzer/
  ├── backend/
  │   └── src/
  │       ├── main/
  │       │   ├── java/de/ropold/backend/
  │       │   │   ├── config/         # Security, CORS, Audit config
  │       │   │   ├── controller/     # REST API endpoints
  │       │   │   ├── dto/            # Data Transfer Objects
  │       │   │   ├── model/          # JPA entities
  │       │   │   ├── repository/     # Database repositories
  │       │   │   └── service/        # Business logic
  │       │   └── resources/
  │       │       └── application.properties
  │       └── test/
  │           └── java/de/ropold/backend/
  │               └── controller/     # Integration tests
  ├── frontend/
  │   └── src/
  │       ├── assets/                 # Images, logos
  │       ├── components/
  │       │   ├── auditlog/          # Audit log components
  │       │   ├── company/           # Company CRUD
  │       │   ├── entitydata/
  │       │   │   ├── cbcr/          # CbCR report CRUD
  │       │   │   ├── country/       # Country CRUD
  │       │   │   ├── riskassessment/ # Risk assessment CRUD
  │       │   │   └── subsidiary/    # Subsidiary CRUD
  │       │   ├── dto/               # TypeScript DTOs
  │       │   ├── models/            # TypeScript models
  │       │   └── utils/             # Helper functions, hooks
  │       ├── App.tsx                # Main routing
  │       └── main.tsx               # Entry point
  ├── docker-compose.yml
  └── README.md
  ```

   ## 🔌 API Endpoints

  Authentication

  - GET /api/users/me - Get current username
  - GET /api/users/me/details - Get current user details
  - GET /oauth2/authorization/github - GitHub OAuth login
  - POST /api/users/logout - Logout (clear session)

  Companies

  - GET /api/companies - List all companies
  - GET /api/companies/{id} - Get company by ID
  - POST /api/companies - Create new company (authenticated)
  - PUT /api/companies/{id} - Update company (authenticated)
  - DELETE /api/companies/{id} - Delete company (authenticated)

  CbCR Reports

  - GET /api/cbcr-reports - List all reports
  - GET /api/cbcr-reports/{id} - Get report by ID
  - POST /api/cbcr-reports - Create new report (authenticated)
  - PUT /api/cbcr-reports/{id} - Update report (authenticated)
  - DELETE /api/cbcr-reports/{id} - Delete report (authenticated)

  Countries

  - GET /api/countries - List all countries
  - GET /api/countries/{id} - Get country by ID
  - POST /api/countries - Create new country (authenticated)
  - PUT /api/countries/{id} - Update country (authenticated)
  - DELETE /api/countries/{id} - Delete country (authenticated)

  Subsidiaries

  - GET /api/subsidiaries - List all subsidiaries
  - GET /api/subsidiaries/{id} - Get subsidiary by ID
  - POST /api/subsidiaries - Create new subsidiary (authenticated)
  - PUT /api/subsidiaries/{id} - Update subsidiary (authenticated)
  - DELETE /api/subsidiaries/{id} - Delete subsidiary (authenticated)

  Risk Assessments

  - GET /api/risk-assessments - List all assessments
  - GET /api/risk-assessments/{id} - Get assessment by ID
  - POST /api/risk-assessments - Create new assessment (authenticated)
  - PUT /api/risk-assessments/{id} - Update assessment (authenticated)
  - DELETE /api/risk-assessments/{id} - Delete assessment (authenticated)

  Audit Logs (Read-Only)

  - GET /api/audit-logs - List all audit logs (authenticated)
  - GET /api/audit-logs/{id} - Get audit log by ID (authenticated)

  ---
   Last Updated: October 2025
