import Image from "next/image"

interface IntegrationCardProps {
  title: string
  imgSrc: string
  bgColor: string
  textColor: string
}

export function IntegrationCard({ title, imgSrc, bgColor, textColor }: IntegrationCardProps) {
  return (
    <div
      className={`${bgColor} p-4 flex flex-col items-center justify-center min-h-[150px] rounded-sm shadow-md hover:shadow-lg transition-shadow`}
    >
      <h3 className={`${textColor} text-center font-medium mb-4 text-sm`}>{title}</h3>
      <div className="relative w-20 h-20">
        <Image src={imgSrc || "/placeholder.svg"} alt={title} fill className="object-contain" />
      </div>
    </div>
  )
}

