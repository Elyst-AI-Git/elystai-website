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
This is already a reviewed migration — `supabase/migrations/0004_grant_service_role_app_schema.sql` — rather than an ad hoc dashboard edit. Apply it (and any later migrations) the normal way:

```sh
supabase db push
```

Schema changes should always be routed through `supabase/migrations/`, not run by hand in the Supabase Dashboard SQL Editor, so the change is reviewed, versioned, and reproducible across environments.

Once applied, the service-role client used by the Next.js API routes will be able to query the courses and write to the enrollment/payment tables correctly.
