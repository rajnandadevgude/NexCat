"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { FileText } from "lucide-react"

interface ServiceCardProps {
  title: string
  department: string
}

export function ServiceCard({ title, department }: ServiceCardProps) {
  return (
    <Link href={`/service/${title.toLowerCase().replace(/\s+/g, "-")}`} className="block">
      <motion.div
        className="bg-gray-800 text-white p-4 border border-gray-700 hover:bg-gray-700 transition-colors rounded-sm flex items-center gap-3"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <FileText className="text-blue-300 shrink-0" size={18} />
        <div>
          <div className="font-medium">{title}</div>
          <div className="text-xs text-gray-300">{department} Department</div>
        </div>
      </motion.div>
    </Link>
  )
}

