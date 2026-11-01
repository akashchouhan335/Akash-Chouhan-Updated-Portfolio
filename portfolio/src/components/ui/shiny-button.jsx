"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

export function ShinyButton({ children, className = "", asChild = false, ...props }) {
  const Comp = asChild ? Slot : "button"
  
  return (
    <Comp className={cn("shiny-cta", className)} {...props}>
      {asChild ? (
        children
      ) : (
        <span>{children}</span>
      )}
    </Comp>
  )
}
