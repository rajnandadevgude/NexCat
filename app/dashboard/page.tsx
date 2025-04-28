"use client"

import { useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Upload, FileText, Clock, Shield, Share2, LogOut, User, Settings, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MainNav } from "@/components/main-nav"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"

// Sample dashboard data
const dashboardData = {
  stats: {
    totalDocuments: 12,
    verifiedDocuments: 10,
    pendingDocuments: 2,
    sharedDocuments: 5,
  },
  recentDocuments: [
    {
      id: "doc1",
      title: "Income Certificate",
      date: "2023-10-15",
      status: "Verified",
      thumbnail: "/images/documents/doc-preview-1.jpg",
    },
    {
      id: "doc2",
      title: "Property Deed",
      date: "2023-09-22",
      status: "Verified",
      thumbnail: "/images/documents/doc-preview-2.jpg",
    },
    {
      id: "doc3",
      title: "Birth Certificate",
      date: "2023-08-05",
      status: "Pending",
      thumbnail: "/images/documents/doc-preview-3.jpg",
    },
  ],
  recentActivity: [
    {
      id: "act1",
      type: "upload",
      document: "Income Certificate",
      date: "2023-10-15T10:30:00",
    },
    {
      id: "act2",
      type: "verification",
      document: "Income Certificate",
      date: "2023-10-15T11:45:00",
    },
    {
      id: "act3",
      type: "share",
      document: "Property Deed",
      date: "2023-09-22T15:20:00",
      sharedWith: "0x1234...5678",
    },
  ],
}

export default function DashboardPage() {
  const router = useRouter()
  const { user, logout } = useAuth()

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  if (!user) {
    return null // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <MainNav />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-blue-600 font-medium">Dashboard</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500">
              <Image src={user.avatar || "/images/avatars/user-1.jpg"} alt={user.name} fill className="object-cover" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/upload">
              <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2" style={{ borderRadius: '8px' }}>
                <Upload className="h-4 w-4" />
                Upload Document
              </Button>
            </Link>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Quick Menu</CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <nav className="space-y-1">
                  <Link
                    href="/dashboard"
                    className="flex items-center space-x-3 px-3 py-2 bg-blue-50 text-blue-700 rounded-md"
                  >
                    <Home className="h-5 w-5" />
                    <span>Overview</span>
                  </Link>
                  <Link
                    href="/documents"
                    className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    <FileText className="h-5 w-5" />
                    <span>My Documents</span>
                  </Link>
                  <Link
                    href="/upload"
                    className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    <Upload className="h-5 w-5" />
                    <span>Upload Document</span>
                  </Link>
                  <Link
                    href="/verify"
                    className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    <Shield className="h-5 w-5" />
                    <span>Verify Document</span>
                  </Link>
                  <Link
                    href="/dashboard/shared"
                    className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    <Share2 className="h-5 w-5" />
                    <span>Shared Documents</span>
                  </Link>
                  <Link
                    href="/dashboard/profile"
                    className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    <User className="h-5 w-5" />
                    <span>Profile</span>
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full flex items-center space-x-3 px-3 py-2 text-red-700 hover:bg-red-50 rounded-md" style={{ borderRadius: '8px' }}
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Log out</span>
                  </button>
                </nav>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader className="pb-2">
                <CardTitle>Storage Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Used Space</span>
                      <span>28.5 MB of 1 GB</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-blue-600 rounded-full" style={{ width: "3%" }}></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="bg-blue-50 p-3 rounded-md">
                      <p className="text-xs text-gray-500">Documents</p>
                      <p className="font-semibold">{dashboardData.stats.totalDocuments}</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-md">
                      <p className="text-xs text-gray-500">Verified</p>
                      <p className="font-semibold">{dashboardData.stats.verifiedDocuments}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="md:col-span-9 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="flex items-center p-6">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Documents</p>
                    <p className="text-2xl font-bold">{dashboardData.stats.totalDocuments}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center p-6">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Verified</p>
                    <p className="text-2xl font-bold">{dashboardData.stats.verifiedDocuments}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center p-6">
                  <div className="bg-yellow-100 p-3 rounded-full mr-4">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Pending</p>
                    <p className="text-2xl font-bold">{dashboardData.stats.pendingDocuments}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center p-6">
                  <div className="bg-purple-100 p-3 rounded-full mr-4">
                    <Share2 className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Shared</p>
                    <p className="text-2xl font-bold">{dashboardData.stats.sharedDocuments}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Documents & Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Documents</CardTitle>
                  <CardDescription>Your recently uploaded documents</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dashboardData.recentDocuments.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="relative w-12 h-16 bg-gray-100 rounded overflow-hidden">
                            <Image
                              src={doc.thumbnail || "/placeholder.svg"}
                              alt={doc.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium">{doc.title}</p>
                            <p className="text-xs text-gray-500">{new Date(doc.date).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div
                          className={`text-xs px-2 py-1 rounded-full ${
                            doc.status === "Verified" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {doc.status}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/documents" className="text-blue-600 hover:text-blue-800 text-sm">
                    View all documents
                  </Link>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest actions on your account</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dashboardData.recentActivity.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-start space-x-3 border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                      >
                        <div
                          className={`p-2 rounded-full ${
                            activity.type === "upload"
                              ? "bg-blue-100"
                              : activity.type === "verification"
                                ? "bg-green-100"
                                : "bg-purple-100"
                          }`}
                        >
                          {activity.type === "upload" && <Upload className="h-4 w-4 text-blue-600" />}
                          {activity.type === "verification" && <Shield className="h-4 w-4 text-green-600" />}
                          {activity.type === "share" && <Share2 className="h-4 w-4 text-purple-600" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">
                            {activity.type === "upload" && "Uploaded document"}
                            {activity.type === "verification" && "Document verified"}
                            {activity.type === "share" && "Shared document"}
                          </p>
                          <p className="text-xs text-gray-500">{activity.document}</p>
                          {activity.sharedWith && (
                            <p className="text-xs text-gray-500">Shared with: {activity.sharedWith}</p>
                          )}
                          <p className="text-xs text-gray-400 mt-1">{new Date(activity.date).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/dashboard/activity" className="text-blue-600 hover:text-blue-800 text-sm">
                    View all activity
                  </Link>
                </CardFooter>
              </Card>
            </div>

                    </div>
        </div>
      </div>
    </div>
  )
}

