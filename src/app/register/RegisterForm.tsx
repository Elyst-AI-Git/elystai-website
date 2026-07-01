"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";
import { BrandButton } from "@/components/ui/brand-button";
import { Card } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useRouter, useSearchParams } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { COUNTRIES } from "@/lib/countries";

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }) => void;
  prefill: {
    email: string;
    contact: string;
    name: string;
  };
  theme: {
    color: string;
  };
  modal: {
    ondismiss: () => void;
  };
}

interface RazorpayInstance {
  open: () => void;
}

type RazorpayConstructor = new (options: RazorpayOptions) => RazorpayInstance;

const INPUT_CLASS =
  "w-full rounded-md border border-muted bg-[#FDFEFC] px-4 py-2.5 text-[16px] text-fg focus:outline-none focus:ring-1 focus:ring-emerald placeholder:text-fg/35";

// The checkout API returns precise, developer-facing error strings (useful in
// logs/support). Map the ones a real user can hit to friendlier copy instead
// of showing them the raw backend message verbatim.
function friendlyCheckoutError(rawMessage: string): string {
  const message = rawMessage.toLowerCase();
  if (message.includes("already enrolled")) {
    return "You're already enrolled in this cohort. Check your email for your confirmation.";
  }
  if (message.includes("no active cohort") || message.includes("not found")) {
    return "Registration for this cohort isn't open right now. Please check back soon or contact us.";
  }
  if (message.includes("discount eligibility")) {
    return "We couldn't verify your discount right now. Please try again in a moment.";
  }
  if (message.includes("failed to update profile") || message.includes("failed to upsert enrollment") || message.includes("failed to record payment")) {
    return "Something went wrong on our end while setting up your payment. Please try again.";
  }
  return "Something went wrong while starting checkout. Please try again, or contact us if it keeps happening.";
}


export default function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [supabase] = useState(() => createBrowserSupabaseClient());

  // User auth state
  const [user, setUser] = useState<User | null>(null);
  const [loadingSession, setLoadingSession] = useState(true);

  // Auth form states
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [authError, setAuthError] = useState(() =>
    searchParams.get("error") === "auth_failed"
      ? "Google authentication failed. Please try again or use Email OTP."
      : ""
  );
  const [authLoading, setAuthLoading] = useState(false);

  const [phoneCountryCode, setPhoneCountryCode] = useState("+91");
  const [phoneCountryIso, setPhoneCountryIso] = useState("IN");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [validationErrors, setValidationErrors] = useState<{ phone?: string; city?: string; country?: string }>({});
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");
  const [isCircleMember, setIsCircleMember] = useState(false);

  // Track UTM and Referrer (Moment 3 metadata)
  const [utmSource] = useState(() => searchParams.get("utm_source"));
  const [utmMedium] = useState(() => searchParams.get("utm_medium"));
  const [utmCampaign] = useState(() => searchParams.get("utm_campaign"));
  const [referrer] = useState(() =>
    typeof document !== "undefined" ? document.referrer || null : null
  );

  // Check Circle segment membership
  useEffect(() => {
    if (!user) {
      setIsCircleMember(false);
      return;
    }
    const checkCircleMember = async () => {
      try {
        const res = await fetch("/api/checkout/discount-status");
        if (res.ok) {
          const data = await res.json();
          setIsCircleMember(!!data.isCircleMember);
        }
      } catch (err) {
        console.error("Error checking circle membership:", err);
      }
    };
    checkCircleMember();
  }, [user]);

  // Find selected country object
  const selectedCountryObj = COUNTRIES.find(
    (c) => c.dial_code === phoneCountryCode && c.code === phoneCountryIso
  ) || COUNTRIES.find((c) => c.dial_code === phoneCountryCode) || COUNTRIES.find((c) => c.code === "IN") || COUNTRIES[0];

  // Monitor auth state changes
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoadingSession(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoadingSession(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const handleGoogleLogin = async () => {
    setAuthLoading(true);
    setAuthError("");
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/api/auth/callback?next=${encodeURIComponent("/register")}`,
        },
      });
      if (error) throw error;
    } catch (err: unknown) {
      const error = err as Error;
      setAuthError(error.message || "An error occurred with Google Sign-in.");
      setAuthLoading(false);
    }
  };

  const handleSendOtp = async (e?: React.FormEvent | React.MouseEvent) => {
    if (e) e.preventDefault();
    if (!email) {
      setAuthError("Please enter your email address.");
      return;
    }
    setAuthLoading(true);
    setAuthError("");
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/api/auth/callback?next=${encodeURIComponent("/register")}`,
          shouldCreateUser: true,
        },
      });
      if (error) throw error;
      setOtpSent(true);
    } catch (err: unknown) {
      const error = err as Error;
      setAuthError(error.message || "Failed to send OTP code.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleVerifyOtp = async (e?: React.FormEvent | React.MouseEvent) => {
    if (e) e.preventDefault();
    if (!otpCode || otpCode.length !== 6) {
      setAuthError("Please enter the 6-digit verification code.");
      return;
    }
    setAuthLoading(true);
    setAuthError("");
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otpCode,
        type: "email",
      });
      if (error) throw error;
      if (data?.user) {
        setUser(data.user);
      }
    } catch (err: unknown) {
      const error = err as Error;
      setAuthError(error.message || "Invalid or expired verification code.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setOtpSent(false);
    setOtpCode("");
    setEmail("");
  };

  const handleCheckout = async (e?: React.FormEvent | React.MouseEvent) => {
    if (e) e.preventDefault();
    setCheckoutError("");
    setValidationErrors({});

    // Validate all required fields on submit (phone, city, country)
    const cleanPhoneDigits = phone.replace(/\D/g, "");
    const cleanPhone = `${phoneCountryCode}${cleanPhoneDigits}`;
    const nextErrors: { phone?: string; city?: string; country?: string } = {};
    if (!phone) {
      nextErrors.phone = "Phone number is required.";
    } else if (phoneCountryCode === "+91" && cleanPhoneDigits.length !== 10) {
      nextErrors.phone = "Please enter a valid 10-digit phone number.";
    } else if (cleanPhoneDigits.length < 7 || cleanPhoneDigits.length > 15) {
      nextErrors.phone = "Please enter a valid phone number.";
    }
    if (!city.trim()) nextErrors.city = "City is required.";
    if (!country.trim()) nextErrors.country = "Country is required.";

    if (Object.keys(nextErrors).length > 0) {
      setValidationErrors(nextErrors);
      return;
    }

    setCheckoutLoading(true);

    try {
      // 1. Call checkout order API route
      const res = await fetch("/api/checkout/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: cleanPhone,
          city: city.trim() || undefined,
          country: country.trim() || undefined,
          utm_source: utmSource,
          utm_medium: utmMedium,
          utm_campaign: utmCampaign,
          referrer,
        }),
      });

      const orderData = await res.json();
      if (!res.ok) {
        throw new Error(orderData.error || "Failed to initialize payment order.");
      }

      const { orderId, amount, currency, keyId } = orderData;

      // 2. Open Razorpay Embedded Standard Checkout
      const Razorpay = (window as unknown as { Razorpay: RazorpayConstructor }).Razorpay;
      if (!Razorpay) {
        throw new Error("Razorpay script not loaded yet. Please wait a moment and try again.");
      }

      const options: RazorpayOptions = {
        key: keyId,
        amount: amount,
        currency: currency,
        name: "Elyst AI",
        description: "AI for Work Cohort Registration",
        order_id: orderId,
        handler: function (response) {
          // Redirect to onboarding with parameters (Moment 2 starts here)
          router.push(
            `/register/onboarding?order_id=${response.razorpay_order_id}&payment_id=${response.razorpay_payment_id}`
          );
        },
        prefill: {
          email: user?.email || "",
          contact: cleanPhone,
          name: user?.user_metadata?.full_name || user?.user_metadata?.name || "",
        },
        theme: {
          color: "#03624c", // brand emerald color
        },
        modal: {
          ondismiss: function () {
            setCheckoutLoading(false);
          },
        },
      };

      const rzp = new Razorpay(options);
      rzp.open();
    } catch (err: unknown) {
      const error = err as Error;
      const message = error.message || "";
      // The Razorpay-not-loaded message is already user-facing copy we wrote
      // ourselves — pass it through as-is. Anything else came from the
      // backend's precise/technical error strings, so map it to friendlier copy.
      setCheckoutError(
        message.includes("Razorpay script not loaded")
          ? message
          : friendlyCheckoutError(message || "unknown error")
      );
      setCheckoutLoading(false);
    }
  };

  if (loadingSession) {
    return (
      <main id="main" className="flex-1 pt-32 pb-24 bg-bg flex items-center justify-center min-h-[70vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald border-t-transparent" />
          <p className="text-fg-3 font-semibold text-small">Loading checkout...</p>
        </div>
      </main>
    );
  }

  return (
    <main id="main" className="flex-1 pt-32 pb-24 bg-bg">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      <div className="mx-auto max-w-md px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-fg font-display font-bold leading-none tracking-display mb-3" style={{ fontSize: "var(--text-h2)" }}>
            AI for Work Registration
          </h1>
          <p className="text-fg-2 text-[17px]">
            Secure your cohort seat below.
          </p>
        </div>

        {/* Auth Step */}
        {!user ? (
          <Card className="p-8 bg-[#c2edcb] rounded-card shadow-card">
            <h2 className="text-fg font-display font-bold text-[21px] mb-6">
              Step 1: Verify your identity
            </h2>

            {authError && (
              <div className="mb-5 p-4 rounded bg-destructive/10 border border-destructive/20 text-destructive text-label font-medium leading-relaxed">
                {authError}
              </div>
            )}

            {/* Google OAuth Login */}
            <div className="mb-6">
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={authLoading}
                className="w-full flex items-center justify-center gap-3 font-bold bg-[#0A0F0C] text-white rounded-md py-3 px-5 transition duration-200 hover:bg-[#1a251e] disabled:opacity-50 text-[15px]"
              >
                <svg className="h-5 w-5 fill-current pointer-events-none" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                </svg>
                <span>Continue with Google</span>
              </button>
            </div>

            {/* Separator */}
            <div className="relative flex items-center justify-center my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-muted" />
              </div>
              <span className="relative px-3 bg-[#c2edcb] text-[13px] font-bold uppercase tracking-wider text-fg-3">
                Or use email
              </span>
            </div>

            {/* Email OTP Login */}
            {!otpSent ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-[13px] font-bold uppercase tracking-wider text-fg-2 mb-1.5">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    disabled={authLoading}
                    placeholder="e.g. name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={INPUT_CLASS}
                  />
                </div>
                <BrandButton variant="solid" tone="emerald" className="w-full" onClick={handleSendOtp} disabled={authLoading} full>
                  {authLoading ? "Sending Code..." : "Send Verification Code"}
                </BrandButton>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="flex flex-col items-center">
                  <label htmlFor="otp" className="w-full text-left text-[13px] font-bold uppercase tracking-wider text-fg-2 mb-3">
                    6-Digit Code sent to {email}
                  </label>
                  <div className="flex justify-center w-full py-2">
                    <InputOTP maxLength={6} value={otpCode} onChange={setOtpCode} disabled={authLoading}>
                      <InputOTPGroup className="gap-2 sm:gap-3">
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <div className="flex items-center justify-center px-2 text-fg-3 font-extrabold text-[20px] select-none">
                        &mdash;
                      </div>
                      <InputOTPGroup className="gap-2 sm:gap-3">
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </div>
                <div className="flex gap-2.5">
                  <button
                    type="button"
                    onClick={() => setOtpSent(false)}
                    disabled={authLoading}
                    className="flex-1 text-[15px] font-bold border border-muted rounded-md py-2.5 text-fg-2 transition hover:bg-surface-muted"
                  >
                    Back
                  </button>
                  <BrandButton variant="solid" tone="emerald" className="flex-[2]" onClick={handleVerifyOtp} disabled={authLoading} full>
                    {authLoading ? "Verifying..." : "Verify & Continue"}
                  </BrandButton>
                </div>
              </form>
            )}
          </Card>
        ) : (
          /* Checkout Step */
          <Card className="p-8 bg-[#c2edcb] rounded-card shadow-card">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-muted">
              <div>
                <p className="text-[14px] font-bold uppercase tracking-wider text-fg-3">Logged in as</p>
                <p className="text-[17px] font-bold text-fg truncate max-w-[200px]" title={user.email}>
                  {user.email}
                </p>
              </div>
              <button
                type="button"
                onClick={handleSignOut}
                className="text-[14px] font-bold uppercase tracking-wider text-destructive hover:underline"
              >
                Sign Out
              </button>
            </div>

            <h2 className="text-fg font-display font-bold text-[23px] mb-6">
              Step 2: Contact details
            </h2>

            {checkoutError && (
              <div className="mb-5 p-4 rounded bg-destructive/10 border border-destructive/20 text-destructive text-label font-medium leading-relaxed">
                {checkoutError}
              </div>
            )}

            <form onSubmit={handleCheckout} className="space-y-5">
              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-[15px] font-bold uppercase tracking-wider text-fg-2 mb-1.5">
                  Phone / WhatsApp number <span className="text-destructive font-normal">*</span>
                </label>
                <div className="flex">
                  {/* Custom Searchable Country Selector Dropdown */}
                  <div className="relative flex">
                    <button
                      type="button"
                      disabled={checkoutLoading}
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className={`w-[112px] flex items-center justify-between rounded-l-md border border-r-0 bg-[#FDFEFC] px-3 py-2.5 text-[15px] font-bold text-fg focus:outline-none focus:ring-1 focus:ring-emerald cursor-pointer disabled:opacity-50 ${
                        validationErrors.phone ? "border-destructive focus:ring-destructive" : "border-muted"
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <span className="text-[18px] leading-none select-none">{selectedCountryObj?.flag}</span>
                        <span>{phoneCountryCode}</span>
                      </span>
                      <svg className={`w-3.5 h-3.5 text-fg-3 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {isDropdownOpen && (
                      <>
                        {/* Overlay to close popover when clicking outside */}
                        <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />
                        
                        <div className="absolute top-full left-0 mt-1 w-[280px] bg-[#FDFEFC] border border-muted rounded-md shadow-card-hover z-50 overflow-hidden flex flex-col max-h-[300px]">
                          {/* Search Bar */}
                          <div className="p-2 border-b border-muted bg-surface-muted/50">
                            <input
                              type="text"
                              placeholder="Search country..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="w-full px-2.5 py-1.5 text-[14px] bg-[#FDFEFC] border border-muted rounded-md focus:outline-none focus:ring-1 focus:ring-emerald text-fg placeholder:text-fg/40"
                              autoFocus
                            />
                          </div>
                          {/* Country List */}
                          <div className="overflow-y-auto flex-1 py-1">
                            {(() => {
                              const filtered = COUNTRIES.filter((c) =>
                                c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                c.dial_code.includes(searchQuery) ||
                                c.code.toLowerCase().includes(searchQuery.toLowerCase())
                              );
                              if (filtered.length > 0) {
                                return filtered.map((c) => (
                                  <button
                                    key={`${c.code}-${c.dial_code}`}
                                    type="button"
                                    onClick={() => {
                                      setPhoneCountryCode(c.dial_code);
                                      setPhoneCountryIso(c.code);
                                      if (!country.trim()) setCountry(c.name);
                                      setIsDropdownOpen(false);
                                      setSearchQuery("");
                                    }}
                                    className={`w-full flex items-center justify-between px-3 py-2 text-left text-[14px] hover:bg-surface-muted transition duration-150 ${
                                      phoneCountryCode === c.dial_code && phoneCountryIso === c.code ? "bg-surface-muted font-bold text-emerald" : "text-fg"
                                    }`}
                                  >
                                    <span className="flex items-center gap-2 truncate">
                                      <span className="text-[18px] leading-none select-none">{c.flag}</span>
                                      <span className="truncate">{c.name}</span>
                                    </span>
                                    <span className="text-fg-3 font-semibold text-[13px]">{c.dial_code}</span>
                                  </button>
                                ));
                              } else {
                                return <div className="px-3 py-3 text-center text-fg-3 text-[14px]">No countries found</div>;
                              }
                            })()}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  <input
                    id="phone"
                    type="tel"
                    required
                    disabled={checkoutLoading}
                    placeholder="e.g. 1234567890"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 15))}
                    onBlur={() => {
                      const phoneDigits = phone.replace(/\D/g, "");
                      if (!phoneDigits) {
                        setValidationErrors((prev) => ({ ...prev, phone: "Phone number is required." }));
                      } else if (phoneCountryCode === "+91" && phoneDigits.length !== 10) {
                        setValidationErrors((prev) => ({
                          ...prev,
                          phone: "Phone number must be 10 digits.",
                        }));
                      } else if (phoneDigits.length < 7 || phoneDigits.length > 15) {
                        setValidationErrors((prev) => ({
                          ...prev,
                          phone: "Please enter a valid phone number.",
                        }));
                      } else {
                        setValidationErrors((prev) => ({ ...prev, phone: undefined }));
                      }
                    }}
                    className={`w-full rounded-r-md border bg-[#FDFEFC] px-4 py-2.5 text-[16px] text-fg focus:outline-none focus:ring-1 focus:ring-emerald placeholder:text-fg/35 ${
                      validationErrors.phone ? "border-destructive focus:ring-destructive" : "border-muted"
                    }`}
                  />
                </div>
                {validationErrors.phone && (
                  <p className="mt-1 text-[13px] text-destructive font-medium">{validationErrors.phone}</p>
                )}
              </div>

              {/* City Field */}
              <div>
                <label htmlFor="city" className="block text-[15px] font-bold uppercase tracking-wider text-fg-2 mb-1.5">
                  City <span className="text-destructive font-normal">*</span>
                </label>
                <input
                  id="city"
                  type="text"
                  required
                  disabled={checkoutLoading}
                  placeholder="e.g. Kozhikode"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  onBlur={() =>
                    setValidationErrors((prev) => ({ ...prev, city: city.trim() ? undefined : "City is required." }))
                  }
                  className={`w-full rounded-md border bg-[#FDFEFC] px-4 py-2.5 text-[16px] text-fg focus:outline-none focus:ring-1 focus:ring-emerald placeholder:text-fg/35 ${
                    validationErrors.city ? "border-destructive focus:ring-destructive" : "border-muted"
                  }`}
                />
                {validationErrors.city && (
                  <p className="mt-1 text-[13px] text-destructive font-medium">{validationErrors.city}</p>
                )}
              </div>

              {/* Country Field */}
              <div>
                <label htmlFor="country" className="block text-[15px] font-bold uppercase tracking-wider text-fg-2 mb-1.5">
                  Country <span className="text-destructive font-normal">*</span>
                </label>
                <input
                  id="country"
                  type="text"
                  required
                  disabled={checkoutLoading}
                  placeholder="e.g. India"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  onBlur={() =>
                    setValidationErrors((prev) => ({ ...prev, country: country.trim() ? undefined : "Country is required." }))
                  }
                  className={`w-full rounded-md border bg-[#FDFEFC] px-4 py-2.5 text-[16px] text-fg focus:outline-none focus:ring-1 focus:ring-emerald placeholder:text-fg/35 ${
                    validationErrors.country ? "border-destructive focus:ring-destructive" : "border-muted"
                  }`}
                />
                {validationErrors.country && (
                  <p className="mt-1 text-[13px] text-destructive font-medium">{validationErrors.country}</p>
                )}
              </div>

              {/* Price outline */}
              <div className="mt-6 p-4 rounded-md bg-surface-muted border border-muted/50">
                <div className="flex justify-between items-baseline">
                  <span className="text-[17px] font-bold text-fg-2">Course Price</span>
                  <span className="text-h3 font-display font-bold text-fg">
                    {isCircleMember ? "₹2,399" : "₹2,999"}
                  </span>
                </div>
              </div>
              <p className="-mt-2 text-[14px] font-medium leading-relaxed text-fg">
                {isCircleMember ? (
                  <span>
                    Circle membership verified! You automatically receive 20% discount (₹2,399 charged) for your eligible email.*
                  </span>
                ) : (
                  <span>
                    Circle members automatically receive 20% discount (₹2,399 charged) for eligible emails.*
                  </span>
                )}
              </p>

              {/* Submit CTA */}
              <BrandButton variant="solid" tone="emerald" className="w-full mt-6" onClick={handleCheckout} disabled={checkoutLoading} full>
                {checkoutLoading ? "Opening Checkout..." : "Proceed to Payment"}
              </BrandButton>
            </form>
          </Card>
        )}
      </div>
    </main>
  );
}
