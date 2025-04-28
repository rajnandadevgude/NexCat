"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { ethers } from "ethers"

interface Web3ContextType {
  account: string | null
  provider: ethers.Provider | null
  signer: ethers.Signer | null
  isConnecting: boolean
  error: string | null
  connect: () => Promise<void>
  disconnect: () => void
}

const Web3Context = createContext<Web3ContextType>({
  account: null,
  provider: null,
  signer: null,
  isConnecting: false,
  error: null,
  connect: async () => {},
  disconnect: () => {},
})

export const Web3Provider = ({ children }: { children: ReactNode }) => {
  const [account, setAccount] = useState<string | null>(null)
  const [provider, setProvider] = useState<ethers.Provider | null>(null)
  const [signer, setSigner] = useState<ethers.Signer | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const connect = async () => {
    if (typeof window.ethereum === "undefined") {
      setError("MetaMask is not installed")
      return
    }

    setIsConnecting(true)
    setError(null)

    try {
      const provider = new ethers.BrowserProvider(window.ethereum)
      const accounts = await provider.send("eth_requestAccounts", [])
      const signer = await provider.getSigner()

      setProvider(provider)
      setSigner(signer)
      setAccount(accounts[0])
    } catch (err) {
      console.error("Connection error:", err)
      setError(err instanceof Error ? err.message : "Failed to connect wallet")
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnect = () => {
    setAccount(null)
    setSigner(null)
  }

  // Check if already connected
  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum)
          const accounts = await provider.listAccounts()

          if (accounts.length > 0) {
            const signer = await provider.getSigner()
            setProvider(provider)
            setSigner(signer)
            setAccount(accounts[0].address)
          }
        } catch (err) {
          console.error("Error checking connection:", err)
        }
      }
    }

    checkConnection()
  }, [])

  return (
    <Web3Context.Provider
      value={{
        account,
        provider,
        signer,
        isConnecting,
        error,
        connect,
        disconnect,
      }}
    >
      {children}
    </Web3Context.Provider>
  )
}

export const useWeb3Connector = () => useContext(Web3Context)

