-- ============================================
-- CbCR Risk Analyzer Database Schema
-- ============================================

-- 1. USERS
CREATE TABLE public.users
(
    id uuid NOT NULL,
    github_id character varying(255) NOT NULL,
    username character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    avatar_url character varying(500),
    github_url character varying(500),
    role character varying(50) NOT NULL DEFAULT 'USER',
    preferred_language character varying(2) DEFAULT 'de',
    created_at timestamp without time zone NOT NULL,
    last_login_at timestamp without time zone,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_github_id_key UNIQUE (github_id),
    CONSTRAINT users_username_key UNIQUE (username)
);

-- 2. COUNTRIES
CREATE TABLE public.countries
(
    id uuid NOT NULL,
    country_code character varying(2) NOT NULL,
    country_name character varying(100) NOT NULL,
    region character varying(50),
    jurisdiction_type character varying(20),
    tax_haven boolean NOT NULL DEFAULT false,
    expected_tax_rate numeric(5,2),
    statutory_tax_rate numeric(5,2),
    is_eu_member boolean NOT NULL DEFAULT false,
    is_oecd_member boolean NOT NULL DEFAULT false,
    blacklist_status character varying(20),
    created_at timestamp without time zone NOT NULL,
    CONSTRAINT countries_pkey PRIMARY KEY (id),
    CONSTRAINT countries_country_code_key UNIQUE (country_code),
    CONSTRAINT countries_country_name_key UNIQUE (country_name)
);

CREATE INDEX idx_countries_code ON public.countries (country_code);

-- 3. COMPANIES
CREATE TABLE public.companies
(
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    industry character varying(100),
    headquarters_country_id uuid,
    reporting_currency character varying(3) DEFAULT 'EUR',
    tax_identification_number character varying(50),
    lei_code character varying(20),
    parent_company_id uuid,
    is_ultimate_parent boolean NOT NULL DEFAULT true,
    consolidation_scope character varying(50),
    cbcr_reporting_threshold numeric(15,2),
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    image_url character varying(500),
    CONSTRAINT companies_pkey PRIMARY KEY (id),
    CONSTRAINT fk_headquarters_country FOREIGN KEY (headquarters_country_id)
        REFERENCES public.countries (id),
    CONSTRAINT fk_parent_company FOREIGN KEY (parent_company_id)
        REFERENCES public.companies (id)
);

CREATE INDEX idx_companies_name ON public.companies (name);

-- 4. SUBSIDIARIES
CREATE TABLE public.subsidiaries
(
    id uuid NOT NULL,
    company_id uuid NOT NULL,
    name character varying(255) NOT NULL,
    country_id uuid NOT NULL,
    lei_code character varying(20),
    tax_identification_number character varying(50),
    entity_type character varying(30),
    main_business_activity character varying(50),
    additional_activities text,
    is_active boolean NOT NULL DEFAULT true,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    CONSTRAINT subsidiaries_pkey PRIMARY KEY (id),
    CONSTRAINT uk_subsidiary_company_name_country UNIQUE (company_id, name, country_id),
    CONSTRAINT fk_subsidiary_company FOREIGN KEY (company_id)
        REFERENCES public.companies (id),
    CONSTRAINT fk_subsidiary_country FOREIGN KEY (country_id)
        REFERENCES public.countries (id)
);

CREATE INDEX idx_subsidiaries_company ON public.subsidiaries (company_id);

-- 5. CBCR_REPORTS
CREATE TABLE public.cbcr_reports
(
    id uuid NOT NULL,
    company_id uuid NOT NULL,
    reporting_year integer NOT NULL,
    fiscal_year_end date,
    country_id uuid NOT NULL,
    revenues_unrelated_party numeric(15,2),
    revenues_related_party numeric(15,2),
    revenues_total numeric(15,2),
    profit_before_tax numeric(15,2),
    income_tax_paid numeric(15,2),
    income_tax_accrued numeric(15,2),
    effective_tax_rate numeric(6,3),
    expected_tax_rate numeric(5,2),
    stated_capital numeric(15,2),
    accumulated_earnings numeric(15,2),
    tangible_assets numeric(15,2),
    intangible_assets numeric(15,2),
    number_of_employees integer,
    revenue_per_employee numeric(10,2),
    comment_reference character varying(10),
    tax_explanation text,
    data_source character varying(20) DEFAULT 'IFRS',
    audit_status character varying(20) DEFAULT 'DRAFT',
    business_activities text,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    CONSTRAINT cbcr_reports_pkey PRIMARY KEY (id),
    CONSTRAINT uk_cbcr_company_year_country UNIQUE (company_id, reporting_year, country_id),
    CONSTRAINT fk_cbcr_company FOREIGN KEY (company_id)
        REFERENCES public.companies (id),
    CONSTRAINT fk_cbcr_country FOREIGN KEY (country_id)
        REFERENCES public.countries (id)
);

CREATE INDEX idx_cbcr_company_year ON public.cbcr_reports (company_id, reporting_year);
CREATE INDEX idx_cbcr_country ON public.cbcr_reports (country_id);

-- 6. RISK_ASSESSMENTS
CREATE TABLE public.risk_assessments
(
    id uuid NOT NULL,
    cbcr_report_id uuid NOT NULL,
    overall_risk_level character varying(20),
    risk_score numeric(5,2),
    low_etr_flag boolean NOT NULL DEFAULT false,
    tax_haven_flag boolean NOT NULL DEFAULT false,
    profit_shifting_indicator boolean NOT NULL DEFAULT false,
    negative_tax_flag boolean NOT NULL DEFAULT false,
    high_revenue_low_tax_flag boolean NOT NULL DEFAULT false,
    substance_mismatch_flag boolean NOT NULL DEFAULT false,
    blacklist_jurisdiction_flag boolean NOT NULL DEFAULT false,
    etr_variance numeric(6,3),
    revenue_per_employee_ratio numeric(12,2),
    profit_per_employee_ratio numeric(12,2),
    risk_explanation text,
    recommended_action text,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    CONSTRAINT risk_assessments_pkey PRIMARY KEY (id),
    CONSTRAINT risk_assessments_cbcr_report_id_key UNIQUE (cbcr_report_id),
    CONSTRAINT fk_risk_cbcr_report FOREIGN KEY (cbcr_report_id)
        REFERENCES public.cbcr_reports (id)
);

CREATE INDEX idx_risk_cbcr ON public.risk_assessments (cbcr_report_id);

-- 7. AUDIT_LOGS
CREATE TABLE public.audit_logs
(
    id uuid NOT NULL,
    table_name character varying(100) NOT NULL,
    record_id uuid NOT NULL,
    action character varying(10) NOT NULL,
    field_name character varying(100),
    old_value text,
    new_value text,
    user_id uuid,
    username character varying(100),
    ip_address character varying(45),
    created_at timestamp without time zone NOT NULL,
    CONSTRAINT audit_logs_pkey PRIMARY KEY (id),
    CONSTRAINT fk_audit_user FOREIGN KEY (user_id)
        REFERENCES public.users (id)
);

CREATE INDEX idx_audit_created ON public.audit_logs (created_at);
CREATE INDEX idx_audit_table_record ON public.audit_logs (table_name, record_id);
CREATE INDEX idx_audit_user ON public.audit_logs (user_id);