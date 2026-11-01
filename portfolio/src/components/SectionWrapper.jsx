import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

export const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

/**
 * SectionWrapper — animates children in on scroll.
 */
export function SectionWrapper({ id, children, className = '' }) {
  return (
    <motion.section
      id={id}
      className={`section-pad ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={containerVariants}
    >
      <div className="max-w-6xl mx-auto px-6">
        {children}
      </div>
    </motion.section>
  )
}

/**
 * SectionHeader — consistent heading + optional sub-label for each section.
 */
export function SectionHeader({ label, title, description }) {
  return (
    <motion.div variants={itemVariants} className="mb-12">
      {label && (
        <p className="text-xs font-mono text-[var(--color-accent)] tracking-widest uppercase mb-3">
          {label}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-[var(--color-muted)] max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  )
}
