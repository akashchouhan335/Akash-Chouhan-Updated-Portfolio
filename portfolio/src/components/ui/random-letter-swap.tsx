"use client";

import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

export function RandomLetterSwap({
  label,
  className = "",
  staggerDuration = 0.025,
  transition = { duration: 0.6, type: "spring" },
}) {
  const [displayText, setDisplayText] = useState(label);
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    let timeoutId;
    if (isHovered) {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()";
      let iteration = 0;
      
      const interval = setInterval(() => {
        setDisplayText(
          label
            .split("")
            .map((letter, index) => {
              if (index < iteration) {
                return label[index];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );

        if (iteration >= label.length) {
          clearInterval(interval);
        }
        iteration += 1 / (label.length * staggerDuration * 10);
      }, 30);
      
      return () => {
        clearInterval(interval);
        if (timeoutId) clearTimeout(timeoutId);
      };
    } else {
      setDisplayText(label);
    }
  }, [isHovered, label, staggerDuration]);

  return (
    <motion.span
      className={className}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      transition={transition}
      animate={controls}
    >
      {displayText}
    </motion.span>
  );
}
