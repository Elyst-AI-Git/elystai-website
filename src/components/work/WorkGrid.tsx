"use client";

import { useSyncExternalStore } from "react";
import WorkCard from "@/components/work/WorkCard";
import { CASE_CATEGORIES, WORK_CASES, type CaseCategory } from "@/lib/work-content";

type Filter = "all" | CaseCategory;

const FILTERS: readonly { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "ai-transformation", label: CASE_CATEGORIES["ai-transformation"].label },
  { id: "ai-kickstart", label: CASE_CATEGORIES["ai-kickstart"].label },
];

/** Case cards with a category filter. All cases render on the server; the filter only hides. */
const EVENT = "work-filter-change";

function subscribe(callback: () => void) {
  window.addEventListener("popstate", callback);
  window.addEventListener(EVENT, callback);
  return () => {
    window.removeEventListener("popstate", callback);
    window.removeEventListener(EVENT, callback);
  };
}

function getSnapshot(): Filter {
  const param = new URLSearchParams(window.location.search).get("category");
  return param === "ai-transformation" || param === "ai-kickstart" ? param : "all";
}

export default function WorkGrid() {
  // The server (and first paint) shows every case; the URL then picks the filter.
  const filter = useSyncExternalStore(subscribe, getSnapshot, () => "all" as Filter);

  const choose = (next: Filter) => {
    window.history.replaceState(null, "", next === "all" ? "/work" : `/work?category=${next}`);
    window.dispatchEvent(new Event(EVENT));
  };

  return (
    <>
      <div role="group" aria-label="Filter case studies" className="mt-10 flex flex-wrap gap-2">
        {FILTERS.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={filter === item.id}
            onClick={() => choose(item.id)}
            className={`rounded-md border-2 px-4 py-2 font-display font-semibold transition-colors ${
              filter === item.id ? "border-emerald bg-emerald text-fg-on-dark" : "border-emerald/30 text-emerald hover:bg-emerald/5"
            }`}
            style={{ fontSize: "var(--text-small)" }}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mx-auto mt-8 grid max-w-5xl gap-5 md:grid-cols-2">
        {WORK_CASES.map((item) => (
          <div key={item.slug} hidden={filter !== "all" && item.category !== filter}>
            <WorkCard item={item} size="large" />
          </div>
        ))}
      </div>
    </>
  );
}
