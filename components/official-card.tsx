import Image from "next/image"

interface OfficialCardProps {
  name: string
  role?: string
  imgSrc: string
}

export function OfficialCard({ name, role = "Hon'ble Official", imgSrc }: OfficialCardProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-14 h-14 overflow-hidden rounded-full border-2 border-gray-200">
        <Image src={imgSrc || "/placeholder.svg"} alt={name} fill className="object-cover" />
      </div>
      <div className="text-center mt-1">
        <p className="text-sm font-medium">{name}</p>
        <p className="text-xs text-gray-600">{role}</p>
      </div>
    </div>
  )
}

