"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export function FontSizeSelector() {
  const [fontSize, setFontSize] = useState("medium")

  const changeFontSize = (size: string) => {
    setFontSize(size)
    document.documentElement.style.fontSize =
      {
        small: "14px",
        medium: "16px",
        large: "18px",
        xlarge: "20px",
      }[size] || "16px"
  }

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="outline"
        size="sm"
        className={`h-6 w-6 p-0 text-xs ${fontSize === "small" ? "bg-gray-800 text-white" : "bg-white text-black"}`}
        onClick={() => changeFontSize("small")}
      >
        A-
      </Button>
      <Button
        variant="outline"
        size="sm"
        className={`h-6 w-6 p-0 text-sm ${fontSize === "medium" ? "bg-gray-800 text-white" : "bg-white text-black"}`}
        onClick={() => changeFontSize("medium")}
      >
        A
      </Button>
      <Button
        variant="outline"
        size="sm"
        className={`h-6 w-6 p-0 text-base ${fontSize === "large" ? "bg-gray-800 text-white" : "bg-white text-black"}`}
        onClick={() => changeFontSize("large")}
      >
        A+
      </Button>
      <Button variant="outline" size="sm" className={`h-6 w-6 p-0 bg-black text-white`}>
        A
      </Button>
    </div>
  )
}

