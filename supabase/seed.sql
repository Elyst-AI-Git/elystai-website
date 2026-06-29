-- seed.sql
-- Seeds the first course, its first batch (price), and the Circle discount rule.
-- Idempotent: safe to run more than once.
--
-- Pricing: base ₹2,999 = 299900 paise. Circle = 20% off → ₹2,399 charged.
-- (20% of 2,999 is 2,399.20; the server rounds the charged amount to ₹2,399.
--  We store the RULE as percent=20 and compute/round at checkout, never a
--  hardcoded discounted price.)

-- Course ---------------------------------------------------------------------
insert into app.courses (slug, title, description, status)
values (
  'ai-for-work',
  'AI for Work',
  'A cohort-based course that teaches working professionals, business owners, and freelancers to use AI in their day-to-day work.',
  'draft'   -- flip to 'published' from the dashboard when the landing page is live
)
on conflict (slug) do nothing;

-- First batch (cohort) with price -------------------------------------------
insert into app.batches (course_id, name, base_price_amount, currency, status)
select c.id, 'AI for Work — Cohort 1', 299900, 'INR', 'upcoming'
from app.courses c
where c.slug = 'ai-for-work'
  and not exists (
    select 1 from app.batches b
    where b.course_id = c.id and b.name = 'AI for Work — Cohort 1'
  );

-- Circle discount segment (20% off) -----------------------------------------
insert into public.discount_segments (name, description, kind, value, active)
values ('circle', 'Elyst Circle members — 20% off', 'percent', 20, true)
on conflict (name) do nothing;

-- Circle member emails are loaded separately (≈30 emails provided by Elyst).
-- Example of how a member is added (lower-cased match happens at checkout):
--   insert into public.discount_segment_members (segment_id, email)
--   select id, 'member@example.com' from public.discount_segments where name = 'circle';
