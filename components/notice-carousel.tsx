"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function NoticeCarousel() {
  const notices = [
    "Important: All certificates are now available with digital signatures",
    "New service added: Agriculturist Certificate now available online",
    "Maintenance scheduled: System will be down on 15th March from 11PM to 2AM",
    "Attention: Update your Aadhaar details for seamless service delivery",
  ]

  const [currentNotice, setCurrentNotice] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNotice((prev) => (prev + 1) % notices.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [notices.length])

  const goToPrevious = () => {
    setCurrentNotice((prev) => (prev - 1 + notices.length) % notices.length)
  }

  const goToNext = () => {
    setCurrentNotice((prev) => (prev + 1) % notices.length)
  }

  return (
    <div className="bg-yellow-100 py-2">
      <div className="container mx-auto flex items-center">
        <Button variant="outline" size="icon" className="border-none h-6 w-6 p-0" onClick={goToPrevious}>
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex-1 overflow-hidden mx-2">
          <div className="text-center font-medium text-orange-800">{notices[currentNotice]}</div>
        </div>

        <Button variant="outline" size="icon" className="border-none h-6 w-6 p-0" onClick={goToNext}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

