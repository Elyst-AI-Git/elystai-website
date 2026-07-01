"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type InputOTPContextValue = {
  disabled?: boolean;
  maxLength: number;
  setSlotRef: (index: number, node: HTMLInputElement | null) => void;
  updateValue: (index: number, value: string) => void;
  value: string;
  focusSlot: (index: number) => void;
};

const InputOTPContext = React.createContext<InputOTPContextValue | null>(null);

function useInputOTP() {
  const context = React.useContext(InputOTPContext);
  if (!context) {
    throw new Error("InputOTP components must be used inside InputOTP");
  }
  return context;
}

type InputOTPProps = {
  children: React.ReactNode;
  className?: string;
  defaultValue?: string;
  disabled?: boolean;
  maxLength: number;
  onChange?: (value: string) => void;
  value?: string;
};

export function InputOTP({
  children,
  className,
  defaultValue = "",
  disabled,
  maxLength,
  onChange,
  value,
}: InputOTPProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue.slice(0, maxLength));
  const slotRefs = React.useRef<Array<HTMLInputElement | null>>([]);
  const currentValue = (value ?? internalValue).slice(0, maxLength);

  const setValue = React.useCallback(
    (nextValue: string) => {
      const cleanValue = nextValue.replace(/\D/g, "").slice(0, maxLength);
      if (value === undefined) setInternalValue(cleanValue);
      onChange?.(cleanValue);
    },
    [maxLength, onChange, value]
  );

  const updateValue = React.useCallback(
    (index: number, rawValue: string) => {
      const cleanValue = rawValue.replace(/\D/g, "");
      const nextValue = currentValue.padEnd(maxLength, " ").split("");

      if (cleanValue.length > 1) {
        cleanValue
          .slice(0, maxLength - index)
          .split("")
          .forEach((char, offset) => {
            nextValue[index + offset] = char;
          });
        setValue(nextValue.join("").replace(/\s/g, ""));
        slotRefs.current[Math.min(index + cleanValue.length, maxLength - 1)]?.focus();
        return;
      }

      nextValue[index] = cleanValue;
      setValue(nextValue.join("").replace(/\s/g, ""));
      if (cleanValue && index < maxLength - 1) {
        slotRefs.current[index + 1]?.focus();
      }
    },
    [currentValue, maxLength, setValue]
  );

  const setSlotRef = React.useCallback((index: number, node: HTMLInputElement | null) => {
    slotRefs.current[index] = node;
  }, []);

  const focusSlot = React.useCallback(
    (index: number) => {
      if (index >= 0 && index < maxLength) {
        slotRefs.current[index]?.focus();
      }
    },
    [maxLength]
  );

  return (
    <InputOTPContext.Provider value={{ disabled, maxLength, setSlotRef, updateValue, value: currentValue, focusSlot }}>
      <div className={cn("flex items-center justify-center", className)}>{children}</div>
    </InputOTPContext.Provider>
  );
}

export function InputOTPGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("flex items-center gap-2", className)}>{children}</div>;
}

export function InputOTPSlot({
  className,
  index,
}: {
  className?: string;
  index: number;
}) {
  const { disabled, setSlotRef, updateValue, value, focusSlot } = useInputOTP();
  const char = value[index] ?? "";

  return (
    <input
      ref={(node) => setSlotRef(index, node)}
      aria-label={`Digit ${index + 1}`}
      autoComplete={index === 0 ? "one-time-code" : "off"}
      className={cn(
        "h-12 w-10 sm:h-14 sm:w-12 rounded-lg border-2 border-muted/80 bg-[#FDFEFC] text-center font-mono text-[20px] sm:text-[22px] font-extrabold text-fg shadow-sm outline-none transition duration-200 focus:border-emerald focus:ring-2 focus:ring-emerald/20 disabled:opacity-50",
        className
      )}
      disabled={disabled}
      inputMode="numeric"
      maxLength={1}
      onChange={(event) => updateValue(index, event.target.value)}
      onKeyDown={(event) => {
        if (event.key === "Backspace" && !char && index > 0) {
          focusSlot(index - 1);
        }
      }}
      onPaste={(event) => {
        event.preventDefault();
        updateValue(index, event.clipboardData.getData("text"));
      }}
      pattern="[0-9]*"
      type="text"
      value={char}
    />
  );
}
