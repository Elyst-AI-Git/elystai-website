# Schema Change Request — Grant Permissions for `service_role` on `app` Schema

## The Problem
When the server attempts to execute checkout operations (such as finding the course by slug, generating enrollment rows, and recording payments), the backend returns a `404 Course not found` error. 

During diagnostics, we verified that the database returns the following Postgres error:
```
Error reading courses: {
  code: '42501',
  message: 'permission denied for schema app'
}
```

This occurs because the migration `0002_app_course_structure.sql` grants `USAGE` on the `app` schema to `anon` and `authenticated` roles, but **does not grant schema usage privileges to the `service_role` role**. In Supabase, the `service_role` is not a superuser and still requires explicit `USAGE` grants to access tables inside custom schemas.

---

## Proposed SQL Resolution
Please run the following SQL commands in your **Supabase Dashboard SQL Editor** to grant the server-side API permissions to read and write in the `app` schema:

```sql
-- 1. Grant usage on the app schema to service_role
grant usage on schema app to service_role;

-- 2. Grant all privileges on existing tables in app schema
grant all privileges on all tables in schema app to service_role;

-- 3. Grant all privileges on existing sequences in app schema
grant all privileges on all sequences in schema app to service_role;

-- 4. Set default privileges so future tables/sequences automatically grant rights
alter default privileges in schema app grant all on tables to service_role;
alter default privileges in schema app grant all on sequences to service_role;
```

Once this is run, the service-role client used by the Next.js API routes will be able to query the courses and write to the enrollment/payment tables correctly.
