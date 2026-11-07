import { Award, Users, Trophy, Code, BookOpen } from "lucide-react"

/**
 * Impact & Recognition timeline data for the RadialOrbitalTimeline.
 * Maps leadership roles and achievements into the orbital format.
 */
export const impactTimelineData = [
  {
    id: 1,
    title: "E-Cell Event Head",
    date: "2025",
    content:
      "Led planning and execution of 5+ entrepreneurship and technical events at JNCT. Coordinated volunteers, schedules, and event logistics.",
    category: "Leadership",
    icon: Users,
    relatedIds: [2],
    status: "completed",
    energy: 95,
  },
  {
    id: 2,
    title: "NEC Rank 40",
    date: "2025",
    content:
      "Contributed to the team achieving Rank 40 nationally in the National Entrepreneurship Challenge (NEC) 2025, E-Cell IIT Bombay.",
    category: "Achievement",
    icon: Trophy,
    relatedIds: [1],
    status: "completed",
    energy: 100,
  },
  {
    id: 3,
    title: "NSS Unit Head",
    date: "2024 — 2026",
    content:
      "Served as Unit Head for 2 years. Led 2 consecutive 7-day NSS Special Camps as Camp Leader. Managed 50 volunteers and organized campus-wide initiatives with 100+ participants.",
    category: "Leadership",
    icon: Award,
    relatedIds: [4],
    status: "completed",
    energy: 90,
  },
  {
    id: 4,
    title: "Cognizant Hackathon",
    date: "2026",
    content:
      "Finalist / Participant at the Cognizant Technoverse Hackathon 2026. Competed against top engineering teams nationwide.",
    category: "Achievement",
    icon: Code,
    relatedIds: [3, 5],
    status: "completed",
    energy: 75,
  },
  {
    id: 5,
    title: "Google Hackathon",
    date: "2025",
    content:
      "Finalist / Participant at the Coding Ninjas × Google for Developers Hackathon. Built innovative solutions under time pressure.",
    category: "Achievement",
    icon: Code,
    relatedIds: [4],
    status: "completed",
    energy: 70,
  },
  {
    id: 6,
    title: "Patent Published",
    date: "Nov 2025",
    content:
      "Published Indian patent (App No. 202521100865 A) for 'Wearable System for Adaptive Mental Health Support' — an intelligent multi-modal wearable integrating biometric sensors, ERM vibration motors, and haptic breathing dials.",
    category: "Research",
    icon: BookOpen,
    relatedIds: [3],
    status: "completed",
    energy: 85,
  },
]
