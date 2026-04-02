"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

type AccordionContextType = {
  openItem: string | null;
  setOpenItem: React.Dispatch<React.SetStateAction<string | null>>;
};

const AccordionContext = React.createContext<AccordionContextType | null>(null);

export function Accordion({
  children,
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [openItem, setOpenItem] = React.useState<string | null>(null);
  return (
    <AccordionContext.Provider value={{ openItem, setOpenItem }}>
      <div className={cn("divide-y divide-gray-200", className)}>{children}</div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  const ctx = React.useContext(AccordionContext);
  if (!ctx) throw new Error("AccordionItem must be inside Accordion");

  const isOpen = ctx.openItem === value;

  return (
    <div
      className={cn(
        "accordion-item border-b border-gray-200",
        isOpen ? "open" : "closed"
      )}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement<{ isOpen?: boolean; value?: string }>(child)
          ? React.cloneElement(child, { isOpen, value })
          : child
      )}
    </div>
  );
}

export function AccordionTrigger({
  children,
  isOpen,
  value,
}: {
  children: React.ReactNode;
  isOpen?: boolean;
  value?: string;
}) {
  const ctx = React.useContext(AccordionContext);
  if (!ctx) throw new Error("AccordionTrigger must be inside Accordion");

  return (
    <button
      onClick={() => ctx.setOpenItem(ctx.openItem === value ? null : value!)}
      className="flex justify-between w-full py-4 text-[16px] font-semibold text-[#2b1d13]"
    >
      {children}
    </button>
  );
}

export function AccordionContent({
  children,
  isOpen,
}: {
  children: React.ReactNode;
  isOpen?: boolean;
}) {
  return (
    <div
      className={cn(
        "accordion-content px-4 pb-4 text-sm text-gray-700 leading-relaxed",
        isOpen ? "block" : "hidden"
      )}
    >
      {children}
    </div>
  );
}
