// Utility: merge class names
export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

// Utility: clamp a number between min and max
export function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max)
}

// Utility: map a value from one range to another
export function mapRange(value, inMin, inMax, outMin, outMax) {
  return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin
}
