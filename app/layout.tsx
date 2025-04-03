import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Web3Provider } from "@/hooks/use-web3-connector"
import { Web3Connector } from "@/components/web3-connector"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NexCat - Blockchain Portal",
  description: "Decentralized government services portal for Maharashtra",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Web3Provider>
          {children}
          <Web3Connector />
        </Web3Provider>
      </body>
    </html>
  )
}



import './globals.css'