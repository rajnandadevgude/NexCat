"use client"

import { motion } from "framer-motion"

interface StatCardProps {
  number: string
  label: string
}

export function StatCard({ number, label }: StatCardProps) {
  return (
    <motion.div
      className="bg-blue-700 rounded-lg p-6 text-center"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <motion.p
        className="text-4xl font-bold mb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {number}
      </motion.p>
      <p className="text-blue-200">{label}</p>
    </motion.div>
  )
}

