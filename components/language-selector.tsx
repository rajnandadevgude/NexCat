"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export function LanguageSelector() {
  const [language, setLanguage] = useState("english")

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="outline"
        size="sm"
        className={`h-6 px-2 text-xs ${language === "english" ? "bg-gray-800 text-white" : "bg-white text-black"}`}
        onClick={() => setLanguage("english")}
      >
        A
      </Button>
      <Button
        variant="outline"
        size="sm"
        className={`h-6 px-2 text-xs ${language === "marathi" ? "bg-orange-500 text-white" : "bg-white text-black"}`}
        onClick={() => setLanguage("marathi")}
      >
        मराठी
      </Button>
    </div>
  )
}

