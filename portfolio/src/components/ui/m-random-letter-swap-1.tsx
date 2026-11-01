"use client";

import React, { useState } from "react";
import { RandomLetterSwap } from "@/components/ui/random-letter-swap";
import { Home, Briefcase, User, PenTool, Mail, Menu, X } from "lucide-react";
import { useReducedMotion } from "@/hooks";
import { cn } from "@/lib/utils";

const defaultLinks = [
  { name: "Home", icon: Home, href: "#hero" },
  { name: "Work", icon: Briefcase, href: "#projects" },
  { name: "About", icon: User, href: "#about" },
  { name: "Blog", icon: PenTool, href: "#research" },
  { name: "Contact", icon: Mail, href: "#contact" },
];

export default function RandomLetterSwapNav({ links = defaultLinks }) {
  const [active, setActive] = useState("Home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleLinkClick = (name) => {
    setActive(name);
    setMobileMenuOpen(false);
  };

  return (
    <div className="flex items-center justify-center w-full px-6 py-4 relative">
      
      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-8 bg-[var(--color-surface)] px-8 py-3 rounded-[var(--radius-lg)] border border-[var(--color-border)]">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = active === link.name;
          
          return (
            <a 
              href={link.href}
              key={link.name} 
              onClick={() => handleLinkClick(link.name)}
              className="flex items-center gap-2 group"
            >
              {Icon && <Icon size={16} className={cn(
                "transition-colors duration-300", 
                isActive ? "text-[var(--color-accent)]" : "text-[var(--color-muted)] group-hover:text-[var(--color-accent)]"
              )} />}
              
              {prefersReducedMotion ? (
                <span className={cn(
                  "cursor-pointer font-medium text-sm transition-colors duration-300",
                  isActive ? "text-[var(--color-accent)]" : "text-[var(--color-muted)] group-hover:text-[var(--color-accent)]"
                )}>
                  {link.name}
                </span>
              ) : (
                <RandomLetterSwap
                  className={cn(
                    "cursor-pointer font-medium text-sm transition-colors duration-300",
                    isActive ? "text-[var(--color-accent)]" : "text-[var(--color-muted)] group-hover:text-[var(--color-accent)]"
                  )}
                  label={link.name}
                  staggerDuration={0.025}
                  transition={{ duration: 0.6, type: "spring" }}
                />
              )}
            </a>
          );
        })}
      </nav>

      {/* Mobile Nav Toggle */}
      <div className="md:hidden flex w-full justify-between items-center bg-[var(--color-surface)] px-4 py-3 rounded-[var(--radius-lg)] border border-[var(--color-border)]">
        <span className="font-display font-bold text-[var(--color-text)]">Menu</span>
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-[var(--color-text)] focus:outline-none"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-6 right-6 mt-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-4 flex flex-col gap-4 md:hidden z-50">
           {links.map((link) => {
             const Icon = link.icon;
             const isActive = active === link.name;
             return (
              <a 
                href={link.href}
                key={link.name} 
                onClick={() => handleLinkClick(link.name)}
                className="flex items-center gap-3 p-2 rounded-md hover:bg-[#1a1a1a]"
              >
                {Icon && <Icon size={18} className={isActive ? "text-[var(--color-accent)]" : "text-[var(--color-muted)]"} />}
                <span className={cn(
                  "font-medium text-base",
                  isActive ? "text-[var(--color-accent)]" : "text-[var(--color-muted)]"
                )}>
                  {link.name}
                </span>
              </a>
             )
           })}
        </div>
      )}
    </div>
  );
}
