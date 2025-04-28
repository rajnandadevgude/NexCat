"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Search, Upload, FileText, CheckCircle, XCircle, Clock, ChevronRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { verifyDocumentOnChain, getDocumentFromIPFS } from "@/lib/ipfs-service"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import { MainNav } from "@/components/main-nav"

export default function VerifyPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { user, isLoading } = useAuth()

  const [activeTab, setActiveTab] = useState("hash")
  const [documentHash, setDocumentHash] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationResult, setVerificationResult] = useState<{
    verified: boolean
    timestamp?: string
    owner?: string
    metadata?: any
  } | null>(null)

  // Authentication check
  useEffect(() => {
    if (!isLoading && !user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to verify documents",
        variant: "destructive",
      })
      router.push("/login")
    }
  }, [user, isLoading, router, toast])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-2">Loading...</span>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect to login
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const verifyByHash = async () => {
    if (!documentHash) return

    setIsVerifying(true)
    setVerificationResult(null)

    try {
      // Verify document on blockchain
      const result = await verifyDocumentOnChain(documentHash)

      if (result.verified) {
        // Get document metadata from IPFS if verified
        const metadata = await getDocumentFromIPFS(documentHash)
        setVerificationResult({
          ...result,
          metadata,
        })
      } else {
        setVerificationResult(result)
      }
    } catch (error) {
      console.error("Verification error:", error)
      setVerificationResult({
        verified: false,
      })
    } finally {
      setIsVerifying(false)
    }
  }

  const verifyByFile = async () => {
    if (!file) return

    setIsVerifying(true)
    setVerificationResult(null)

    try {
      // Calculate file hash and verify on blockchain
      // This is a simplified version - in a real app, you'd calculate the file hash
      // and then verify it against the blockchain

      // Simulate verification process
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock result - in a real app, this would be the actual verification result
      setVerificationResult({
        verified: Math.random() > 0.3, // 70% chance of success for demo
        timestamp: new Date().toISOString(),
        owner: "0x1234...5678",
        metadata: {
          title: file.name,
          fileSize: file.size,
          fileType: file.type,
          uploadDate: new Date().toISOString(),
        },
      })
    } catch (error) {
      console.error("Verification error:", error)
      setVerificationResult({
        verified: false,
      })
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <MainNav />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-blue-600 font-medium">Verify Document</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-6 text-white">
              <h1 className="text-2xl font-bold mb-2">Verify Document Authenticity</h1>
              <p>Check if a document has been verified and stored on the blockchain</p>
            </div>

            <div className="p-6">
              <Tabs defaultValue="hash" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="hash">Verify by IPFS Hash</TabsTrigger>
                  <TabsTrigger value="file">Verify by File Upload</TabsTrigger>
                </TabsList>

                <TabsContent value="hash">
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Document IPFS Hash (CID)</label>
                    <div className="flex gap-2">
                      <Input
                        value={documentHash}
                        onChange={(e) => setDocumentHash(e.target.value)}
                        placeholder="Enter document IPFS hash (CID)"
                        className="flex-1"
                      />
                      <Button onClick={verifyByHash} disabled={isVerifying || !documentHash}>
                        {isVerifying ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                        <span className="ml-2">Verify</span>
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Example: QmZ4tDuvesekSs4qM5ZBKpXiZGun7S2CYtEZRB3DYXkjGx
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="file">
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Upload Document to Verify</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mb-4">
                      <input type="file" id="file-upload" className="sr-only" onChange={handleFileChange} />

                      <label htmlFor="file-upload" className="cursor-pointer">
                        <div className="flex flex-col items-center justify-center gap-2">
                          <FileText className="h-12 w-12 text-emerald-500" />

                          <div className="text-sm text-gray-600">
                            {file ? (
                              <span className="font-medium">
                                {file.name} ({(file.size / 1024).toFixed(2)} KB)
                              </span>
                            ) : (
                              <span>
                                <span className="text-emerald-600 font-medium">Click to upload</span> or drag and drop
                              </span>
                            )}
                          </div>

                          <p className="text-xs text-gray-500">Upload the document you want to verify</p>
                        </div>
                      </label>
                    </div>

                    <Button
                      onClick={verifyByFile}
                      disabled={isVerifying || !file}
                      className="w-full bg-emerald-600 hover:bg-emerald-700"
                    >
                      {isVerifying ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        <>
                          <Upload className="mr-2 h-4 w-4" />
                          Verify Document
                        </>
                      )}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Verification Result */}
              {verificationResult !== null && (
                <div className={`mt-8 p-6 rounded-lg ${verificationResult.verified ? "bg-green-50" : "bg-red-50"}`}>
                  <div className="flex items-center mb-4">
                    {verificationResult.verified ? (
                      <>
                        <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
                        <h2 className="text-xl font-bold text-green-800">Document Verified</h2>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-8 w-8 text-red-500 mr-3" />
                        <h2 className="text-xl font-bold text-red-800">Document Not Verified</h2>
                      </>
                    )}
                  </div>

                  {verificationResult.verified ? (
                    <div className="space-y-4">
                      <p className="text-green-700">
                        This document has been verified on the blockchain and is authentic.
                      </p>

                      <div className="bg-white rounded-md p-4 space-y-3">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Document Hash</h3>
                          <p className="font-mono text-sm break-all">{documentHash || "Generated from file"}</p>
                        </div>

                        {verificationResult.timestamp && (
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Timestamp</h3>
                            <p className="text-sm flex items-center">
                              <Clock className="h-4 w-4 mr-1 text-gray-400" />
                              {new Date(verificationResult.timestamp).toLocaleString()}
                            </p>
                          </div>
                        )}

                        {verificationResult.owner && (
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Owner</h3>
                            <p className="font-mono text-sm break-all">{verificationResult.owner}</p>
                          </div>
                        )}

                        {verificationResult.metadata && (
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Document Metadata</h3>
                            <div className="bg-gray-50 p-3 rounded text-sm">
                              <pre className="whitespace-pre-wrap break-all">
                                {JSON.stringify(verificationResult.metadata, null, 2)}
                              </pre>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-3">
                        {activeTab === "hash" && (
                          <Link href={`/documents/${documentHash}`}>
                            <Button variant="outline">View Document</Button>
                          </Link>
                        )}
                        <Button variant="outline">Download Verification Certificate</Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="text-red-700 mb-4">
                        This document could not be verified on the blockchain. It may have been tampered with or has not
                        been registered.
                      </p>

                      <div className="flex gap-3">
                        <Link href="/upload">
                          <Button className="bg-blue-600 hover:bg-blue-700">Register Document</Button>
                        </Link>
                        <Link href="/contact">
                          <Button variant="outline">Contact Support</Button>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

