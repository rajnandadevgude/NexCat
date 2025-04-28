"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Plus, Search, SlidersHorizontal, Clock, X, Download, Eye, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MainNav } from "@/components/main-nav"
import { useAuth } from "@/hooks/use-auth"

// Sample document data
const documentSamples = [
  {
    id: "doc1",
    title: "Income Certificate",
    type: "Financial",
    date: "2023-10-15",
    ipfsHash: "QmZ4tDuvesekSs4qM5ZBKpXiZGun7S2CYtEZRB3DYXkjGx",
    status: "Verified",
    isPublic: true,
    thumbnail: "/images/documents/doc-preview-1.jpg",
  },
  {
    id: "doc2",
    title: "Property Deed",
    type: "Legal",
    date: "2023-09-22",
    ipfsHash: "QmW7b4eTJPqGZkDGcN6gVGqKrUsTsmcZHZj7Pn8EXtK3PQ",
    status: "Verified",
    isPublic: false,
    thumbnail: "/images/documents/doc-preview-2.jpg",
  },
  {
    id: "doc3",
    title: "Birth Certificate",
    type: "Identity",
    date: "2023-08-05",
    ipfsHash: "QmT7F4KXrnZv5iKLQmRSvKQ8hhM6bRgT2qwYvXvdmfj8Xb",
    status: "Pending",
    isPublic: false,
    thumbnail: "/images/documents/doc-preview-3.jpg",
  },
  {
    id: "doc4",
    title: "Medical Record",
    type: "Medical",
    date: "2023-07-18",
    ipfsHash: "QmS9veKUXGV5BKyxwNkjsRbjJcQmJuFvYqXR6DHnWJ57j8",
    status: "Verified",
    isPublic: false,
    thumbnail: "/images/documents/doc-preview-4.jpg",
  },
  {
    id: "doc5",
    title: "Business License",
    type: "Business",
    date: "2023-06-10",
    ipfsHash: "QmP8AyGZVLzgAdbKUdBSqK6Ld7of6P9YcGEQueLtCJMfUr",
    status: "Verified",
    isPublic: true,
    thumbnail: "/images/documents/doc-preview-5.jpg",
  },
]

export default function DocumentsPage() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    type: "",
    status: "",
    visibility: "",
  })
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid") // Corrected line

  // Filter documents
  const filteredDocuments = documentSamples.filter((doc) => {
    // Search filter
    if (searchTerm && !doc.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false
    }

    // Type filter
    if (filters.type && doc.type !== filters.type) {
      return false
    }

    // Status filter
    if (filters.status && doc.status !== filters.status) {
      return false
    }

    // Visibility filter
    if (filters.visibility) {
      if (filters.visibility === "Public" && !doc.isPublic) {
        return false
      }
      if (filters.visibility === "Private" && doc.isPublic) {
        return false
      }
    }

    return true
  })

  const resetFilters = () => {
    setFilters({
      type: "",
      status: "",
      visibility: "",
    })
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
            <span className="text-blue-600 font-medium">Documents</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold text-blue-500">My Documents</h1>

          <div className="flex items-center gap-4">
            <Link href="/upload">
              <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2" style={{ borderRadius: '8px' }}>
                <Plus className="h-4 w-4" />
                Upload New Document
              </Button>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  type="search"
                  placeholder="Search documents..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-3">
                <div className="flex border rounded-md overflow-hidden">
                  <button
                    className={`px-3 py-2 ${viewMode === "grid" ? "bg-blue-50 text-blue-600" : "bg-white text-gray-600"}`}
                    onClick={() => setViewMode("grid")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="3" width="7" height="7"></rect>
                      <rect x="14" y="3" width="7" height="7"></rect>
                      <rect x="3" y="14" width="7" height="7"></rect>
                      <rect x="14" y="14" width="7" height="7"></rect>
                    </svg>
                  </button>
                  <button
                    className={`px-3 py-2 ${viewMode === "list" ? "bg-blue-50 text-blue-600" : "bg-white text-gray-600"}`}
                    onClick={() => setViewMode("list")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="8" y1="6" x2="21" y2="6"></line>
                      <line x1="8" y1="12" x2="21" y2="12"></line>
                      <line x1="8" y1="18" x2="21" y2="18"></line>
                      <line x1="3" y1="6" x2="3.01" y2="6"></line>
                      <line x1="3" y1="12" x2="3.01" y2="12"></line>
                      <line x1="3" y1="18" x2="3.01" y2="18"></line>
                    </svg>
                  </button>
                </div>

                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                  {(filters.type || filters.status || filters.visibility) && (
                    <span className="bg-blue-600 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">
                      {(filters.type ? 1 : 0) + (filters.status ? 1 : 0) + (filters.visibility ? 1 : 0)}
                    </span>
                  )}
                </Button>
              </div>
            </div>

            {showFilters && (
              <div className=" bg-gray-50 p-4 rounded-md mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Filter Documents</h3>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={resetFilters}>
                      Reset
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)} className="text-gray-500">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Document Type</label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={filters.type}
                      onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                    >
                      <option value="">All Types</option>
                      <option value="Financial">Financial</option>
                      <option value="Legal">Legal</option>
                      <option value="Identity">Identity</option>
                      <option value="Medical">Medical</option>
                      <option value="Business">Business</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={filters.status}
                      onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                    >
                      <option value="">All Statuses</option>
                      <option value="Verified">Verified</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Visibility</label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={filters.visibility}
                      onChange={(e) => setFilters({ ...filters, visibility: e.target.value })}
                    >
                      <option value="">All</option>
                      <option value="Public">Public</option>
                      <option value="Private">Private</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Documents Grid/List View */}
            {filteredDocuments.length > 0 ? (
              viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredDocuments.map((doc) => (
                    <Link href={`/documents/${doc.ipfsHash}`} key={doc.id} className="block">
                      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        <div className="relative h-40 bg-gray-100">
                          <Image
                            src={doc.thumbnail || "/placeholder.svg"}
                            alt={doc.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute top-2 right-2">
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                doc.status === "Verified"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {doc.status}
                            </span>
                          </div>
                        </div>

                        <div className="p-4">
                          <h3 className="font-medium mb-1 truncate">{doc.title}</h3>
                          <div className="flex items-center text-xs text-gray-500 mb-2">
                            <Clock className="h-3 w-3 mr-1" />
                            {new Date(doc.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">{doc.type}</span>
                            <span className="text-xs text-gray-500">{doc.isPublic ? "Public" : "Private"}</span>
                          </div>
                        </div>

                        <div className="border-t border-gray-100 p-2 flex justify-around">
                          <button className="text-gray-500 hover:text-blue-600 p-1">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-gray-500 hover:text-blue-600 p-1">
                            < Download className="h-4 w-4" />
                          </button>
                          <button className="text-gray-500 hover:text-blue-600 p-1">
                            <Share2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-100 rounded-md">
                  <div className="grid grid-cols-1 divide-y divide-gray-200">
                    {filteredDocuments.map((doc) => (
                      <Link
                        href={`/documents/${doc.ipfsHash}`}
                        key={doc.id}
                        className="block hover:bg-gray-50 transition-colors"
                      >
                        <div className="p-4 flex items-start gap-4">
                          <div className="relative w-16 h-20 bg-gray-200 rounded overflow-hidden">
                            <Image
                              src={doc.thumbnail || "/placeholder.svg"}
                              alt={doc.title}
                              fill
                              className="object-cover"
                            />
                          </div>

                          <div className="flex-1">
                            <div className="flex justify-between">
                              <h3 className="font-medium">{doc.title}</h3>
                              <span
                                className={`text-sm ${doc.status === "Verified" ? "text-green-600" : "text-yellow-600"}`}
                              >
                                {doc.status}
                              </span>
                            </div>

                            <div className="mt-1 text-sm text-gray-500 flex flex-wrap gap-x-4 gap-y-1">
                              <span>Type: {doc.type}</span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {new Date(doc.date).toLocaleDateString()}
                              </span>
                              <span>{doc.isPublic ? "Public" : "Private"}</span>
                            </div>

                            <div className="mt-1 text-xs text-gray-400 truncate">IPFS: {doc.ipfsHash}</div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button className="text-gray-500 hover:text-blue-600 p-1">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-gray-500 hover:text-blue-600 p-1">
                              <Download className="h-4 w-4" />
                            </button>
                            <button className="text-gray-500 hover:text-blue-600 p-1">
                              <Share2 className="h-4 w-4" />
                            </button>
                            <ChevronRight className="h-5 w-5 text-blue-600" />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )
            ) : (
              <div className="p-8 text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <Image
                    src="/images/illustrations/empty-documents.svg"
                    alt="No documents"
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-1">No documents found</h3>
                <p className="text-gray-500 mb-4">
                  {searchTerm || filters.type || filters.status || filters.visibility
                    ? "Try adjusting your search or filters"
                    : "Upload your first document to get started"}
                </p>
                <Link href="/upload">
                  <Button>Upload Document</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}