"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useWeb3Connector } from "@/hooks/use-web3-connector"

interface User {
  id: string
  name: string
  email: string
  wallet?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  loginWithWallet: () => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  login: async () => {},
  register: async () => {},
  loginWithWallet: async () => {},
  logout: () => {},
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { account, connect } = useWeb3Connector()

  // Check if user is already logged in
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // In a real app, you would check with your backend
        // Here we'll just check localStorage for demo purposes
        const storedUser = localStorage.getItem("NexCat_user")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error("Auth check error:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuthStatus()
  }, [])

  // Handle wallet connection
  useEffect(() => {
    if (account) {
      // When wallet is connected, check if this wallet is associated with a user
      const checkWalletUser = async () => {
        // In a real app, you would check with your backend
        // Here we'll simulate wallet authentication for demo purposes

        // If user is already logged in with this wallet, do nothing
        if (user && user.wallet === account) return

        // Create a new user with wallet address
        const walletUser: User = {
          id: `user_${Date.now()}`,
          name: `User ${account.substring(0, 6)}`,
          email: `${account.substring(0, 6)}@example.com`,
          wallet: account,
        }

        setUser(walletUser)
        localStorage.setItem("NexCat", JSON.stringify(walletUser))
      }

      checkWalletUser()
    }
  }, [account, user])

  const login = async (email: string, password: string) => {
    setIsLoading(true)

    try {
      // In a real app, you would authenticate with your backend
      // Here we'll simulate authentication for demo purposes
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (email === "user@example.com" && password === "password") {
        const loggedInUser: User = {
          id: "user_123",
          name: "Demo User",
          email: "user@example.com",
        }

        setUser(loggedInUser)
        localStorage.setItem("NexCat_user", JSON.stringify(loggedInUser))
      } else {
        throw new Error("Invalid credentials")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true)

    try {
      // In a real app, you would register with your backend
      // Here we'll simulate registration for demo purposes
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const newUser: User = {
        id: `user_${Date.now()}`,
        name,
        email,
      }

      setUser(newUser)
      localStorage.setItem("NexCat_user", JSON.stringify(newUser))
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithWallet = async () => {
    try {
      // Connect wallet if not already connected
      if (!account) {
        await connect()
      }

      // The effect hook will handle setting up the user once the wallet is connected
    } catch (error) {
      console.error("Wallet login error:", error)
      throw error
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("NexCat_user")
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, loginWithWallet, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

