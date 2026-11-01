import { motion } from 'framer-motion'
import { cn } from '@/utils'

const variants = {
  primary: 'bg-[var(--color-accent)] text-[var(--color-bg)] hover:brightness-110',
  outline: 'border border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-[var(--color-bg)]',
  ghost: 'text-[var(--color-text)] hover:text-[var(--color-accent)] hover:bg-white/5',
}

export function Button({ children, variant = 'primary', href, onClick, className, ...rest }) {
  const classes = cn(
    'inline-flex items-center gap-2 rounded-[var(--radius-md)] px-5 py-2.5 text-sm font-semibold font-[var(--font-display)] transition-all duration-200 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]',
    variants[variant],
    className
  )

  if (href) {
    return (
      <motion.a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        className={classes}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        {...rest}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      onClick={onClick}
      className={classes}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      {...rest}
    >
      {children}
    </motion.button>
  )
}
