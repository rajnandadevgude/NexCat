"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { FileText, Shield, Cloud, Link2, Phone, LayoutDashboard, LogOut, LogIn, UserPlus, Menu, X, FileQuestionIcon, MailQuestion, HomeIcon, ServerIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/hooks/use-auth"

export function MainNav() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Navigation items
  const navItems = [
    {
      label: "HOME",
      icon: <HomeIcon className="h-4 w-4" />,
      href: "/",
      active: pathname === "/",
    },
    {
      label: "HOW TO USE",
      icon: <FileQuestionIcon className="h-4 w-4" />,
      href: "/how-to-use",
      active: pathname === "/how-to-use",
    },
    {
      label: "DOCUMENTS",
      icon: <FileText className="h-4 w-4" />,
      href: "/documents",
      active: pathname === "/documents" || pathname.startsWith("/documents/"),
    },
    {
      label: "VERIFICATION",
      icon: <Shield className="h-4 w-4" />,
      href: "/verify",
      active: pathname === "/verify",
    },
    {
      label: "SERVICES",
      icon: <ServerIcon className="h-4 w-4" />,
      href: "/services",
      active: pathname === "/services" || pathname.startsWith("/service/"),
    },
    {
      label: "IPFS STORAGE",
      icon: <Cloud className="h-4 w-4" />,
      href: "/ipfs",
      active: pathname === "/ipfs",
    },
    {
      label: "BLOCKCHAIN",
      icon: <Link2 className="h-4 w-4" />,
      href: "/blockchain",
      active: pathname === "/blockchain",
    },
    {
      label: "CONTACT",
      icon: <Phone className="h-4 w-4" />,
      href: "/contact",
      active: pathname === "/contact",
    },
  ]

  // Add Dashboard item if user is logged in
  if (user) {
    navItems.push({
      label: "DASHBOARD",
      icon: <LayoutDashboard className="h-4 w-4" />,
      href: "/dashboard",
      active: pathname === "/dashboard" || pathname.startsWith("/dashboard/"),
    })
  }

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <nav
      className={`bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 sticky top-0 z-30 
        ${scrolled ? "shadow-md" : ""} transition-all duration-300`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo and Name for mobile */}
        <div className="flex items-center gap-2 lg:hidden">
          <div className="relative h-8 w-8">
            <Image src="/n.png" alt="NexCat Logo" fill className="object-contain" />
          </div>
          <span className="font-bold">NexCat</span>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex flex-1 justify-center">
          <div className="flex flex-wrap justify-center gap-1 md:gap-2">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`px-3 py-2 text-sm font-medium 
                  ${
                    item.active ? "bg-blue-700 text-white" : "hover:bg-blue-700 text-blue-50"
                  } rounded-md flex items-center gap-1 transition-colors`}
              >
                {typeof item.icon === "string" ? <span>{item.icon}</span> : item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Auth Buttons - Desktop */}
        <div className="hidden lg:flex items-center gap-2">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-white">
                  <span className="mr-2">{user.name}</span>
                  <div className="relative w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center">
                    {user.name.charAt(0)}
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="flex items-center gap-2 cursor-pointer">
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile" className="flex items-center gap-2 cursor-pointer">
                    <FileText className="h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings" className="flex items-center gap-2 cursor-pointer">
                    <Shield className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="flex items-center gap-2 cursor-pointer text-red-600">
                  <LogOut className="h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" className="text-white" style={{ borderRadius: '8px' }}>
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-white text-blue-600 hover:bg-blue-50" style={{ borderRadius: '8px' }}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-4 bg-blue-700 border-t border-blue-500">
          <div className="container mx-auto px-4 py-4">
            <div className="space-y-2">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={`block px-4 py-2 text-sm font-medium rounded-md 
                    ${
                      item.active ? "bg-blue-800 text-white" : "hover:bg-blue-600 text-blue-50"
                    } flex items-center gap-2`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {typeof item.icon === "string" ? <span>{item.icon}</span> : item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}

              <div className="border-t border-blue-600 mt-4 pt-4">
                {user ? (
                  <>
                    <div className="px-4 py-2 flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
                        {user.name.charAt(0)}
                      </div>
                      <span className="font-medium">{user.name}</span>
                    </div>
                    <button
                      className="w-full mt-2 px-4 py-2 text-sm font-medium rounded-md bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
                      onClick={() => {
                        logout()
                        setIsMobileMenuOpen(false)
                      }}
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Log out</span>
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link
                      href="/login"
                      className="px-4 py-2 text-sm font-medium rounded-md bg-blue-600 hover:bg-blue-800 text-white flex items-center gap-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <LogIn className="h-4 w-4" />
                      <span>Login</span>
                    </Link>
                    <Link
                      href="/register"
                      className="px-4 py-2 text-sm font-medium rounded-md bg-white hover:bg-blue-50 text-blue-600 flex items-center gap-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <UserPlus className="h-4 w-4" />
                      <span>Register</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

