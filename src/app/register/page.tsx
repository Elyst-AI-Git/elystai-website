import { Suspense } from "react";
import RegisterForm from "./RegisterForm";

export const metadata = {
  title: "Register for AI for Work | Elyst AI",
  description: "Secure your cohort seat for the 2-week live AI program by Elyst AI.",
};

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <main id="main" className="flex-1 pt-32 pb-24 bg-bg flex items-center justify-center min-h-[70vh]">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald border-t-transparent" />
            <p className="text-fg-3 font-semibold text-small">Loading checkout...</p>
          </div>
        </main>
      }
    >
      <RegisterForm />
    </Suspense>
  );
}
