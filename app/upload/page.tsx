"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Upload, File, FileText, ImageIcon, FileArchive, Shield, ChevronRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useWeb3Connector } from "@/hooks/use-web3-connector"
import { uploadToIPFS, storeDocumentOnChain } from "@/lib/ipfs-service"
import { useAuth } from "@/hooks/use-auth"
import { MainNav } from "@/components/main-nav"

export default function UploadPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { account, signer } = useWeb3Connector()
  const { user, isLoading } = useAuth()

  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [documentType, setDocumentType] = useState("")
  const [isPublic, setIsPublic] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [ipfsHash, setIpfsHash] = useState("")
  const [transactionHash, setTransactionHash] = useState("")

  // Authentication check
  useEffect(() => {
    if (!isLoading && !user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to upload documents",
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

  const getFileIcon = () => {
    if (!file) return <Upload className="h-12 w-12 text-blue-500" />

    const extension = file.name.split(".").pop()?.toLowerCase()

    if (["jpg", "jpeg", "png", "gif", "svg"].includes(extension || "")) {
      return <ImageIcon className="h-12 w-12 text-purple-500" />
    } else if (["pdf"].includes(extension || "")) {
      return <FileText className="h-12 w-12 text-red-500" />
    } else if (["zip", "rar", "7z"].includes(extension || "")) {
      return <FileArchive className="h-12 w-12 text-yellow-500" />
    } else {
      return <File className="h-12 w-12 text-gray-500" />
    }
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!file) {
      toast({
        title: "Error",
        description: "Please select a file to upload",
        variant: "destructive",
      })
      return
    }

    if (!account || !signer) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to upload documents",
        variant: "destructive",
      })
      return
    }

    try {
      setIsUploading(true)

      // Upload to IPFS
      const progressCallback = (progress: number) => {
        setUploadProgress(progress)
      }

      const ipfsResult = await uploadToIPFS(file, progressCallback)
      setIpfsHash(ipfsResult.hash)

      // Store document reference on blockchain
      const metadata = {
        title,
        description,
        documentType,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        isPublic,
        timestamp: new Date().toISOString(),
        ipfsHash: ipfsResult.hash,
      }

      const tx = await storeDocumentOnChain(signer, ipfsResult.hash, JSON.stringify(metadata))
      setTransactionHash(tx.hash)

      toast({
        title: "Document uploaded successfully",
        description: "Your document has been stored on IPFS and verified on blockchain",
      })

      // Redirect to document page after 3 seconds
      setTimeout(() => {
        router.push(`/documents/${ipfsResult.hash}`)
      }, 3000)
    } catch (error) {
      console.error("Upload error:", error)
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Failed to upload document",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
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
            <span className="text-blue-600 font-medium">Upload Document</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
              <h1 className="text-2xl font-bold mb-2">Upload Document to IPFS</h1>
              <p>Securely store your documents on IPFS with blockchain verification</p>
            </div>

            <div className="p-6">
              {ipfsHash ? (
                <div className="text-center py-8">
                  <div className="bg-green-100 text-green-800 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    <Shield className="h-10 w-10" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Document Uploaded Successfully!</h2>
                  <p className="text-gray-600 mb-6">
                    Your document has been securely stored on IPFS and verified on blockchain
                  </p>

                  <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-gray-500">IPFS Hash (CID)</h3>
                      <p className="font-mono text-sm break-all">{ipfsHash}</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Blockchain Transaction</h3>
                      <p className="font-mono text-sm break-all">{transactionHash}</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href={`/documents/${ipfsHash}`}>
                      <Button className="w-full sm:w-auto">View Document</Button>
                    </Link>
                    <Link href="/documents">
                      <Button variant="outline" className="w-full sm:w-auto">
                        My Documents
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleUpload}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Document Title</label>
                      <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter document title"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Document Type</label>
                      <Select onValueChange={setDocumentType} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select document type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="identity">Identity Document</SelectItem>
                          <SelectItem value="certificate">Certificate</SelectItem>
                          <SelectItem value="legal">Legal Document</SelectItem>
                          <SelectItem value="financial">Financial Document</SelectItem>
                          <SelectItem value="medical">Medical Record</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <Textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter document description"
                      rows={3}
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Upload Document</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <input type="file" id="file-upload" className="sr-only" onChange={handleFileChange} />

                      <label htmlFor="file-upload" className="cursor-pointer">
                        <div className="flex flex-col items-center justify-center gap-2">
                          {getFileIcon()}

                          <div className="text-sm text-gray-600">
                            {file ? (
                              <span className="font-medium">
                                {file.name} ({(file.size / 1024).toFixed(2)} KB)
                              </span>
                            ) : (
                              <span>
                                <span className="text-blue-600 font-medium">Click to upload</span> or drag and drop
                              </span>
                            )}
                          </div>

                          <p className="text-xs text-gray-500">PDF, JPG, PNG, DOC up to 10MB</p>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="is-public"
                        checked={isPublic}
                        onChange={(e) => setIsPublic(e.target.checked)}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300"
                      />
                      <label htmlFor="is-public" className="ml-2 text-sm text-gray-700">
                        Make this document publicly accessible
                      </label>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      If unchecked, only you will be able to access this document
                    </p>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <h3 className="font-medium text-blue-800 mb-2">Document Security</h3>
                    <ul className="space-y-2 text-sm text-blue-700">
                      <li className="flex items-start gap-2">
                        <span className="bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                          ✓
                        </span>
                        <span>Your document will be encrypted and stored on IPFS</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                          ✓
                        </span>
                        <span>Document hash will be recorded on blockchain for verification</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                          ✓
                        </span>
                        <span>You control access permissions to your document</span>
                      </li>
                    </ul>
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" disabled={isUploading || !file} className="w-full sm:w-auto">
                      {isUploading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {uploadProgress < 100 ? `Uploading (${uploadProgress}%)` : "Verifying on blockchain..."}
                        </>
                      ) : (
                        <>
                          <Upload className="mr-2 h-4 w-4" />
                          Upload to IPFS
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

