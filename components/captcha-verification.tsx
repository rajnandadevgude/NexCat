"use client"

import { useState } from "react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

export function CaptchaVerification() {
  const [captchaInput, setCaptchaInput] = useState("")
  const [captchaKey, setCaptchaKey] = useState(1) // Used to force refresh the captcha

  const refreshCaptcha = () => {
    setCaptchaKey((prev) => prev + 1)
    setCaptchaInput("")
  }

  return (
    <div className="bg-white p-3 rounded">
      <div className="flex items-center gap-2">
        <div className="border border-gray-300 p-1 bg-blue-50">
          <Image key={captchaKey} src="/captcha.png" alt="CAPTCHA" width={150} height={50} className="object-contain" />
        </div>
        <div className="flex flex-col gap-1">
          <Button
            variant="outline"
            size="sm"
            className="text-xs bg-white text-blue-600 border-blue-300 flex items-center gap-1"
            onClick={refreshCaptcha}
          >
            <RefreshCw size={12} />
            Try another
          </Button>
          <Input
            value={captchaInput}
            onChange={(e) => setCaptchaInput(e.target.value)}
            placeholder="Enter the text below as you see in the captcha"
            className="text-xs h-8"
          />
        </div>
      </div>
    </div>
  )
}

