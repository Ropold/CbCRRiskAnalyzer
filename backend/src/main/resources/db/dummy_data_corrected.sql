-- ============================================
-- DUMMY DATEN FÜR CbCR RISK ANALYZER (CORRECTED)
-- ============================================

-- 1. TEST USER ERSTELLEN
INSERT INTO users (id, github_id, username, name, avatar_url, role, created_at, last_login_at)
VALUES (
    gen_random_uuid(),
    'github_123456',
    'test_user',
    'Test User',
    'https://avatars.githubusercontent.com/u/123456',
    'ADMIN',
    NOW(),
    NOW()
);

-- 2. LÄNDER EINFÜGEN
INSERT INTO countries (id, country_code, country_name, expected_tax_rate, is_eu_member, is_oecd_member, created_at)
VALUES
    (gen_random_uuid(), 'DE', 'Germany', 31.0, TRUE, TRUE, NOW()),
    (gen_random_uuid(), 'US', 'United States', 21.0, FALSE, TRUE, NOW()),
    (gen_random_uuid(), 'FR', 'France', 25.8, TRUE, TRUE, NOW()),
    (gen_random_uuid(), 'GB', 'United Kingdom', 19.0, FALSE, TRUE, NOW()),
    (gen_random_uuid(), 'IT', 'Italy', 24.0, TRUE, TRUE, NOW()),
    (gen_random_uuid(), 'IE', 'Ireland', 12.5, TRUE, TRUE, NOW()),
    (gen_random_uuid(), 'CH', 'Switzerland', 18.0, FALSE, TRUE, NOW()),
    (gen_random_uuid(), 'AU', 'Australia', 30.0, FALSE, TRUE, NOW()),
    (gen_random_uuid(), 'ES', 'Spain', 25.0, TRUE, TRUE, NOW()),
    (gen_random_uuid(), 'NL', 'Netherlands', 25.8, TRUE, TRUE, NOW()),
    (gen_random_uuid(), 'BR', 'Brazil', 34.0, FALSE, FALSE, NOW()),
    (gen_random_uuid(), 'TR', 'Turkey', 25.0, FALSE, TRUE, NOW()),
    (gen_random_uuid(), 'PL', 'Poland', 19.0, TRUE, TRUE, NOW()),
    (gen_random_uuid(), 'LU', 'Luxembourg', 24.9, TRUE, TRUE, NOW()),
    (gen_random_uuid(), 'SG', 'Singapore', 10.0, FALSE, FALSE, NOW()),
    (gen_random_uuid(), 'BE', 'Belgium', 25.0, TRUE, TRUE, NOW()),
    (gen_random_uuid(), 'CN', 'China', 25.0, FALSE, FALSE, NOW()),
    (gen_random_uuid(), 'MY', 'Malaysia', 24.0, FALSE, FALSE, NOW()),
    (gen_random_uuid(), 'SE', 'Sweden', 20.6, TRUE, TRUE, NOW()),
    (gen_random_uuid(), 'MX', 'Mexico', 30.0, FALSE, TRUE, NOW()),
    (gen_random_uuid(), 'NO', 'Norway', 22.0, FALSE, TRUE, NOW()),
    (gen_random_uuid(), 'ZA', 'South Africa', 27.0, FALSE, FALSE, NOW()),
    (gen_random_uuid(), 'AT', 'Austria', 25.0, TRUE, TRUE, NOW()),
    (gen_random_uuid(), 'AR', 'Argentina', 35.0, FALSE, FALSE, NOW()),
    (gen_random_uuid(), 'HK', 'Hong Kong', 16.5, FALSE, FALSE, NOW()),
    (gen_random_uuid(), 'TH', 'Thailand', 20.0, FALSE, FALSE, NOW()),
    (gen_random_uuid(), 'CZ', 'Czech Republic', 19.0, TRUE, TRUE, NOW()),
    (gen_random_uuid(), 'BM', 'Bermuda', 0.0, FALSE, FALSE, NOW()),
    (gen_random_uuid(), 'RO', 'Romania', 16.0, TRUE, TRUE, NOW()),
    (gen_random_uuid(), 'ID', 'Indonesia', 22.0, FALSE, FALSE, NOW()),
    (gen_random_uuid(), 'TW', 'Taiwan', 20.0, FALSE, FALSE, NOW()),
    (gen_random_uuid(), 'PT', 'Portugal', 31.5, TRUE, TRUE, NOW()),
    (gen_random_uuid(), 'CA', 'Canada', 28.0, FALSE, TRUE, NOW()),
    (gen_random_uuid(), 'SK', 'Slovakia', 21.0, TRUE, TRUE, NOW()),
    (gen_random_uuid(), 'HU', 'Hungary', 9.0, TRUE, TRUE, NOW()),
    (gen_random_uuid(), 'GR', 'Greece', 22.0, TRUE, TRUE, NOW()),
    (gen_random_uuid(), 'CO', 'Colombia', 35.0, FALSE, TRUE, NOW()),
    (gen_random_uuid(), 'JP', 'Japan', 30.0, FALSE, TRUE, NOW()),
    (gen_random_uuid(), 'SA', 'Saudi Arabia', 20.0, FALSE, FALSE, NOW()),
    (gen_random_uuid(), 'BG', 'Bulgaria', 10.0, TRUE, TRUE, NOW()),
    (gen_random_uuid(), 'EG', 'Egypt', 22.5, FALSE, FALSE, NOW()),
    (gen_random_uuid(), 'LI', 'Liechtenstein', 12.5, FALSE, FALSE, NOW()),
    (gen_random_uuid(), 'IN', 'India', 34.7, FALSE, FALSE, NOW()),
    (gen_random_uuid(), 'HR', 'Croatia', 18.0, TRUE, TRUE, NOW()),
    (gen_random_uuid(), 'PH', 'Philippines', 25.0, FALSE, FALSE, NOW()),
    (gen_random_uuid(), 'DK', 'Denmark', 22.0, TRUE, TRUE, NOW()),
    (gen_random_uuid(), 'MA', 'Morocco', 37.0, FALSE, FALSE, NOW()),
    (gen_random_uuid(), 'PE', 'Peru', 29.5, FALSE, FALSE, NOW()),
    (gen_random_uuid(), 'FI', 'Finland', 20.0, TRUE, TRUE, NOW()),
    (gen_random_uuid(), 'RU', 'Russia', 20.0, FALSE, FALSE, NOW()),
    (gen_random_uuid(), 'AE', 'UAE', 0.0, FALSE, FALSE, NOW()),
    (gen_random_uuid(), 'KR', 'South Korea', 27.5, FALSE, TRUE, NOW()),
    (gen_random_uuid(), 'BS', 'Bahamas', 0.0, FALSE, FALSE, NOW()),
    (gen_random_uuid(), 'BH', 'Bahrain', 0.0, FALSE, FALSE, NOW()),
    (gen_random_uuid(), 'BB', 'Barbados', 0.0, FALSE, FALSE, NOW()),
    (gen_random_uuid(), 'BN', 'Brunei', 0.0, FALSE, FALSE, NOW()),
    (gen_random_uuid(), 'CM', 'Cameroon', 33.0, FALSE, FALSE, NOW()),
    (gen_random_uuid(), 'KY', 'Cayman Islands', 0.0, FALSE, FALSE, NOW()),
    (gen_random_uuid(), 'CL', 'Chile', 27.0, FALSE, TRUE, NOW()),
    (gen_random_uuid(), 'DO', 'Dominican Republic', 0.0, FALSE, FALSE, NOW()),
    (gen_random_uuid(), 'SV', 'El Salvador', 0.0, FALSE, FALSE, NOW()),
    (gen_random_uuid(), 'BO', 'Bolivia', 25.0, FALSE, FALSE, NOW())
ON CONFLICT (country_code) DO NOTHING;

-- 3. COMPANIES EINFÜGEN
INSERT INTO companies (id, name, industry, reporting_currency, is_ultimate_parent, created_at, updated_at)
VALUES
    (gen_random_uuid(), 'Allianz Group', 'Insurance', 'EUR', TRUE, NOW(), NOW()),
    (gen_random_uuid(), 'Shell plc', 'Oil & Gas', 'USD', TRUE, NOW(), NOW()),
    (gen_random_uuid(), 'TRATON GROUP', 'Automotive', 'EUR', TRUE, NOW(), NOW());

-- 4. SUBSIDIARIES EINFÜGEN - KORRIGIERT MIT ENUM-WERTEN
INSERT INTO subsidiaries (id, company_id, name, country_id, entity_type, main_business_activity, is_active, created_at, updated_at)
SELECT
    gen_random_uuid(),
    (SELECT id FROM companies WHERE name = 'Allianz Group'),
    v.name,
    c.id,
    v.entity_type,
    v.business_activity,
    TRUE,
    NOW(),
    NOW()
FROM (VALUES
    ('Allianz Versicherungs-AG', 'DE', 'OPERATING_COMPANY', 'INSURANCE'),
    ('Allianz Deutschland AG', 'DE', 'HOLDING_COMPANY', 'INSURANCE'),
    ('Allianz SE', 'DE', 'PARENT_COMPANY', 'INSURANCE'),
    ('Allianz Life Insurance Company of North America', 'US', 'OPERATING_COMPANY', 'INSURANCE'),
    ('Allianz Global Investors US LLC', 'US', 'OPERATING_COMPANY', 'ASSET_MANAGEMENT'),
    ('Allianz France S.A.', 'FR', 'OPERATING_COMPANY', 'INSURANCE'),
    ('Allianz Insurance plc', 'GB', 'OPERATING_COMPANY', 'INSURANCE'),
    ('Allianz S.p.A.', 'IT', 'OPERATING_COMPANY', 'INSURANCE'),
    ('Allianz Ireland plc', 'IE', 'OPERATING_COMPANY', 'INSURANCE'),
    ('Allianz Suisse Versicherungs-Gesellschaft AG', 'CH', 'OPERATING_COMPANY', 'INSURANCE'),
    ('Allianz Australia Limited', 'AU', 'OPERATING_COMPANY', 'INSURANCE'),
    ('Allianz Seguros S.A.', 'ES', 'OPERATING_COMPANY', 'INSURANCE'),
    ('Allianz Nederland Groep N.V.', 'NL', 'HOLDING_COMPANY', 'INSURANCE'),
    ('Allianz Seguros S.A.', 'BR', 'OPERATING_COMPANY', 'INSURANCE'),
    ('Allianz Sigorta A.S.', 'TR', 'OPERATING_COMPANY', 'INSURANCE'),
    ('Allianz Polska S.A.', 'PL', 'OPERATING_COMPANY', 'INSURANCE'),
    ('Allianz Re Luxembourg S.A.', 'LU', 'REINSURANCE_COMPANY', 'REINSURANCE'),
    ('Allianz Global Corporate & Specialty SE', 'DE', 'OPERATING_COMPANY', 'INSURANCE'),
    ('Allianz Technology SE', 'DE', 'SERVICE_COMPANY', 'IT_SERVICES'),
    ('PIMCO LLC', 'US', 'OPERATING_COMPANY', 'ASSET_MANAGEMENT')
) AS v(name, country_code, entity_type, business_activity)
JOIN countries c ON c.country_code = v.country_code;

INSERT INTO subsidiaries (id, company_id, name, country_id, entity_type, main_business_activity, is_active, created_at, updated_at)
SELECT
    gen_random_uuid(),
    (SELECT id FROM companies WHERE name = 'Shell plc'),
    v.name,
    c.id,
    v.entity_type,
    v.business_activity,
    TRUE,
    NOW(),
    NOW()
FROM (VALUES
    ('Shell Deutschland Oil GmbH', 'DE', 'OPERATING_COMPANY', 'OIL_AND_GAS_PRODUCTION'),
    ('Shell Energy Europe Limited', 'GB', 'OPERATING_COMPANY', 'ENERGY_TRADING'),
    ('Shell International B.V.', 'NL', 'HOLDING_COMPANY', 'HOLDING'),
    ('Shell Overseas Investment B.V.', 'NL', 'HOLDING_COMPANY', 'INVESTMENT_MANAGEMENT'),
    ('Shell Canada Limited', 'CA', 'OPERATING_COMPANY', 'OIL_AND_GAS_PRODUCTION'),
    ('Shell Australia Pty Ltd', 'AU', 'OPERATING_COMPANY', 'OIL_AND_GAS_PRODUCTION'),
    ('Shell Brasil Petróleo Ltda', 'BR', 'OPERATING_COMPANY', 'OIL_AND_GAS_EXPLORATION'),
    ('Shell China Limited', 'CN', 'OPERATING_COMPANY', 'OIL_AND_GAS_MARKETING'),
    ('Shell Eastern Petroleum Pte Ltd', 'SG', 'OPERATING_COMPANY', 'OIL_AND_GAS_TRADING'),
    ('Shell France S.A.S.', 'FR', 'OPERATING_COMPANY', 'OIL_AND_GAS_MARKETING'),
    ('Shell U.S. Gas & Power LLC', 'US', 'OPERATING_COMPANY', 'GAS_AND_POWER'),
    ('Shell Exploration & Production Ireland Limited', 'IE', 'OPERATING_COMPANY', 'OIL_AND_GAS_EXPLORATION'),
    ('Shell Treasury Centre Limited', 'GB', 'SERVICE_COMPANY', 'TREASURY_SERVICES'),
    ('Shell Egypt N.V.', 'EG', 'OPERATING_COMPANY', 'OIL_AND_GAS_PRODUCTION'),
    ('Shell Norge AS', 'NO', 'OPERATING_COMPANY', 'OIL_AND_GAS_PRODUCTION')
) AS v(name, country_code, entity_type, business_activity)
JOIN countries c ON c.country_code = v.country_code;

INSERT INTO subsidiaries (id, company_id, name, country_id, entity_type, main_business_activity, is_active, created_at, updated_at)
SELECT
    gen_random_uuid(),
    (SELECT id FROM companies WHERE name = 'TRATON GROUP'),
    v.name,
    c.id,
    v.entity_type,
    v.business_activity,
    TRUE,
    NOW(),
    NOW()
FROM (VALUES
    ('Scania CV AB', 'SE', 'OPERATING_COMPANY', 'MANUFACTURING'),
    ('Scania Deutschland GmbH', 'DE', 'OPERATING_COMPANY', 'SALES_AND_SERVICES'),
    ('MAN Truck & Bus SE', 'DE', 'OPERATING_COMPANY', 'MANUFACTURING'),
    ('TRATON SE', 'DE', 'PARENT_COMPANY', 'HOLDING'),
    ('Navistar Inc.', 'US', 'OPERATING_COMPANY', 'MANUFACTURING'),
    ('Volkswagen Caminhões e Ônibus Indústria e Comércio de Veículos Comerciais Ltda', 'BR', 'OPERATING_COMPANY', 'MANUFACTURING'),
    ('MAN Truck & Bus México S.A. de C.V.', 'MX', 'OPERATING_COMPANY', 'MANUFACTURING'),
    ('Scania Polska S.A.', 'PL', 'OPERATING_COMPANY', 'SALES_AND_SERVICES'),
    ('MAN Kamyon ve Otobüs Ticaret A.S.', 'TR', 'OPERATING_COMPANY', 'SALES_AND_SERVICES'),
    ('Scania Netherlands B.V.', 'NL', 'OPERATING_COMPANY', 'SALES_AND_SERVICES'),
    ('Scania France S.A.S.', 'FR', 'OPERATING_COMPANY', 'SALES_AND_SERVICES'),
    ('Scania (Great Britain) Limited', 'GB', 'OPERATING_COMPANY', 'SALES_AND_SERVICES'),
    ('Scania China Sales & Services Co., Ltd', 'CN', 'OPERATING_COMPANY', 'SALES_AND_SERVICES'),
    ('MAN Truck & Bus Norge AS', 'NO', 'OPERATING_COMPANY', 'SALES_AND_SERVICES'),
    ('Scania Southern Africa (Pty) Ltd', 'ZA', 'OPERATING_COMPANY', 'SALES_AND_SERVICES'),
    ('Scania Austria Ges.m.b.H.', 'AT', 'OPERATING_COMPANY', 'SALES_AND_SERVICES'),
    ('Scania Hispania S.A.', 'ES', 'OPERATING_COMPANY', 'SALES_AND_SERVICES'),
    ('MAN Truck & Bus Argentina S.A.', 'AR', 'OPERATING_COMPANY', 'MANUFACTURING'),
    ('Scania Danmark A/S', 'DK', 'OPERATING_COMPANY', 'SALES_AND_SERVICES'),
    ('Scania Slovensko spol. s r.o.', 'SK', 'OPERATING_COMPANY', 'SALES_AND_SERVICES')
) AS v(name, country_code, entity_type, business_activity)
JOIN countries c ON c.country_code = v.country_code;

-- 5. CBCR REPORTS - ALLIANZ 2023
INSERT INTO cbcr_reports (
    id, company_id, reporting_year, country_id,
    revenues_unrelated_party, revenues_related_party, revenues_total,
    profit_before_tax, income_tax_paid, income_tax_accrued,
    effective_tax_rate, expected_tax_rate,
    stated_capital, accumulated_earnings, tangible_assets,
    number_of_employees, data_source, audit_status,
    created_at, updated_at
)
SELECT
    gen_random_uuid(),
    (SELECT id FROM companies WHERE name = 'Allianz Group'),
    2023,
    c.id,
    v.rev_unrelated::numeric,
    v.rev_related::numeric,
    v.rev_total::numeric,
    v.profit_bt::numeric,
    v.tax_paid::numeric,
    v.tax_accrued::numeric,
    v.eff_rate::numeric,
    v.exp_rate::numeric,
    v.stated_cap::numeric,
    v.acc_earn::numeric,
    v.tang_assets::numeric,
    v.employees::integer,
    'IFRS',
    'PUBLISHED',
    NOW(),
    NOW()
FROM (VALUES
    ('DE', 27113, 14854, 41967, 1530, 859, 592, 38.7, 31.0, 281564, 28789, 7377, 34999),
    ('US', 13243, 3688, 16931, 2551, 656, 288, 11.3, 21.0, 65862, -4124, 1981, 8400),
    ('FR', 11495, 2246, 13741, 682, 41, 214, 31.3, 25.8, 26116, 19950, 7081, 12093),
    ('GB', 7678, 1895, 9573, 627, 69, 90, 14.3, 19.0, 10031, 3027, 249, 11090),
    ('IT', 7588, 864, 8452, 1065, 63, 252, 23.7, 24.0, 6569, 2986, 2943, 5960),
    ('IE', 3815, 2122, 5937, 437, 45, 65, 14.8, 12.5, 3537, 1089, 21, 1944),
    ('CH', 3929, 1985, 5913, 901, 105, 142, 15.8, 18.0, 5896, 2470, 4818, 2918),
    ('AU', 4900, 241, 5141, 309, 363, 69, 22.3, 30.0, 2750, 1213, 31, 6325),
    ('ES', 3355, 640, 3996, 146, 41, 60, 41.4, 25.0, 1733, 1277, 1097, 4949),
    ('NL', 1409, 1781, 3190, 1323, 58, 116, 8.8, 25.8, 44298, 19741, 79, 1407)
) AS v(country_code, rev_unrelated, rev_related, rev_total, profit_bt, tax_paid, tax_accrued, eff_rate, exp_rate, stated_cap, acc_earn, tang_assets, employees)
JOIN countries c ON c.country_code = v.country_code;

-- 6. CBCR REPORTS - SHELL 2023
INSERT INTO cbcr_reports (
    id, company_id, reporting_year, country_id,
    revenues_unrelated_party, revenues_related_party, revenues_total,
    profit_before_tax, income_tax_paid, income_tax_accrued,
    stated_capital, accumulated_earnings, tangible_assets,
    number_of_employees, data_source, audit_status,
    created_at, updated_at
)
SELECT
    gen_random_uuid(),
    (SELECT id FROM companies WHERE name = 'Shell plc'),
    2023,
    c.id,
    v.rev_third::numeric,
    v.rev_related::numeric,
    v.rev_total::numeric,
    v.profit_bt::numeric,
    v.tax_paid::numeric,
    v.tax_accrued::numeric,
    v.stated_cap::numeric,
    v.acc_earn::numeric,
    v.tang_assets::numeric,
    v.employees::integer,
    'IFRS',
    'PUBLISHED',
    NOW(),
    NOW()
FROM (VALUES
    ('AU', 4093498480, 12597453319, 16690963799, 2571188598, 1399473001, 1030803305, 64563456619, -12935223750, 28183934352, 3541),
    ('BR', 254201329, 10518266812, 10772468141, 619644505, 613518508, 742266621, 10558255386, -7159168155, 25893455342, 878),
    ('CA', 15533467120, 16150570171, 31684037291, -737505255, 362120394, 184957013, 53766915374, -14099508023, 17408947687, 3601),
    ('CN', 3789896529, 1740141000, 5530037529, 128568382, 29376924, 45223366, 1495372596, 1247881340, 2768306787, 4788),
    ('DE', 27102200893, 16576801983, 43589002876, 565316334, 133537311, 192220246, 1495229570, -3172251935, 5185845913, 6096),
    ('FR', 2763923521, 522616021, 3286539542, -18856810, 13852068, 3893196, 605508254, 571429707, 615983171, 557),
    ('NL', 15533467120, 16150570171, 31684037291, -737505255, 362120394, 184957013, 53766915374, -14099508023, 17408947687, 3601),
    ('NO', 1263387377, 386680625, 1650068002, 14272209, 13380318, 15194054, 104863867, 15611696, 347196994, 353),
    ('US', 19957, 115238, 135195, -125274, 0, 0, 0, 0, 0, 0)
) AS v(country_code, rev_third, rev_related, rev_total, profit_bt, tax_paid, tax_accrued, stated_cap, acc_earn, tang_assets, employees)
JOIN countries c ON c.country_code = v.country_code;

-- 7. CBCR REPORTS - TRATON 2024
INSERT INTO cbcr_reports (
    id, company_id, reporting_year, country_id,
    revenues_unrelated_party, revenues_total,
    profit_before_tax, income_tax_paid, income_tax_accrued,
    tangible_assets,
    number_of_employees, data_source, audit_status,
    created_at, updated_at
)
SELECT
    gen_random_uuid(),
    (SELECT id FROM companies WHERE name = 'TRATON GROUP'),
    2024,
    c.id,
    v.revenue::numeric,
    v.revenue::numeric,
    v.profit_bt::numeric,
    v.tax_paid::numeric,
    v.tax_accrued::numeric,
    v.tang_assets::numeric,
    v.employees::integer,
    'IFRS',
    'PUBLISHED',
    NOW(),
    NOW()
FROM (VALUES
    ('SE', 5004, -1859, -62, -27, 3744, 22570),
    ('DE', 7627, 51, 6, 0, 5152, 21239),
    ('US', 9134, 2, -9, -11, 2424, 8513),
    ('BR', 5889, 119, -361, -393, 1505, 8458),
    ('MX', 2441, 439, -127, -168, 1113, 8032),
    ('PL', 1920, 228, -33, -34, 1227, 6981),
    ('TR', 352, 27, 0, 0, 330, 4220),
    ('NL', 739, 134, -26, -23, 489, 3490),
    ('FR', 2005, 116, -43, -37, 954, 3163),
    ('GB', 2080, 194, -48, -34, 1205, 2681)
) AS v(country_code, revenue, profit_bt, tax_paid, tax_accrued, tang_assets, employees)
JOIN countries c ON c.country_code = v.country_code;

-- 8. RISK ASSESSMENTS
INSERT INTO risk_assessments (
    id, cbcr_report_id, overall_risk_level, risk_score,
    low_etr_flag, tax_haven_flag, profit_shifting_indicator,
    negative_tax_flag, high_revenue_low_tax_flag, substance_mismatch_flag,
    blacklist_jurisdiction_flag, etr_variance,
    revenue_per_employee_ratio, profit_per_employee_ratio,
    risk_explanation, recommended_action,
    created_at, updated_at
)
SELECT
    gen_random_uuid(),
    cbcr.id,
    CASE
        WHEN (COALESCE(cbcr.effective_tax_rate, 0) < 0 OR (COALESCE(c.expected_tax_rate, 0) = 0 AND COALESCE(cbcr.profit_before_tax, 0) > 100))
            THEN 'HIGH'
        WHEN (COALESCE(cbcr.effective_tax_rate, 999) < COALESCE(c.expected_tax_rate, 0) - 5)
            THEN 'MEDIUM'
        ELSE 'LOW'
    END,
    LEAST(100,
        (CASE WHEN COALESCE(cbcr.effective_tax_rate, 0) < 0 THEN 30 ELSE 0 END) +
        (CASE WHEN COALESCE(c.expected_tax_rate, 0) = 0 AND COALESCE(cbcr.profit_before_tax, 0) > 0 THEN 25 ELSE 0 END) +
        (CASE WHEN COALESCE(cbcr.effective_tax_rate, 999) < COALESCE(c.expected_tax_rate, 0) - 5 THEN 20 ELSE 0 END)
    )::numeric(5,2),
    COALESCE(cbcr.effective_tax_rate < c.expected_tax_rate - 5, FALSE),
    COALESCE(c.expected_tax_rate <= 0, FALSE),
    COALESCE(c.expected_tax_rate < 15 AND cbcr.profit_before_tax > 50 AND cbcr.number_of_employees < 100, FALSE),
    COALESCE(cbcr.effective_tax_rate < 0, FALSE),
    COALESCE(cbcr.revenues_total > 1000 AND cbcr.effective_tax_rate < 10 AND cbcr.profit_before_tax > 0, FALSE),
    COALESCE(cbcr.number_of_employees < 50 AND cbcr.revenues_total > 500, FALSE),
    FALSE,
    (COALESCE(cbcr.effective_tax_rate, 0) - COALESCE(c.expected_tax_rate, 0))::numeric(6,3),
    (COALESCE(cbcr.revenues_total, 0) / NULLIF(COALESCE(cbcr.number_of_employees, 1), 0))::numeric(12,2),
    (COALESCE(cbcr.profit_before_tax, 0) / NULLIF(COALESCE(cbcr.number_of_employees, 1), 0))::numeric(12,2),
    CASE
        WHEN COALESCE(cbcr.effective_tax_rate, 0) < 0
            THEN 'Negative effective tax rate detected'
        WHEN COALESCE(c.expected_tax_rate, 0) = 0 AND COALESCE(cbcr.profit_before_tax, 0) > 0
            THEN 'Tax haven jurisdiction with 0% statutory rate'
        ELSE NULL
    END,
    CASE
        WHEN COALESCE(cbcr.effective_tax_rate, 0) < 0 OR (COALESCE(c.expected_tax_rate, 0) = 0 AND COALESCE(cbcr.profit_before_tax, 0) > 0)
            THEN 'Review transfer pricing documentation and business substance'
        ELSE 'Monitor for changes. Standard compliance procedures apply'
    END,
    NOW(),
    NOW()
FROM cbcr_reports cbcr
JOIN countries c ON cbcr.country_id = c.id;

-- 9. AUDIT LOGS
INSERT INTO audit_logs (
    id, table_name, record_id, action, field_name,
    old_value, new_value, user_id, username,
    ip_address, created_at
)
SELECT
    gen_random_uuid(),
    'cbcr_reports',
    cbcr.id,
    'INSERT',
    NULL,
    NULL,
    NULL,
    (SELECT id FROM users LIMIT 1),
    (SELECT username FROM users LIMIT 1),
    '192.168.1.100',
    cbcr.created_at
FROM cbcr_reports cbcr
LIMIT 20;